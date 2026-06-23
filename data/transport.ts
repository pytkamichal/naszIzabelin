// Rozkład jazdy autobusów — Linia B1 (przewoźnik BAGS).
// Źródło: https://bags.com.pl/rozklady/izabelin/  · ważny od 1 kwietnia 2026 r.
// Czasy zapisane wraz z oznaczeniami (np. "7:08 SM", "8:33 U") — patrz busNotes.

export type BusDirection = {
  /** Cel kursu, np. "Warszawa". */
  to: string;
  /** Pełna trasa przejazdu. */
  route: string;
  /** Odjazdy w dni powszednie (pon.–pt.). */
  weekdays: string[];
  /** Odjazdy w soboty. */
  saturday: string[];
  /** Odjazdy w niedziele i święta. */
  sundayHoliday: string[];
};

export type BusNote = { code: string; description: string };

export const transportProvider = "BAGS";
export const busLine = "B1";
export const busValidFrom = "1 kwietnia 2026 r.";
export const busGpsUrl = "https://bags-gps.com.pl";
export const busSourceUrl = "https://bags.com.pl/rozklady/izabelin/";
export const busPhone = "(25) 757-10-95";

export const busDirections: BusDirection[] = [
  {
    to: "Warszawa",
    route:
      "Jakubów → Mińsk Maz. → Dębe Wielkie → Zakręt → Warszawa Pl. Zawiszy",
    weekdays: [
      "4:13", "4:53", "5:33", "6:03", "6:53", "7:08 SM", "7:18", "8:03",
      "8:38", "9:33", "10:33", "11:33", "12:33", "13:33", "14:33", "15:33",
      "16:13", "17:03", "18:03", "19:03",
    ],
    saturday: [
      "4:13", "4:53", "5:48", "6:53", "8:33", "9:33", "10:33", "11:33",
      "12:33", "13:33", "14:33", "16:13", "18:03",
    ],
    sundayHoliday: ["4:53", "8:33 U", "10:33 U", "13:33 U", "16:13", "18:03 U"],
  },
  {
    to: "Dobre",
    route: "kierunek Dobre",
    weekdays: [
      "7:25", "8:20", "8:55", "9:35", "10:35", "11:35", "12:35", "13:20",
      "14:05", "15:05", "15:35", "16:05", "16:50", "17:55", "18:35", "19:55",
      "20:50", "21:40", "22:45",
    ],
    saturday: [
      "7:25", "8:20", "9:35", "10:35", "12:05", "13:05", "14:05", "15:05",
      "16:05", "17:05", "17:55", "20:05", "21:40",
    ],
    sundayHoliday: ["8:20", "12:05 U", "14:05 U", "17:05 U", "20:05", "21:40 U"],
  },
];

export const busNotes: BusNote[] = [
  { code: "S", description: "kursuje wyłącznie w dni nauki szkolnej" },
  { code: "M", description: "kurs do Mińsk Mazowiecki Dworzec" },
  {
    code: "U",
    description:
      "nie kursuje w dwa dni Świąt Bożego Narodzenia, Nowy Rok, w dwa dni świąt wielkanocnych, w Boże Ciało, Trzech Króli, 15 sierpnia, 1 i 3 maja, 11 listopada",
  },
];
