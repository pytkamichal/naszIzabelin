# Izabelin — strona mieszkańców wsi

Strona internetowa wsi Izabelin (powiat miński, woj. mazowieckie). Aktualności,
kalendarz, inwestycje i kontakty.

Stack: **Next.js 16** (App Router, TypeScript) · **Tailwind CSS v4** · **Supabase**
(tylko zapis formularza pomysłów).

## Wymagania

- Node.js **≥ 20** (LTS). Next.js 16 nie uruchomi się na Node < 18.18.

> Jeśli Twój domyślny `node` jest starszy, a Node 20 zainstalowałeś przez
> Homebrew (`brew install node@20`), dodaj go do PATH na czas pracy:
> ```bash
> export PATH="/opt/homebrew/opt/node@20/bin:$PATH"
> ```
> lub ustaw go na stałe: `brew link --overwrite node@20`.

## Uruchomienie lokalne

```bash
npm install
npm run dev
# http://localhost:3000
```

Strona działa bez Supabase — formularz wyświetli wtedy komunikat, że nie jest
podłączony do bazy.

## Edycja treści (content-as-code)

Wszystkie treści są w katalogu `data/` — wystarczy edytować plik i odświeżyć stronę:

| Plik | Zawartość |
| --- | --- |
| `data/village.ts` | Nazwa wsi, liczba mieszkańców, opis (Hero) |
| `data/calendar.ts` | Wydarzenia w kalendarzu |
| `data/notices.ts` | Tablica ogłoszeń |
| `data/investments.ts` | Inwestycje i ich statusy |
| `data/transport.ts` | Rozkład jazdy autobusów BAGS |
| `data/contacts.ts` | Przydatne kontakty |
| `data/site.ts` | Menu nawigacji, link „Buy me a coffee” |

## Materiały do uzupełnienia

- `public/hero.jpg` — zdjęcie wsi (tło sekcji powitalnej).
- Link „Buy me a coffee” → `data/site.ts` (`buyMeACoffeeUrl`).

## Formularz pomysłów (Supabase)

Formularz zapisuje zgłoszenia w Supabase (tabela `suggestions`, RLS „tylko insert”
dla roli `anon` — publiczność nie może odczytywać zgłoszeń). Schemat jest w
`supabase/migrations/` (oraz w `supabase/schema.sql` do ręcznego wklejenia w chmurze).

### Wariant lokalny (Docker) — używany w developmencie

Wymaga uruchomionego Dockera i Supabase CLI (`brew install supabase/tap/supabase`).

```bash
supabase start    # lokalny stack (Postgres + API); pierwszy raz pobiera obrazy Dockera
supabase status   # pokazuje API URL, anon key itp.
supabase stop     # zatrzymuje stack
supabase db reset # odtwarza bazę i ponownie stosuje migracje
```

`.env.local` wskazuje na lokalny Supabase (wartości z `supabase status`):

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
```

Zgłoszenia podejrzysz w **Supabase Studio: http://127.0.0.1:54323** (tabela `suggestions`).

### Przełączenie na chmurę (na wdrożenie)

1. Utwórz darmowy projekt na [supabase.com](https://supabase.com).
2. Zastosuj schemat: `supabase link --project-ref <ref>` i `supabase db push`
   (albo wklej `supabase/schema.sql` w **SQL Editor**).
3. W `.env.local` podmień `NEXT_PUBLIC_SUPABASE_URL` i `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   na wartości z projektu (Project Settings → API). Kod i tabela bez zmian.
4. Zgłoszenia odczytasz w panelu Supabase (Table editor → `suggestions`).

## Skrypty

```bash
npm run dev     # serwer deweloperski
npm run build   # build produkcyjny
npm run start   # uruchomienie buildu
npm run lint    # ESLint
```
