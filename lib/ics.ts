// Minimal RFC 5545 (iCalendar) builder for static, all-day events.
// Used to expose the waste schedule and village calendar as subscribable /
// downloadable .ics feeds (see app/odpady.ics and app/kalendarz.ics).

export type IcsEvent = {
  /** Stable unique id — keep constant so subscriptions update in place. */
  uid: string;
  /** All-day date, yyyy-mm-dd. */
  date: string;
  /** SUMMARY shown in the calendar. */
  title: string;
  /** Optional DESCRIPTION / notes. */
  description?: string;
  /**
   * Hours before event start to fire a DISPLAY reminder. For an all-day event
   * (starts at local midnight), 6 → 18:00 the day before. Omit for no alarm.
   */
  reminderHoursBefore?: number;
};

// Escape per RFC 5545 §3.3.11 (backslash, semicolon, comma, newline).
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

// Fold lines longer than 75 chars (RFC 5545 §3.1). Split by code points so
// emoji / surrogate pairs are never broken.
function foldLine(line: string): string {
  const chars = Array.from(line);
  if (chars.length <= 75) return line;
  let out = chars.slice(0, 75).join("");
  let rest = chars.slice(75);
  while (rest.length > 74) {
    out += "\r\n " + rest.slice(0, 74).join("");
    rest = rest.slice(74);
  }
  return out + "\r\n " + rest.join("");
}

// yyyy-mm-dd -> yyyymmdd
function compactDate(iso: string): string {
  return iso.replace(/-/g, "");
}

function addDaysISO(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

// e.g. 20260624T120000Z
function utcStamp(date = new Date()): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function buildCalendar(opts: {
  name: string;
  events: IcsEvent[];
}): string {
  const stamp = utcStamp();
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Izabelin//Kalendarz//PL",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeText(opts.name)}`,
    "X-WR-TIMEZONE:Europe/Warsaw",
  ];

  for (const ev of opts.events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${ev.uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    // All-day event: DTEND is the (exclusive) next day.
    lines.push(`DTSTART;VALUE=DATE:${compactDate(ev.date)}`);
    lines.push(`DTEND;VALUE=DATE:${compactDate(addDaysISO(ev.date, 1))}`);
    lines.push(`SUMMARY:${escapeText(ev.title)}`);
    if (ev.description) {
      lines.push(`DESCRIPTION:${escapeText(ev.description)}`);
    }
    if (ev.reminderHoursBefore != null) {
      lines.push("BEGIN:VALARM");
      lines.push("ACTION:DISPLAY");
      lines.push(`DESCRIPTION:${escapeText(ev.title)}`);
      lines.push(`TRIGGER:-PT${ev.reminderHoursBefore}H`);
      lines.push("END:VALARM");
    }
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");
  return lines.map(foldLine).join("\r\n") + "\r\n";
}
