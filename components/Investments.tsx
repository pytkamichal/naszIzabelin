import {
  investments,
  investmentStatusLabels,
  type InvestmentStatus,
} from "@/data/investments";
import { SectionHeading } from "./ui/SectionHeading";

const statusStyles: Record<InvestmentStatus, string> = {
  done: "bg-pine-100 text-pine-800 ring-pine-600/25",
  in_progress: "bg-gold-300/40 text-gold-600 ring-gold-500/30",
  planned: "bg-blood/10 text-blood-dark ring-blood/25",
};

function StatusPill({ status }: { status: InvestmentStatus }) {
  const { label, icon } = investmentStatusLabels[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-sm font-bold ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

export function Investments() {
  return (
    <section id="inwestycje" className="bg-sand py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-5">
        <SectionHeading
          index="05"
          eyebrow="Infrastruktura"
          icon="🏗️"
          title="Inwestycje"
          description="Status najważniejszych inwestycji i prac we wsi."
        />

        {/* Tabela (od sm w górę) */}
        <div className="hidden overflow-hidden rounded-3xl border border-ink/10 shadow-md shadow-pine-900/5 sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-pine-950 text-xs uppercase tracking-[0.16em] text-cream/60">
                <th className="px-6 py-4 font-bold">Inwestycja</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Etap / Opis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5 bg-cream">
              {investments.map((item) => (
                <tr key={item.name} className="transition hover:bg-pine-50">
                  <td className="px-6 py-5 font-serif text-lg font-semibold tracking-tight text-pine-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-5">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="px-6 py-5 text-ink/70">{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Karty (na telefonach) */}
        <div className="space-y-4 sm:hidden">
          {investments.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-ink/10 bg-cream p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-lg font-semibold tracking-tight text-pine-900">
                  {item.name}
                </h3>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
