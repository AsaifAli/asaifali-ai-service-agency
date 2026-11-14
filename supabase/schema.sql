
create extension if not exists pgcrypto;

-- =========================================================
-- ADMIN ROLE CHECK
-- Only trusted app_metadata can grant studio admin access.
-- user_metadata must never be used for authorization.
-- =========================================================

create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    auth.jwt() -> 'app_metadata' ->> 'studio_role' = 'admin',
    false
  );
$$;

revoke all on function public.is_studio_admin() from public;
grant execute on function public.is_studio_admin() to authenticated;

-- =========================================================
-- PROJECT CONTENT
-- Public users can read published projects.
-- Only trusted studio admins can manage project records.
-- =========================================================

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null,
  name text not null,
  eyebrow text not null,
  short text not null,
  description text not null,
  tags jsonb not null default '[]'::jsonb,
  github text not null,
  status text not null default 'In progress',
  accent text not null default 'blue',
  problem text not null,
  solution text not null,
  architecture jsonb not null default '[]'::jsonb,
  decisions jsonb not null default '[]'::jsonb,
  reliability jsonb not null default '[]'::jsonb,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

drop policy if exists
  "public can read published projects"
  on public.projects;

create policy "public can read published projects"
on public.projects
for select
to anon, authenticated
using (published = true);

drop policy if exists
  "authenticated can manage projects"
  on public.projects;

drop policy if exists
  "studio admins can manage projects"
  on public.projects;

create policy "studio admins can manage projects"
on public.projects
for all
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin());

grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

-- =========================================================
-- CONTACT MESSAGES / LEAD INBOX
-- Public visitors must submit through the server API.
-- The server uses the Supabase service-role key to insert.
-- =========================================================

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  email text not null,
  message text not null,

  company text,
  project_type text,
  budget_range text,
  timeline text,

  notification_status text not null default 'pending',

  lead_status text not null default 'new'
    check (
      lead_status in (
        'new',
        'replied',
        'closed'
      )
    ),

  internal_notes text not null default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_messages
  add column if not exists company text,
  add column if not exists project_type text,
  add column if not exists budget_range text,
  add column if not exists timeline text,
  add column if not exists notification_status text not null default 'pending',
  add column if not exists lead_status text not null default 'new',
  add column if not exists internal_notes text not null default '',
  add column if not exists updated_at timestamptz not null default now();

alter table public.contact_messages
  drop constraint if exists contact_messages_lead_status_check;

alter table public.contact_messages
  add constraint contact_messages_lead_status_check
  check (
    lead_status in (
      'new',
      'replied',
      'closed'
    )
  );

create index if not exists
  contact_messages_created_at_idx
on public.contact_messages (created_at desc);

create index if not exists
  contact_messages_lead_status_created_at_idx
on public.contact_messages (lead_status, created_at desc);

create index if not exists
  contact_messages_notification_status_idx
on public.contact_messages (notification_status);

alter table public.contact_messages enable row level security;

drop policy if exists
  "public can submit contact messages"
  on public.contact_messages;

drop policy if exists
  "studio admins can read enquiries"
  on public.contact_messages;

drop policy if exists
  "studio admins can update enquiries"
  on public.contact_messages;

create policy "studio admins can read enquiries"
on public.contact_messages
for select
to authenticated
using (public.is_studio_admin());

create policy "studio admins can update enquiries"
on public.contact_messages
for update
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin());

revoke all on public.contact_messages from public;
revoke insert on public.contact_messages from anon, authenticated;

grant select, update
on public.contact_messages
to authenticated;

grant insert, select, update
on public.contact_messages
to service_role;

-- =========================================================
-- CONTACT RATE LIMITS
-- Raw client IP addresses are never stored.
-- The API hashes the IP with a private application secret.
-- =========================================================

create table if not exists public.contact_rate_limits (
  key_hash text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.contact_rate_limits
  enable row level security;

revoke all on public.contact_rate_limits
from public, anon, authenticated;

grant all on public.contact_rate_limits
to service_role;

drop function if exists
  public.consume_contact_rate_limit(text);

create function public.consume_contact_rate_limit(
  p_key_hash text
)
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

  insert into public.contact_rate_limits (
    key_hash,
    window_started_at,
    request_count,
    updated_at
  )
  values (
    p_key_hash,
    now(),
    1,
    now()
  )
  on conflict (key_hash) do update
    set request_count = case
      when public.contact_rate_limits.window_started_at
        < now() - interval '1 hour'
      then 1
      else public.contact_rate_limits.request_count + 1
    end,
    window_started_at = case
      when public.contact_rate_limits.window_started_at
        < now() - interval '1 hour'
      then now()
      else public.contact_rate_limits.window_started_at
    end,
    updated_at = now()
  returning request_count into current_count;

  if random() < 0.01 then
    delete from public.contact_rate_limits
    where updated_at < now() - interval '2 days';
  end if;

  return current_count <= 5;
end;
$$;

revoke all
on function public.consume_contact_rate_limit(text)
from public, anon, authenticated;

grant execute
on function public.consume_contact_rate_limit(text)
to service_role;
