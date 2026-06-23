// Harmonogram wywozu odpadów 2026 — Izabelin należy do REJONU II.
// Źródło: https://jakubow.pl/harmonogram-wywozu-odpadow-na-2026-rok/
// Wykonawca: Eko-Sam Bis (EKO-SAMBIS).
//
// Oznaczenia z harmonogramu (kolory kółek na kalendarzu):
//   brązowe = odbiór worków sprzed nieruchomości (czarny/żółty/niebieski/zielony)
//   czerwone = dzień otwarcia PSZOK-u (8:00–12:00)
//   zielone  = odbiór odpadów wielkogabarytowych i tekstyliów

import type { CalendarEvent } from "./calendar";

export type WasteKind = "bags" | "pszok" | "bulky";

export type WasteEvent = {
  /** Data w formacie ISO (yyyy-mm-dd). */
  date: string;
  kind: WasteKind;
};

export const wasteRejon = "Rejon II";

export const wasteLocalities = [
  "Tymoteuszew", "Ludwinów", "Wiśniew", "Kamionka", "Strzebula", "Nart",
  "Turek", "Izabelin", "Szczytnik", "Łaziska", "Rządza", "Wola Polska",
];

export const wasteOperator = {
  name: "Eko-Sam Bis Sp. z o.o.",
  address: "ul. Dobra 12, 05-306 Jakubów",
  phones: ["25 757 90 93", "501 584 490"],
  email: "eko-sam@wp.pl",
};

export const pszok = {
  name: "PSZOK (dawne składowisko odpadów w Moczydłach)",
  hours: "8:00–12:00",
};

/** Worki należy wystawić w dniu odbioru do tej godziny. */
export const wastePutOutBy = "7:00";

export const wasteSourceUrl =
  "https://jakubow.pl/harmonogram-wywozu-odpadow-na-2026-rok/";

export const wasteKindLabels: Record<
  WasteKind,
  { label: string; short: string; icon: string }
> = {
  bags: {
    label: "Odbiór worków sprzed nieruchomości",
    short: "Worki",
    icon: "🗑️",
  },
  pszok: { label: "PSZOK czynny (8:00–12:00)", short: "PSZOK", icon: "♻️" },
  bulky: {
    label: "Odbiór wielkogabarytów i tekstyliów",
    short: "Wielkogabaryty",
    icon: "🛋️",
  },
};

/** Worki odbierane sprzed nieruchomości — kolor → frakcja. */
export const wasteBags = [
  { color: "Czarny", icon: "⬛", fraction: "Odpady zmieszane (pozostałe)" },
  { color: "Żółty", icon: "🟨", fraction: "Tworzywa sztuczne, metale, opakowania" },
  { color: "Niebieski", icon: "🟦", fraction: "Papier" },
  { color: "Zielony", icon: "🟩", fraction: "Szkło" },
];

// Pełny harmonogram 2026 dla Rejonu II (chronologicznie).
export const wasteEvents: WasteEvent[] = [
  { date: "2026-01-10", kind: "pszok" },
  { date: "2026-01-21", kind: "bags" },
  { date: "2026-02-07", kind: "pszok" },
  { date: "2026-02-18", kind: "bags" },
  { date: "2026-03-07", kind: "pszok" },
  { date: "2026-03-18", kind: "bags" },
  { date: "2026-04-11", kind: "pszok" },
  { date: "2026-04-15", kind: "bags" },
  { date: "2026-05-09", kind: "pszok" },
  { date: "2026-05-13", kind: "bags" },
  { date: "2026-06-06", kind: "pszok" },
  { date: "2026-06-10", kind: "bags" },
  { date: "2026-07-04", kind: "pszok" },
  { date: "2026-07-08", kind: "bags" },
  { date: "2026-08-01", kind: "pszok" },
  { date: "2026-08-05", kind: "bags" },
  { date: "2026-09-02", kind: "bags" },
  { date: "2026-09-05", kind: "pszok" },
  { date: "2026-09-30", kind: "bags" },
  { date: "2026-10-03", kind: "pszok" },
  { date: "2026-10-21", kind: "bulky" },
  { date: "2026-10-28", kind: "bags" },
  { date: "2026-11-07", kind: "pszok" },
  { date: "2026-11-25", kind: "bags" },
  { date: "2026-12-05", kind: "pszok" },
  { date: "2026-12-16", kind: "bags" },
];

// Tytuły terminów odpadowych pokazywanych w kalendarzu wydarzeń.
const wasteCalendarTitles: Record<WasteKind, string> = {
  bags: "Wywóz śmieci – worki (czarny, żółty, niebieski, zielony)",
  pszok: "PSZOK czynny – dawne składowisko w Moczydłach",
  bulky: "Odbiór wielkogabarytów i tekstyliów",
};

// Harmonogram odpadów jako wydarzenia kalendarza (zasila CalendarBoard).
export const wasteCalendarEvents: CalendarEvent[] = wasteEvents.map((e) => ({
  date: e.date,
  icon: wasteKindLabels[e.kind].icon,
  title: wasteCalendarTitles[e.kind],
  time: e.kind === "pszok" ? pszok.hours : undefined,
}));
