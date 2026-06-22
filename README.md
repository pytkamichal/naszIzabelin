# Izabelin — strona mieszkańców wsi

Strona internetowa wsi Izabelin (powiat miński, woj. mazowieckie). Aktualności,
kalendarz, inwestycje, kontakty oraz akcja **STOP STREFIE 6SP**.

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
| `data/protest.ts` | Sekcja „Strefa 6SP”, spotkanie, link do wideo FB |
| `data/documents.ts` | Pliki do pobrania (PDF/DOCX z `public/docs/`) |
| `data/calendar.ts` | Wydarzenia w kalendarzu |
| `data/notices.ts` | Tablica ogłoszeń |
| `data/investments.ts` | Inwestycje i ich statusy |
| `data/transport.ts` | Rozkład jazdy autobusów BAGS |
| `data/contacts.ts` | Przydatne kontakty |
| `data/site.ts` | Menu nawigacji, link „Buy me a coffee” |

## Materiały do uzupełnienia

- `public/hero.jpg` — zdjęcie wsi (tło sekcji powitalnej).
- `public/docs/petycja-6sp.pdf` oraz `public/docs/protest-mieszkancow.docx`.
- Link do filmu z Facebooka → `data/protest.ts` (`facebookVideoUrl`).
- Link „Buy me a coffee” → `data/site.ts` (`buyMeACoffeeUrl`).

## Formularz pomysłów (Supabase)

1. Utwórz darmowy projekt na [supabase.com](https://supabase.com).
2. W panelu: **SQL Editor** → wklej i uruchom `supabase/schema.sql`
   (tworzy tabelę `suggestions` + politykę RLS „tylko insert”).
3. Skopiuj `.env.example` do `.env.local` i uzupełnij `NEXT_PUBLIC_SUPABASE_URL`
   oraz `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API).
4. Zgłoszenia odczytasz w panelu Supabase (Table editor → `suggestions`).
   Publiczność nie ma dostępu do odczytu (brak polityki SELECT).

## Skrypty

```bash
npm run dev     # serwer deweloperski
npm run build   # build produkcyjny
npm run start   # uruchomienie buildu
npm run lint    # ESLint
```
