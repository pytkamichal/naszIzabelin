import { site } from "@/data/site";

type Props = {
  /** "sm" for the header strip, "md" for the footer. */
  size?: "sm" | "md";
  /** Visible label (e.g. a bilingual "Buy me a coffee / Wesprzyj"). */
  label?: string;
  className?: string;
};

// Buy Me a Coffee button: keeps the brand cup + "Cookie" lettering, but uses
// the site's forest green (brand-600) so it matches the "Wyślij" submit button.
export function BuyMeACoffee({
  size = "md",
  label = "Buy me a coffee",
  className = "",
}: Props) {
  const isSm = size === "sm";

  return (
    <a
      href={site.buyMeACoffeeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ fontFamily: "var(--font-cookie), cursive" }}
      className={`inline-flex items-center rounded-lg bg-brand-600 leading-none text-white shadow-sm transition hover:bg-brand-500 ${
        isSm ? "gap-1.5 px-3 py-1.5 text-lg" : "gap-2 px-5 py-3 text-2xl"
      } ${className}`}
    >
      <CoffeeCup className={isSm ? "h-4 w-4" : "h-6 w-6"} />
      <span className="translate-y-px">{label}</span>
    </a>
  );
}

function CoffeeCup({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 8h10v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"
        fill="#FFDD00"
        stroke="#0D0C22"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M15 9h1.4a2.6 2.6 0 0 1 0 5.2H15"
        stroke="#0D0C22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M7.5 3.4c-.6.7-.6 1.4 0 2.1M10.5 3.4c-.6.7-.6 1.4 0 2.1"
        stroke="#0D0C22"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
