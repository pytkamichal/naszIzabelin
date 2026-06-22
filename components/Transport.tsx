import { busLines, transportProvider } from "@/data/transport";
import { SectionHeading } from "./ui/SectionHeading";

export function Transport() {
  return (
    <section id="transport" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Komunikacja"
          icon="🚍"
          title={`Rozkład jazdy autobusów ${transportProvider}`}
        />

        {/* Timetable graphic — styled "departures board" */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-md">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-300">
              🚏 Odjazdy
            </span>
            <span className="rounded bg-amber-400/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-900">
              {transportProvider}
            </span>
          </div>

          <div className="divide-y divide-white/10">
            {busLines.map((line) => (
              <div
                key={line.line}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center"
              >
                <span className="inline-flex w-fit items-center rounded-md bg-brand-600 px-3 py-1 text-sm font-bold text-white">
                  {line.line}
                </span>
                <div className="flex flex-wrap gap-2 font-mono">
                  {line.times.map((time) => (
                    <span
                      key={time}
                      className="rounded bg-white/5 px-2.5 py-1 text-base font-medium tracking-wider text-amber-300 ring-1 ring-inset ring-white/10"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Grafika poglądowa — podmień na oficjalny rozkład jazdy {transportProvider}.
        </p>
      </div>
    </section>
  );
}
