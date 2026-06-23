// Global site config and navigation.
// Edit the nav links and the "Buy me a coffee" URL here.

export const site = {
  name: "Izabelin",
  // TODO: paste your Buy Me a Coffee link.
  buyMeACoffeeUrl: "https://www.buymeacoffee.com/",
};

// Air-quality widget location (Open-Meteo, by coordinates).
export const air = {
  locationName: "Jakubów",
  latitude: 52.2,
  // TODO: fine-tune the exact coordinates for Jakubów if needed.
  longitude: 21.79,
};

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "#aktualnosci", label: "Aktualności" },
  { href: "#kalendarz", label: "Kalendarz" },
  { href: "#inwestycje", label: "Inwestycje" },
  { href: "#kontakty", label: "Kontakty" },
];
