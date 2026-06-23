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
    <div className="mb-8 grid gap-3 sm:grid-cols-3">
      {next.map(({ kind, date }) => {
        const { label, icon } = wasteKindLabels[kind];
        return (
          <div
            key={kind}
            className="rounded-xl border border-brand-200 bg-brand-50 p-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              Najbliższy odbiór
            </p>
            <p className="mt-1 flex items-center gap-2 text-lg font-bold text-slate-900">
              <span aria-hidden>{icon}</span>
              {formatLongDatePL(date)}
            </p>
            <p className="text-sm capitalize text-slate-500">
              {formatWeekdayPL(date)}
            </p>
            <p className="mt-1 text-sm text-slate-600">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
