-- Durable queue storage for failed JanaGana CRM writes
-- Run this in the TPW Supabase SQL Editor

create table if not exists public.crm_failed_requests (
  id text primary key,
  timestamp timestamptz not null,
  endpoint text not null,
  method text not null,
  payload jsonb not null,
  error text not null,
  status_code integer,
  retry_count integer not null default 0,
  user_id uuid,
  email text,
  created_at timestamptz not null default now(),
  last_retry_at timestamptz
);

create index if not exists idx_crm_failed_requests_retry_count
  on public.crm_failed_requests (retry_count);

create index if not exists idx_crm_failed_requests_created_at
  on public.crm_failed_requests (created_at);

create index if not exists idx_crm_failed_requests_email
  on public.crm_failed_requests (email);

alter table public.crm_failed_requests enable row level security;

-- No public policies by design. Access is service-role only.
