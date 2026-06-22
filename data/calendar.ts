// Village calendar events. Date in ISO format (YYYY-MM-DD).

export type CalendarEvent = {
  date: string;
  icon: string;
  title: string;
  time?: string;
};

export const calendarEvents: CalendarEvent[] = [
  {
    date: "2026-06-22",
    icon: "🟢",
    title: "Sprawdzanie liczników wody",
    time: "od 16:00",
  },
  {
    date: "2026-06-24",
    icon: "🗑️",
    title: "Wywóz śmieci (zmieszane i plastik)",
  },
  {
    date: "2026-06-27",
    icon: "🚪",
    title: "Spotkania w świetlicy – warsztaty dla dzieci",
    time: "17:00",
  },
];
