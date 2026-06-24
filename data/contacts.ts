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
    name: "Leszek Miąsek",
    phone: "+48 509 127 391",
  },
  {
    role: "Inkasent Gminny",
    icon: "💰",
    name: "-",
    phone: "+48 530 194 147",
  },
  {
    role: "Kominiarz",
    icon: "🎩",
    name: "Usługi Kominiarskie",
    phone: "-",
  },
  {
    role: "Szambo (wywóz)",
    icon: "🚚",
    name: "-",
    phone: "-",
  },
  {
    role: "Odbiór śmieci",
    icon: "🗑️",
    name: "-",
    phone: "-",
  },
  {
    role: "Internet światłowodowy",
    icon: "🌐",
    name: "-",
    phone: "-",
  },
  {
    role: "Dostępność Starlink",
    icon: "📡",
    name: "Status dla naszej lokalizacji",
    note: "Pełna dostępność (wymagany własny zestaw).",
  },
  {
    role: "Opieka zdrowotna",
    icon: "⚕️",
    name: "Rodzinny NZOZ - przychodnia",
    phone: "+48 25 726 02 10",
    note: "ul. Mińska 9, Jakubów",
  },
  {
    role: "Społeczność",
    icon: "💬",
    name: "Dołącz do nas na Messengerze",
    note: "Skontaktuj się z administratorem strony",
  },
];
