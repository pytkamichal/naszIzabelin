import { village } from "@/data/village";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

export function VillageHistory() {
  const { history } = village;

  const sections: { title: string; body: string | string[] }[] = [
    { title: "Położenie i obraz wsi", body: history.location },
    { title: "Najstarsze wzmianki historyczne", body: history.oldestMentions },
    { title: "Pochodzenie nazwy", body: history.nameOrigin },
    { title: "Wieś w realiach dawnego Mazowsza", body: history.pastEconomy },
    { title: "XIX wiek i okres zaborów", body: history.XIXCentury },
    { title: "XX wiek – wojny i przemiany", body: history.XXCentury },
    { title: "Okres powojenny", body: history.postwar },
    {
      title: "Ciekawostki i lokalne przekazy (tradycja ustna)",
      body: history.localLore,
    },
    { title: "Podsumowanie", body: history.summary },
  ];

  return (
    <section id="historia" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <div className="gap-14 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Left column: heading + sources, sticky on desktop so it keeps
              the reader company along the long timeline. */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Reveal>
              <SectionHeading
                index="02"
                eyebrow="Dzieje wsi"
                title="Historia Izabelina"
              />
            </Reveal>

            <Reveal>
              <div className="mb-12 rounded-2xl border border-ink/10 bg-sand p-6 lg:mb-0">
                <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-pine-700">
                  Źródła
                </h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/70">
                  {history.sources.map((source) => (
                    <li key={source} className="flex gap-2">
                      <span aria-hidden className="text-gold-500">
                        ✦
                      </span>
                      <span>{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right column: the timeline itself. */}
          <div className="relative space-y-12 before:absolute before:inset-y-2 before:left-[6px] before:w-px before:bg-pine-800/20">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 2) * 90}>
                <div className="relative pl-10">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[8px] h-[13px] w-[13px] rounded-full border-2 border-gold-500 bg-cream"
                  />
                  <h3 className="font-serif text-2xl font-semibold tracking-tight text-pine-900">
                    {s.title}
                  </h3>
                  {(Array.isArray(s.body) ? s.body : [s.body]).map(
                    (paragraph, pIdx) => (
                      <p
                        key={paragraph}
                        className={`mt-4 leading-relaxed text-ink/75 ${
                          i === 0 && pIdx === 0
                            ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-gold-500"
                            : ""
                        }`}
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
