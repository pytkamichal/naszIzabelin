// Village calendar events. Date in ISO format (YYYY-MM-DD).
// Real waste-collection dates are merged in separately (see data/waste.ts),
// so the calendar is not empty even while this list is.

export type CalendarEvent = {
  date: string;
  icon: string;
  title: string;
  time?: string;
};

// Add real village events here, e.g.:
//   { date: "2026-07-01", icon: "🎉", title: "Festyn wiejski", time: "15:00" }
export const calendarEvents: CalendarEvent[] = [
  {
    date: "2026-09-15",
    icon: "🏠",
    title: "Termin płatności raty za podatek od nieruchomości",
  },
  {
    date: "2026-11-15",
    icon: "🏠",
    title: "Termin płatności raty za podatek od nieruchomości",
  },
];
