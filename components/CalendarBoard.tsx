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
    <section id="kalendarz" className="bg-paper py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Życie wsi"
          icon="📅"
          title="Kalendarz i tablica ogłoszeń"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Kalendarz */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Wydarzenia</h3>
              <div
                role="tablist"
                aria-label="Zakres kalendarza"
                className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5"
              >
                {VIEWS.map((v) => (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={view === v.id}
                    onClick={() => setView(v.id)}
                    className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                      view === v.id
                        ? "bg-white text-brand-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-3">
              {visible.length === 0 ? (
                <li className="rounded-lg bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
                  Brak wydarzeń w wybranym zakresie.
                </li>
              ) : (
                visible.map((event) => (
                  <li
                    key={`${event.date}-${event.title}`}
                    className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50/60 p-3"
                  >
                    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-brand-600 text-white">
                      <span className="text-lg font-bold leading-none">
                        {dayNumber(event.date)}
                      </span>
                      <span className="text-[10px] uppercase">
                        {formatDayMonthPL(event.date).split(" ")[1]?.slice(0, 3)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">
                        <span className="mr-1" aria-hidden>
                          {event.icon}
                        </span>
                        {event.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {formatDayMonthPL(event.date)}
                        {event.time ? ` · ${event.time}` : ""}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="mb-2 text-sm font-medium text-slate-600">
                Dodaj kalendarz wsi (wydarzenia + wywóz śmieci) do telefonu:
              </p>
              <AddToCalendar path="/kalendarz.ics" />
            </div>
          </div>

          {/* Tablica ogłoszeń */}
          <div
            id="aktualnosci"
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="mb-5 text-lg font-semibold text-slate-900">
              📌 Ogłoszenia
            </h3>
            <ul className="divide-y divide-slate-100">
              {notices.map((notice) => (
                <li key={notice.date + notice.text} className="py-3 first:pt-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {formatShortDatePL(notice.date)}
                  </p>
                  <p className="mt-1 text-slate-700">{notice.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
