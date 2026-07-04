// Global site config and navigation.
// Edit the nav links and the "Buy me a coffee" URL here.

// Canonical public address of the site (no trailing slash). Single source of
// truth for metadata, the sitemap, robots.txt and the social-share (Open Graph)
// image. Resolved in order:
//   1. NEXT_PUBLIC_SITE_URL          — explicit override; set for a custom domain.
//   2. VERCEL_PROJECT_PRODUCTION_URL — Vercel's stable production domain,
//                                      injected automatically on every deploy.
//   3. http://localhost:3000         — local development.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Izabelin",
  url: resolveSiteUrl(),
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

// Hrefs are absolute ("/#...") so the anchors also work from subpages
// such as /strefa-6sp; on the home page the browser just scrolls.
export const navLinks: NavLink[] = [
  { href: "/#aktualnosci", label: "Aktualności" },
  { href: "/#historia", label: "Historia" },
  { href: "/#miejsca", label: "W okolicy" },
  { href: "/#kalendarz", label: "Kalendarz" },
  { href: "/#transport", label: "Autobusy" },
  { href: "/#odpady", label: "Śmieci" },
  { href: "/#inwestycje", label: "Inwestycje" },
  { href: "/#kontakty", label: "Kontakty" },
];
