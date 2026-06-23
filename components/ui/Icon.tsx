// Small, consistent stroke-based icon set (inherits `currentColor`).
// Replaces decorative emoji so the chrome reads as deliberate, not playful.

export type IconName =
  | "users"
  | "leaf"
  | "coffee"
  | "arrow-right"
  | "map-pin"
  | "quote"
  | "school"
  | "store"
  | "cart"
  | "pharmacy"
  | "building"
  | "church"
  | "mail"
  | "tools";

type IconProps = {
  name: IconName;
  className?: string;
};

const paths: Record<IconName, React.ReactNode> = {
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6" />
    </>
  ),
  coffee: (
    <>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M6 2v2M10 2v2M14 2v2" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  quote: (
    <>
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h4" />
      <path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v4c0 1.25.75 2 2 2h4" />
    </>
  ),
  school: (
    <>
      <path d="M22 9 12 5 2 9l10 4 10-4Z" />
      <path d="M6 11v5c0 1.1 2.7 2.5 6 2.5s6-1.4 6-2.5v-5" />
      <path d="M22 9v5" />
    </>
  ),
  store: (
    <>
      <path d="M3 7 4.5 3.5h15L21 7" />
      <path d="M4 7v12a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7" />
      <path d="M3 7h18" />
      <path d="M9.5 20v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="18" cy="20" r="1.3" />
      <path d="M2 3h2.2l2.3 12.2a1.5 1.5 0 0 0 1.5 1.2h9.3a1.5 1.5 0 0 0 1.5-1.2L21 6.5H6" />
    </>
  ),
  pharmacy: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3.5" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9.5 10h.01M14.5 10h.01M9.5 14h.01M14.5 14h.01" />
      <path d="M10.5 21v-3a1.5 1.5 0 0 1 3 0v3" />
    </>
  ),
  church: (
    <>
      <path d="M12 2v6M9.5 4.5h5" />
      <path d="M6 22V11l6-3.5 6 3.5v11" />
      <path d="M9.5 22v-4a2.5 2.5 0 0 1 5 0v4" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  tools: (
    <>
      <path d="M14.6 6.1a3.8 3.8 0 0 0-5.1 5.1L3 17.7V21h3.3l6.5-6.5a3.8 3.8 0 0 0 5.1-5.1l-2.4 2.4-2.6-.6-.6-2.6 2.3-2.5Z" />
    </>
  ),
};

export function Icon({ name, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
