import {
  busDirections,
  busLine,
  busNotes,
  busValidFrom,
  busGpsUrl,
  busSourceUrl,
  transportProvider,
  type BusDirection,
} from "@/data/transport";
import { SectionHeading } from "./ui/SectionHeading";

/** Renders one departure, styling the optional note suffix (e.g. "U", "SM"). */
function TimeChip({ value }: { value: string }) {
  const [time, note] = value.split(" ");
  return (
    <span className="rounded bg-white/5 px-2.5 py-1 text-base font-medium tracking-wider text-amber-300 ring-1 ring-inset ring-white/10">
      {time}
      {note ? (
        <sup className="ml-0.5 text-[0.6rem] font-bold text-amber-400/80">
          {note}
        </sup>
      ) : null}
    </span>
  );
}

function DayGroup({ label, times }: { label: string; times: string[] }) {
  if (times.length === 0) return null;
  return (
    <div className="px-5 py-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 font-mono">
        {times.map((t) => (
          <TimeChip key={t} value={t} />
        ))}
      </div>
    </div>
  );
}

function DirectionBoard({ direction }: { direction: BusDirection }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-md">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-300">
            🚏 Kierunek: {direction.to}
          </p>
          <p className="truncate text-xs text-slate-500">{direction.route}</p>
        </div>
        <span className="shrink-0 rounded bg-amber-400/90 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-slate-900">
          {busLine}
        </span>
      </div>

      <div className="divide-y divide-white/10">
        <DayGroup label="Dni powszednie (pon.–pt.)" times={direction.weekdays} />
        <DayGroup label="Soboty" times={direction.saturday} />
        <DayGroup label="Niedziele i święta" times={direction.sundayHoliday} />
      </div>
    </div>
  );
}

export function Transport() {
  return (
    <section id="transport" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Komunikacja"
          icon="🚍"
          title={`Rozkład jazdy autobusów ${transportProvider}`}
          description={`Linia ${busLine} · ważny od ${busValidFrom} Sprawdź, ile czasu zostało do odjazdu na bags-gps.com.pl.`}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {busDirections.map((direction) => (
            <DirectionBoard key={direction.to} direction={direction} />
          ))}
        </div>

        {/* Legenda oznaczeń */}
        <dl className="mt-5 space-y-1.5 text-sm text-slate-600">
          {busNotes.map((note) => (
            <div key={note.code} className="flex gap-2">
              <dt className="shrink-0 font-mono font-bold text-slate-900">
                {note.code}
              </dt>
              <dd>– {note.description}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-sm text-slate-500">
          Źródło:{" "}
          <a
            href={busSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            bags.com.pl
          </a>
          {" · "}
          <a
            href={busGpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            śledź autobus na żywo
          </a>
        </p>
      </div>
    </section>
  );
}
