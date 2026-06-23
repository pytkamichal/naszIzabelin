import { village } from "@/data/village";
import { villageStats } from "@/data/stats";
import { formatNumberPL } from "@/lib/format";
import { SectionHeading } from "./ui/SectionHeading";

function pct(part: number): string {
  return `${Math.round((part / village.population) * 100)}%`;
}

export function VillageStats() {
  const s = villageStats;

  const cards = [
    {
      value: formatNumberPL(village.population),
      label: `Mieszkańcy (${village.populationYear})`,
    },
    {
      value: `${s.women} / ${s.men}`,
      label: "Kobiety / Mężczyźni",
    },
    {
      value: formatNumberPL(s.childrenUnder18),
      label: `Dzieci, <18 lat · ${pct(s.childrenUnder18)}`,
    },
    {
      value: formatNumberPL(s.workingAge),
      label: `Wiek produkcyjny · ${pct(s.workingAge)}`,
    },
    {
      value: formatNumberPL(s.postWorkingAge),
      label: `Wiek poprodukcyjny · ${pct(s.postWorkingAge)}`,
    },
    {
      value: `+${formatNumberPL(s.growthSince1998Pct)}%`,
      label: "Wzrost od 1998 r.",
    },
  ];

  return (
    <section id="o-wsi" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Statystyki"
          icon="📊"
          title="Wieś w liczbach"
          description="Nasza wieś według danych spisu powszechnego."
        />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm sm:grid-cols-3 lg:grid-cols-6">
          {cards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center bg-white px-4 py-7 text-center"
            >
              <span className="font-serif text-3xl font-semibold tracking-tight text-brand-700 sm:text-4xl">
                {card.value}
              </span>
              <span className="mt-2 text-xs leading-snug text-slate-500">
                {card.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Dane:{" "}
          <a
            href={s.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            {s.source.label}
          </a>
        </p>
      </div>
    </section>
  );
}
