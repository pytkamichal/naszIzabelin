import {
  pszok,
  wasteBags,
  wasteKindLabels,
  wasteLocalities,
  wasteOperator,
  wastePutOutBy,
  wasteRejon,
  wasteSourceUrl,
  type WasteKind,
} from "@/data/waste";
import { SectionHeading } from "./ui/SectionHeading";
import { WasteNextPickup } from "./WasteNextPickup";
import { AddToCalendar } from "./AddToCalendar";

const KINDS: WasteKind[] = ["bags", "pszok", "bulky"];

export function Waste() {
  return (
    <section id="odpady" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="07"
          eyebrow="Gospodarka odpadami"
          icon="🗑️"
          title="Wywóz śmieci 2026"
          description={`Izabelin należy do rejonu „${wasteRejon}". Worki wystaw w dniu odbioru do godziny ${wastePutOutBy}. Wszystkie terminy znajdziesz w kalendarzu wydarzeń.`}
        />

        <WasteNextPickup />

        {/* Subskrypcja kalendarza odpadów */}
        <div className="mb-10 rounded-3xl border border-pine-800/15 bg-pine-50 p-6">
          <h3 className="font-serif text-xl font-semibold tracking-tight text-pine-900">
            📅 Dodaj wywóz śmieci do swojego kalendarza
          </h3>
          <p className="mt-2 mb-5 max-w-2xl text-sm leading-relaxed text-ink/70">
            Wszystkie terminy trafią do Twojego kalendarza (telefon, Google,
            Apple), a wieczorem dzień przed każdym odbiorem dostaniesz
            przypomnienie. „Subskrybuj" aktualizuje się automatycznie, gdy
            zmieni się harmonogram.
          </p>
          <AddToCalendar path="/odpady.ics" />
        </div>

        {/* Kolory worków → frakcje */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wasteBags.map((bag) => (
            <div
              key={bag.color}
              className="flex items-start gap-3 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm transition hover:border-gold-500/40 hover:shadow-md"
            >
              <span className="text-2xl" aria-hidden>
                {bag.icon}
              </span>
              <div>
                <p className="font-serif text-lg font-semibold tracking-tight text-pine-900">
                  {bag.color}
                </p>
                <p className="text-sm text-ink/65">{bag.fraction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legenda + informacje */}
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-ink/10 bg-sand p-6">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-pine-700">
              Oznaczenia
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              {KINDS.map((k) => (
                <li key={k} className="flex gap-2">
                  <span aria-hidden>{wasteKindLabels[k].icon}</span>
                  <span>{wasteKindLabels[k].label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink/70">
              {pszok.name} — czynny w wyznaczone dni w godz. {pszok.hours}.
              Odpady zielone, bioodpady, popiół, gabaryty i elektroodpady należy
              dostarczyć do PSZOK-u we własnym zakresie.
            </p>
          </div>

          <div className="rounded-3xl border border-ink/10 bg-sand p-6">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.22em] text-pine-700">
              Wykonawca i kontakt
            </h3>
            <p className="mt-3 text-sm text-ink/70">{wasteOperator.name}</p>
            <p className="text-sm text-ink/70">{wasteOperator.address}</p>
            <p className="mt-1.5 text-sm text-ink/70">
              tel.{" "}
              {wasteOperator.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 ? ", " : ""}
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="font-semibold text-pine-700 hover:text-pine-800"
                  >
                    {p}
                  </a>
                </span>
              ))}
            </p>
            <p className="text-sm text-ink/70">
              e-mail:{" "}
              <a
                href={`mailto:${wasteOperator.email}`}
                className="font-semibold text-pine-700 hover:text-pine-800"
              >
                {wasteOperator.email}
              </a>
            </p>
            <p className="mt-4 text-xs text-ink/50">
              Rejon II: {wasteLocalities.join(", ")}.
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm text-ink/50">
          Źródło:{" "}
          <a
            href={wasteSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-pine-700 underline underline-offset-2 hover:text-pine-800"
          >
            Urząd Gminy Jakubów — harmonogram 2026
          </a>
        </p>
      </div>
    </section>
  );
}
