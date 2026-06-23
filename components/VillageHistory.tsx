import { village } from "@/data/village";
import { SectionHeading } from "./ui/SectionHeading";

export function VillageHistory() {
  const { history } = village;

  return (
    <section id="historia" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Dzieje wsi"
          icon="📖"
          title="Historia Izabelina"
        />

        <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>📍</span> Położenie i obraz wsi
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.location}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>📜</span> Najstarsze wzmianki historyczne
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.oldestMentions}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>🔤</span> Pochodzenie nazwy
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.nameOrigin}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>🌾</span> Wieś w realiach dawnego Mazowsza
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.pastEconomy}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>⚔️</span> XIX wiek i okres zaborów
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.XIXCentury}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>🎖️</span> XX wiek – wojny i przemiany
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.XXCentury}
            </p>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-brand-700">
              <span>🏠</span> Okres powojenny
            </h3>
            <p className="mt-3 leading-relaxed text-slate-700">
              {history.postwar}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <blockquote className="text-center">
              <p className="text-lg font-semibold italic text-brand-700">
                „{village.quote.text}"
              </p>
              <p className="mt-2 text-sm text-slate-600">
                — {village.quote.author}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
