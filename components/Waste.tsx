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
    <section id="odpady" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Gospodarka odpadami"
          icon="🗑️"
          title="Wywóz śmieci 2026"
          description={`Izabelin należy do rejonu „${wasteRejon}". Worki wystaw w dniu odbioru do godziny ${wastePutOutBy}. Wszystkie terminy znajdziesz w kalendarzu wydarzeń.`}
        />

        <WasteNextPickup />

        {/* Subskrypcja kalendarza odpadów */}
        <div className="mb-8 rounded-xl border border-brand-200 bg-brand-50 p-5">
          <h3 className="font-semibold text-slate-900">
            📅 Dodaj wywóz śmieci do swojego kalendarza
          </h3>
          <p className="mt-1 mb-4 text-sm text-slate-600">
            Wszystkie terminy trafią do Twojego kalendarza (telefon, Google,
            Apple), a wieczorem dzień przed każdym odbiorem dostaniesz
            przypomnienie. „Subskrybuj" aktualizuje się automatycznie, gdy
            zmieni się harmonogram.
          </p>
          <AddToCalendar path="/odpady.ics" />
        </div>

        {/* Kolory worków → frakcje */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {wasteBags.map((bag) => (
            <div
              key={bag.color}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {bag.icon}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{bag.color}</p>
                <p className="text-sm text-slate-600">{bag.fraction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Legenda + informacje */}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Oznaczenia</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              {KINDS.map((k) => (
                <li key={k} className="flex gap-2">
                  <span aria-hidden>{wasteKindLabels[k].icon}</span>
                  <span>{wasteKindLabels[k].label}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-slate-600">
              {pszok.name} — czynny w wyznaczone dni w godz. {pszok.hours}.
              Odpady zielone, bioodpady, popiół, gabaryty i elektroodpady należy
              dostarczyć do PSZOK-u we własnym zakresie.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-900">Wykonawca i kontakt</h3>
            <p className="mt-2 text-sm text-slate-600">{wasteOperator.name}</p>
            <p className="text-sm text-slate-600">{wasteOperator.address}</p>
            <p className="mt-1 text-sm text-slate-600">
              tel.{" "}
              {wasteOperator.phones.map((p, i) => (
                <span key={p}>
                  {i > 0 ? ", " : ""}
                  <a
                    href={`tel:${p.replace(/\s/g, "")}`}
                    className="font-medium text-brand-700 hover:text-brand-800"
                  >
                    {p}
                  </a>
                </span>
              ))}
            </p>
            <p className="text-sm text-slate-600">
              e-mail:{" "}
              <a
                href={`mailto:${wasteOperator.email}`}
                className="font-medium text-brand-700 hover:text-brand-800"
              >
                {wasteOperator.email}
              </a>
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Rejon II: {wasteLocalities.join(", ")}.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Źródło:{" "}
          <a
            href={wasteSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            Urząd Gminy Jakubów — harmonogram 2026
          </a>
        </p>
      </div>
    </section>
  );
}
