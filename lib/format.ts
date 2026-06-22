// Number and date formatting in the Polish locale.

const longDate = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDate = new Intl.DateTimeFormat("pl-PL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dayMonth = new Intl.DateTimeFormat("pl-PL", {
  day: "numeric",
  month: "long",
});

function parseISO(iso: string): Date {
  // Interpret as local midnight to avoid timezone shifts.
  return new Date(`${iso}T00:00:00`);
}

export function formatNumberPL(value: number): string {
  // "always" forces the thousands separator (pl-PL omits it for 4-digit
  // numbers), so 1234 -> "1 234".
  return new Intl.NumberFormat("pl-PL", { useGrouping: "always" }).format(value);
}

export function formatLongDatePL(iso: string): string {
  return longDate.format(parseISO(iso));
}

export function formatShortDatePL(iso: string): string {
  return shortDate.format(parseISO(iso));
}

export function formatDayMonthPL(iso: string): string {
  return dayMonth.format(parseISO(iso));
}
