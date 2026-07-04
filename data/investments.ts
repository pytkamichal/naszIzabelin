// Investments and infrastructure. Status: "done" | "in_progress" | "planned".

export type InvestmentStatus = "done" | "in_progress" | "planned";

export type Investment = {
  name: string;
  status: InvestmentStatus;
  description: string;
};

export const investments: Investment[] = [
  {
    name: "Światłowód",
    status: "done",
    description: "Dostępny dla mieszkańców.",
  },
  {
    name: "Kanalizacja",
    status: "in_progress",
    description: "Faza I zakończona. Trwają odbiory techniczne.",
  },
];

export const investmentStatusLabels: Record<
  InvestmentStatus,
  { label: string; icon: string }
> = {
  done: { label: "Ukończono", icon: "🟢" },
  in_progress: { label: "W trakcie", icon: "🟡" },
  planned: { label: "Planowane", icon: "🔴" },
};
