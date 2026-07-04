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
    <span className="rounded-md bg-white/5 px-2.5 py-1 text-base font-medium tracking-wider text-gold-300 ring-1 ring-inset ring-white/10">
      {time}
      {note ? (
        <sup className="ml-0.5 text-[0.6rem] font-bold text-gold-400/80">
          {note}
        </sup>
      ) : null}
    </span>
  );
}

function DayGroup({ label, times }: { label: string; times: string[] }) {
  if (times.length === 0) return null;
  return (
    <div className="px-6 py-5">
      <p className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.2em] text-cream/40">
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
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-pine-900/70 shadow-xl shadow-black/20 backdrop-blur">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-4">
        <div className="min-w-0">
          <p className="font-serif text-lg font-semibold tracking-tight text-cream">
            🚏 Kierunek: {direction.to}
          </p>
          <p className="truncate text-xs text-cream/45">{direction.route}</p>
        </div>
        <span className="shrink-0 rounded-md bg-gold-400 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-pine-950">
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
    <section
      id="transport"
      className="grain relative overflow-hidden bg-pine-950 py-24 text-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 85% 0%, rgba(227,174,53,0.07), transparent 70%), radial-gradient(50% 60% at 10% 100%, rgba(58,125,85,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="06"
          eyebrow="Komunikacja"
          icon="🚍"
          title={`Rozkład jazdy autobusów ${transportProvider}`}
          description={`Linia ${busLine} · ważny od ${busValidFrom} Sprawdź, ile czasu zostało do odjazdu na bags-gps.com.pl.`}
          tone="dark"
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {busDirections.map((direction) => (
            <DirectionBoard key={direction.to} direction={direction} />
          ))}
        </div>

        {/* Legenda oznaczeń */}
        <dl className="mt-8 space-y-1.5 text-sm text-cream/55">
          {busNotes.map((note) => (
            <div key={note.code} className="flex gap-2">
              <dt className="shrink-0 font-mono font-bold text-gold-300">
                {note.code}
              </dt>
              <dd>– {note.description}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-5 text-sm text-cream/45">
          Źródło:{" "}
          <a
            href={busSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-300/90 underline underline-offset-2 hover:text-gold-300"
          >
            bags.com.pl
          </a>
          {" · "}
          <a
            href={busGpsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-300/90 underline underline-offset-2 hover:text-gold-300"
          >
            śledź autobus na żywo
          </a>
        </p>
      </div>
    </section>
  );
}
