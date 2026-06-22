import {
  investments,
  investmentStatusLabels,
  type InvestmentStatus,
} from "@/data/investments";
import { SectionHeading } from "./ui/SectionHeading";

const statusStyles: Record<InvestmentStatus, string> = {
  done: "bg-green-100 text-green-800 ring-green-600/20",
  in_progress: "bg-amber-100 text-amber-800 ring-amber-600/20",
  planned: "bg-red-100 text-red-800 ring-red-600/20",
};

function StatusPill({ status }: { status: InvestmentStatus }) {
  const { label, icon } = investmentStatusLabels[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-sm font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}

export function Investments() {
  return (
    <section id="inwestycje" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Infrastruktura"
          icon="🏗️"
          title="Inwestycje"
          description="Status najważniejszych inwestycji i prac we wsi."
        />

        {/* Tabela (od sm w górę) */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 shadow-sm sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-sm uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-semibold">Inwestycja</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Etap / Opis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {investments.map((item) => (
                <tr key={item.name} className="hover:bg-slate-50/60">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {item.name}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={item.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Karty (na telefonach) */}
        <div className="space-y-3 sm:hidden">
          {investments.map((item) => (
            <div
              key={item.name}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <StatusPill status={item.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
