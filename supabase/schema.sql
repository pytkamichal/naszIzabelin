-- Database schema for the suggestion form.
-- Run in Supabase: SQL Editor -> New query -> paste -> Run.

create table if not exists public.suggestions (
  id         uuid primary key default gen_random_uuid(),
  contact    text,            -- "Twoje imię / e-mail" (optional)
  idea       text not null,   -- "Pomysł na rozwój..."
  created_at timestamptz not null default now()
);

-- Enable Row Level Security.
alter table public.suggestions enable row level security;

-- Allow anonymous users to INSERT only.
-- No SELECT policy => the public cannot read submissions.
-- You read them in the Supabase dashboard (Table editor).
drop policy if exists "anon insert suggestions" on public.suggestions;
create policy "anon insert suggestions"
  on public.suggestions
  for insert
  to anon
  with check (true);
