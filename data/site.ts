// Global site config and navigation.
// Edit the nav links and the "Buy me a coffee" URL here.

export const site = {
  name: "Izabelin",
  // TODO: paste your Buy Me a Coffee link.
  buyMeACoffeeUrl: "https://www.buymeacoffee.com/",
};

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "#aktualnosci", label: "Aktualności" },
  { href: "#kalendarz", label: "Kalendarz" },
  { href: "#inwestycje", label: "Inwestycje" },
  { href: "#kontakty", label: "Kontakty" },
];
