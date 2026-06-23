import { village } from "@/data/village";
import { SectionHeading } from "./ui/SectionHeading";

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
    <section id="historia" className="bg-paper py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Dzieje wsi"
          title="Historia Izabelina"
        />

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="space-y-8">
            {sections.map((s) => (
              <div
                key={s.title}
                className="border-l-2 border-brand-200 pl-5"
              >
                <h3 className="font-serif text-xl font-semibold text-brand-800">
                  {s.title}
                </h3>
                {(Array.isArray(s.body) ? s.body : [s.body]).map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 leading-relaxed text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-slate-200 pt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Źródła
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {history.sources.map((source) => (
                <li key={source} className="flex gap-2">
                  <span aria-hidden className="text-brand-300">
                    •
                  </span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
