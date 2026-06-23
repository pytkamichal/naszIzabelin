-- Suggestion form: table + insert-only RLS for the public (anon) role.
-- Mirrors supabase/schema.sql (kept for running manually in the cloud SQL editor).

create table if not exists public.suggestions (
  id         uuid primary key default gen_random_uuid(),
  contact    text,            -- "Twoje imię / e-mail" (optional)
  idea       text not null,   -- "Pomysł na rozwój..."
  created_at timestamptz not null default now()
);

-- Enable Row Level Security.
alter table public.suggestions enable row level security;

-- Table privileges for the API roles (RLS still governs what they can actually do).
grant insert on public.suggestions to anon;
grant all on public.suggestions to service_role;

-- Allow anonymous users to INSERT only.
-- No SELECT policy => the public cannot read submissions.
drop policy if exists "anon insert suggestions" on public.suggestions;
create policy "anon insert suggestions"
  on public.suggestions
  for insert
  to anon
  with check (true);
