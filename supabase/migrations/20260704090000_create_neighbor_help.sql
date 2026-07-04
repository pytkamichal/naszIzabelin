-- "Sąsiedzka pomoc" board: neighbours post help offers / requests.
-- Each submission is hidden until an admin flips `visible` to true in the
-- Supabase dashboard. The public (anon) role can INSERT hidden rows and
-- SELECT only approved ones.

create table if not exists public.neighbor_help (
  id         uuid primary key default gen_random_uuid(),
  kind       text not null check (kind in ('offer', 'need')), -- Oferuję / Szukam
  name       text,            -- who is posting (optional, shown publicly)
  contact    text,            -- phone / Messenger (optional, shown publicly)
  message    text not null,   -- what help is offered / needed
  visible    boolean not null default false, -- admin approval gate
  created_at timestamptz not null default now()
);

-- Fast lookups of the approved, newest-first feed.
create index if not exists neighbor_help_visible_created_idx
  on public.neighbor_help (visible, created_at desc);

-- Enable Row Level Security.
alter table public.neighbor_help enable row level security;

-- Table privileges for the API roles (RLS still governs what they can do).
grant select, insert on public.neighbor_help to anon;
grant all on public.neighbor_help to service_role;

-- Anonymous users may INSERT, but only rows that stay hidden
-- (visible = false). They cannot self-approve a submission.
drop policy if exists "anon insert hidden neighbor_help" on public.neighbor_help;
create policy "anon insert hidden neighbor_help"
  on public.neighbor_help
  for insert
  to anon
  with check (visible = false);

-- Anonymous users may SELECT only approved rows.
drop policy if exists "anon read visible neighbor_help" on public.neighbor_help;
create policy "anon read visible neighbor_help"
  on public.neighbor_help
  for select
  to anon
  using (visible = true);
