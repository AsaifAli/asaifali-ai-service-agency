
-- =========================================================
-- AI ENGINEERING STUDIO
-- Lead inbox operations
--
-- Apply to an existing database after backing it up.
-- This migration is intended to run once.
-- =========================================================

begin;

alter table public.contact_messages
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
  contact_messages_lead_status_created_at_idx
on public.contact_messages (
  lead_status,
  created_at desc
);

create index if not exists
  contact_messages_notification_status_idx
on public.contact_messages (
  notification_status
);

-- Reconfirm the trusted admin-only read policy.
drop policy if exists
  "studio admins can read enquiries"
  on public.contact_messages;

create policy "studio admins can read enquiries"
on public.contact_messages
for select
to authenticated
using (public.is_studio_admin());

-- Only studio admins can change status and internal notes.
drop policy if exists
  "studio admins can update enquiries"
  on public.contact_messages;

create policy "studio admins can update enquiries"
on public.contact_messages
for update
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin());

-- Public visitors cannot write directly to this table.
revoke insert on public.contact_messages
from anon, authenticated;

-- The authenticated admin inbox can read and update records.
grant select, update on public.contact_messages
to authenticated;

-- The server-side contact API uses the service role.
grant insert, select, update on public.contact_messages
to service_role;

commit;
