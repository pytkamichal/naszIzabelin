"use client";

import { useEffect, useMemo, useState } from "react";
import { calendarEvents } from "@/data/calendar";
import { wasteCalendarEvents } from "@/data/waste";
import { notices } from "@/data/notices";
import { formatDayMonthPL, formatShortDatePL } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";
import { AddToCalendar } from "./AddToCalendar";

type View = "week" | "month" | "year";

const VIEWS: { id: View; label: string }[] = [
  { id: "week", label: "Tydzień" },
  { id: "month", label: "Miesiąc" },
  { id: "year", label: "Rok" },
];

// Wydarzenia wsi + terminy wywozu odpadów (harmonogram z data/waste.ts).
const sortedEvents = [...calendarEvents, ...wasteCalendarEvents].sort((a, b) =>
  a.date.localeCompare(b.date),
);
// Fallback dla pierwszego (serwerowego) renderu; po zamontowaniu używamy
// realnego „dziś", aby domyślny widok pokazywał bieżący okres.
const fallbackAnchor = sortedEvents[0]?.date ?? "2026-01-01";

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function isInView(eventDate: string, view: View, anchorDate: string): boolean {
  const event = new Date(`${eventDate}T00:00:00`);
  const anchor = new Date(`${anchorDate}T00:00:00`);
  if (view === "year") return event.getFullYear() === anchor.getFullYear();
  if (view === "month")
    return (
      event.getFullYear() === anchor.getFullYear() &&
      event.getMonth() === anchor.getMonth()
    );
  const days = (event.getTime() - anchor.getTime()) / 86_400_000;
  return days >= 0 && days < 7;
}

function dayNumber(iso: string): string {
  return String(new Date(`${iso}T00:00:00`).getDate());
}

export function CalendarBoard() {
  const [view, setView] = useState<View>("month");
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayISO()), []);

  const anchorDate = today ?? fallbackAnchor;

  const visible = useMemo(
    () => sortedEvents.filter((e) => isInView(e.date, view, anchorDate)),
    [view, anchorDate],
  );

  return (
    <section id="kalendarz" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="04"
          eyebrow="Życie wsi"
          icon="📅"
          title="Kalendarz i tablica ogłoszeń"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Kalendarz */}
          <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-md shadow-pine-900/5">
            <div className="mb-6 flex items-center justify-between gap-3">
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-pine-900">
                Wydarzenia
              </h3>
              <div
                role="tablist"
                aria-label="Zakres kalendarza"
                className="inline-flex rounded-full border border-ink/10 bg-sand p-1"
              >
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={view === v.id}
                    onClick={() => setView(v.id)}
                    className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                      view === v.id
                        ? "bg-pine-900 text-cream shadow-sm"
                        : "text-ink/55 hover:text-ink"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-3">
              {visible.length === 0 ? (
                <li className="rounded-2xl bg-sand px-4 py-7 text-center text-sm text-ink/55">
                  Brak wydarzeń w wybranym zakresie.
                </li>
              ) : (
                visible.map((event) => (
                  <li
                    key={`${event.date}-${event.title}`}
                    className="flex items-center gap-4 rounded-2xl border border-ink/5 bg-cream p-3.5 transition hover:border-gold-500/40"
                  >
                    <div className="flex h-13 w-13 shrink-0 flex-col items-center justify-center rounded-xl bg-pine-900 py-2 text-cream">
                      <span className="font-serif text-xl font-semibold leading-none text-gold-300">
                        {dayNumber(event.date)}
                      </span>
                      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-cream/70">
                        {formatDayMonthPL(event.date).split(" ")[1]?.slice(0, 3)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">
                        <span className="mr-1" aria-hidden>
                          {event.icon}
                        </span>
                        {event.title}
                      </p>
                      <p className="text-sm text-ink/55">
                        {formatDayMonthPL(event.date)}
                        {event.time ? ` · ${event.time}` : ""}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="mt-6 border-t border-ink/10 pt-5">
              <p className="mb-3 text-sm font-medium text-ink/65">
                Dodaj kalendarz wsi (wydarzenia + wywóz śmieci) do telefonu:
              </p>
              <AddToCalendar path="/kalendarz.ics" />
            </div>
          </div>

          {/* Tablica ogłoszeń */}
          <div
            id="aktualnosci"
            className="rounded-3xl border border-ink/10 bg-white p-7 shadow-md shadow-pine-900/5"
          >
            <h3 className="mb-6 font-serif text-2xl font-semibold tracking-tight text-pine-900">
              📌 Ogłoszenia
            </h3>
            <ul className="space-y-3">
              {notices.length === 0 ? (
                <li className="rounded-2xl bg-sand px-4 py-7 text-center text-sm text-ink/55">
                  Brak aktualnych ogłoszeń.
                </li>
              ) : (
                notices.map((notice) => (
                  <li
                    key={notice.date + notice.text}
                    className="rounded-2xl border border-ink/5 bg-cream p-4"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-gold-600">
                      {formatShortDatePL(notice.date)}
                    </p>
                    <p className="mt-1.5 leading-relaxed text-ink/80">
                      {notice.text}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
