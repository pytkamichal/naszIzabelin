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
      icon: "👥",
      value: formatNumberPL(village.population),
      label: `Mieszkańcy (${village.populationYear})`,
    },
    {
      icon: "👫",
      value: `${s.women} / ${s.men}`,
      label: "Kobiety / Mężczyźni",
    },
    {
      icon: "🧒",
      value: formatNumberPL(s.childrenUnder18),
      label: `Dzieci, <18 lat · ${pct(s.childrenUnder18)}`,
    },
    {
      icon: "🧑‍🌾",
      value: formatNumberPL(s.workingAge),
      label: `Wiek produkcyjny · ${pct(s.workingAge)}`,
    },
    {
      icon: "🧓",
      value: formatNumberPL(s.postWorkingAge),
      label: `Wiek poprodukcyjny · ${pct(s.postWorkingAge)}`,
    },
    {
      icon: "📈",
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cards.map((card) => (
            <div
              key={card.label}
              className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm"
            >
              <span className="text-3xl" aria-hidden>
                {card.icon}
              </span>
              <span className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {card.value}
              </span>
              <span className="mt-1 text-xs text-slate-500">{card.label}</span>
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
