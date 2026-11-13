-- AI Engineering Studio: secure admin roles and enquiry inbox.
-- Apply once to the existing Supabase project after taking a database backup.

alter table public.contact_messages
  add column if not exists company text,
  add column if not exists project_type text,
  add column if not exists budget_range text,
  add column if not exists timeline text,
  add column if not exists notification_status text not null default 'pending';

create index if not exists contact_messages_created_at_idx
  on public.contact_messages (created_at desc);

-- A user is an administrator only when the trusted app_metadata claim is set.
-- Do not use user_metadata for authorization: users can generally edit it.
create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'studio_role' = 'admin', false);
$$;

revoke all on function public.is_studio_admin() from public;
grant execute on function public.is_studio_admin() to authenticated;

-- Remove the broad policy from the earlier schema. Signed-in users are not
-- automatically studio administrators.
drop policy if exists "authenticated can manage projects" on public.projects;
drop policy if exists "studio admins can manage projects" on public.projects;
create policy "studio admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin());

-- The existing public policy continues to expose published projects only.
-- Admins can also read unpublished projects through the policy above.

drop policy if exists "studio admins can read enquiries" on public.contact_messages;
create policy "studio admins can read enquiries"
on public.contact_messages
for select
to authenticated
using (public.is_studio_admin());

-- Public clients must not write directly to the inbox: all submissions go
-- through the server API, which validates, rate-limits, notifies and then
-- inserts using the server-only Supabase service-role key.
drop policy if exists "public can submit contact messages" on public.contact_messages;
revoke insert on public.contact_messages from anon, authenticated;
grant insert on public.contact_messages to service_role;

-- Explicit grants complement row-level security; RLS remains the access gate.
grant select on public.contact_messages to authenticated;
grant select on public.projects to anon, authenticated;
grant update, insert, delete on public.projects to authenticated;

-- Durable best-effort contact rate limit: 5 enquiries per hashed IP per hour.
-- The raw client IP is never stored. The application hashes it with a private
-- CONTACT_RATE_LIMIT_SECRET before calling this function.
create table if not exists public.contact_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.contact_rate_limits enable row level security;
revoke all on public.contact_rate_limits from anon, authenticated;

drop function if exists public.consume_contact_rate_limit(text);
create function public.consume_contact_rate_limit(p_key_hash text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
begin
  if p_key_hash !~ '^[a-f0-9]{64}$' then
    return false;
  end if;

  insert into public.contact_rate_limits (key_hash, window_started_at, request_count, updated_at)
  values (p_key_hash, now(), 1, now())
  on conflict (key_hash) do update
    set request_count = case
          when public.contact_rate_limits.window_started_at < now() - interval '1 hour' then 1
          else public.contact_rate_limits.request_count + 1
        end,
        window_started_at = case
          when public.contact_rate_limits.window_started_at < now() - interval '1 hour' then now()
          else public.contact_rate_limits.window_started_at
        end,
        updated_at = now()
  returning request_count into current_count;

  -- Opportunistic cleanup keeps the small rate-limit table from growing forever.
  if random() < 0.01 then
    delete from public.contact_rate_limits where updated_at < now() - interval '2 days';
  end if;

  return current_count <= 5;
end;
$$;

revoke all on function public.consume_contact_rate_limit(text) from public;
revoke all on function public.consume_contact_rate_limit(text) from anon, authenticated;
grant execute on function public.consume_contact_rate_limit(text) to service_role;
