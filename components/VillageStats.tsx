import type { ReactNode } from "react";
import { village } from "@/data/village";
import { villageStats } from "@/data/stats";
import { SectionHeading } from "./ui/SectionHeading";
import { AnimatedNumber } from "./ui/AnimatedNumber";
import { Reveal } from "./ui/Reveal";

function pct(part: number): string {
  return `${Math.round((part / village.population) * 100)}%`;
}

export function VillageStats() {
  const s = villageStats;

  const cards: { key: string; value: ReactNode; label: string }[] = [
    {
      key: "population",
      value: <AnimatedNumber value={village.population} />,
      label: `Mieszkańcy (${village.populationYear})`,
    },
    {
      key: "women-men",
      value: (
        <>
          <AnimatedNumber value={s.women} /> / <AnimatedNumber value={s.men} />
        </>
      ),
      label: "Kobiety / Mężczyźni",
    },
    {
      key: "children",
      value: <AnimatedNumber value={s.childrenUnder18} />,
      label: `Dzieci, <18 lat · ${pct(s.childrenUnder18)}`,
    },
    {
      key: "working",
      value: <AnimatedNumber value={s.workingAge} />,
      label: `Wiek produkcyjny · ${pct(s.workingAge)}`,
    },
    {
      key: "post-working",
      value: <AnimatedNumber value={s.postWorkingAge} />,
      label: `Wiek poprodukcyjny · ${pct(s.postWorkingAge)}`,
    },
    {
      key: "growth",
      value: <AnimatedNumber value={s.growthSince1998Pct} prefix="+" suffix="%" />,
      label: "Wzrost od 1998 r.",
    },
  ];

  return (
    <section
      id="o-wsi"
      className="grain relative overflow-hidden bg-pine-950 py-24 text-cream"
    >
      {/* Soft radial glow behind the numbers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 20% 0%, rgba(227,174,53,0.08), transparent 70%), radial-gradient(50% 60% at 90% 100%, rgba(58,125,85,0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-5">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Statystyki"
            title="Wieś w liczbach"
            description="Nasza wieś według danych spisu powszechnego."
            tone="dark"
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-10">
          {cards.map((card, i) => (
            <Reveal key={card.key} delay={i * 80} className="h-full">
              <div className="flex h-full flex-col border-t-2 border-gold-400/50 pt-5">
                <span className="font-serif text-5xl font-semibold tracking-tight text-gold-300 lg:text-[3.4rem]">
                  {card.value}
                </span>
                <span className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] leading-relaxed text-cream/55">
                  {card.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-14 text-sm text-cream/45">
          Dane:{" "}
          <a
            href={s.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-gold-300/90 underline underline-offset-2 hover:text-gold-300"
          >
            {s.source.label}
          </a>
        </p>
      </div>
    </section>
  );
}
