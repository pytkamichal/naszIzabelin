// Useful contacts. "phone" is optional (e.g. the Starlink card only has "note").

export type Contact = {
  role: string;
  icon: string;
  name: string;
  phone?: string;
  note?: string;
};

export const contacts: Contact[] = [
  {
    role: "Sołtys",
    icon: "📇",
    name: "Jan Kowalski",
    phone: "+48 123 456 789",
  },
  {
    role: "Kominiarz",
    icon: "🎩",
    name: "Usługi Kominiarskie",
    phone: "+48 987 654 321",
  },
  {
    role: "Szambo (wywóz)",
    icon: "🚚",
    name: "Usługi Asenizacyjne EKO",
    phone: "+48 555 666 777",
  },
  {
    role: "Odbiór śmieci",
    icon: "🗑️",
    name: "Zakład Gospodarki Komunalnej",
    phone: "+48 111 222 333",
  },
  {
    role: "Internet (lokalny dostawca)",
    icon: "🌐",
    name: "Net-Wieś S.A.",
    phone: "+48 444 444 444",
  },
  {
    role: "Dostępność Starlink",
    icon: "📡",
    name: "Status dla naszej lokalizacji",
    note: "Pełna dostępność (wymagany własny zestaw).",
  },
];
