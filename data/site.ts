// Global site config and navigation.
// Edit the nav links and the "Buy me a coffee" URL here.

export const site = {
  name: "Izabelin",
  // Canonical public address of the site. Used by metadata, the sitemap,
  // robots.txt and the social-share (Open Graph) image as a single source of
  // truth. Set NEXT_PUBLIC_SITE_URL to the real domain before deploying —
  // otherwise these point at localhost.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  buyMeACoffeeUrl: "https://www.buymeacoffee.com/michalpytka",
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
  { href: "#historia", label: "Historia" },
  { href: "#miejsca", label: "W okolicy" },
  { href: "#kalendarz", label: "Kalendarz" },
  { href: "#transport", label: "Autobusy" },
  { href: "#odpady", label: "Śmieci" },
  { href: "#inwestycje", label: "Inwestycje" },
  { href: "#kontakty", label: "Kontakty" },
];
