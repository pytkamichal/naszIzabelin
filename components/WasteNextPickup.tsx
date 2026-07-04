"use client";

import { useEffect, useState } from "react";
import { wasteEvents, wasteKindLabels, type WasteKind } from "@/data/waste";
import { formatLongDatePL, formatWeekdayPL } from "@/lib/format";

const KINDS: WasteKind[] = ["bags", "pszok", "bulky"];

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/**
 * Highlights the next upcoming date for each waste stream. Computed on the
 * client (after mount) so it stays accurate to the visitor's "today" and
 * never triggers an SSR/hydration mismatch.
 */
export function WasteNextPickup() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayISO()), []);
  if (!today) return null;

  const next = KINDS.map((kind) =>
    wasteEvents.find((e) => e.kind === kind && e.date >= today),
  ).filter((e): e is (typeof wasteEvents)[number] => e !== undefined);

  if (next.length === 0) return null;

  return (
    <div className="mb-10 grid gap-4 sm:grid-cols-3">
      {next.map(({ kind, date }) => {
        const { label, icon } = wasteKindLabels[kind];
        return (
          <div
            key={kind}
            className="rounded-3xl border-t-4 border border-ink/10 border-t-gold-400 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-pine-700">
              Najbliższy odbiór
            </p>
            <p className="mt-2 flex items-center gap-2 font-serif text-xl font-semibold tracking-tight text-pine-900">
              <span aria-hidden>{icon}</span>
              {formatLongDatePL(date)}
            </p>
            <p className="text-sm capitalize text-ink/50">
              {formatWeekdayPL(date)}
            </p>
            <p className="mt-1.5 text-sm text-ink/70">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
