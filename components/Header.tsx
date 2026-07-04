import Link from "next/link";
import { navLinks, site } from "@/data/site";
import { protest } from "@/data/protest";
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";
import { BuyMeACoffee } from "./ui/BuyMeACoffee";
import { PriorityNav } from "./ui/PriorityNav";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating dark-glass bar — sits over the hero photo and stays while
          scrolling; everything (nav, alert, weather) lives inside it. */}
      <div className="mx-auto max-w-6xl overflow-visible rounded-2xl border border-white/10 bg-pine-950/85 shadow-[0_16px_48px_rgba(10,31,21,0.45)] backdrop-blur-xl">
        {/* Main row: logo · single-line priority nav · alert button */}
        <div className="flex h-16 items-center gap-2 px-3 sm:gap-4 sm:px-5">
          <Link
            href="/"
            className="flex shrink-0 items-baseline gap-1 font-serif text-xl font-semibold tracking-tight text-cream sm:text-2xl"
          >
            Nasz {site.name}
            <span aria-hidden className="text-gold-400">
              .
            </span>
          </Link>

          {/* Fills the middle; overflowing links collapse behind a `»` menu. */}
          <PriorityNav links={navLinks} />

          {/* Unmistakably a button: raised face, hard "pressed" shadow edge
              below, arrow affordance — links to the /strefa-6sp subpage. */}
          <Link
            href="/strefa-6sp"
            className="animate-pulse-soft group inline-flex shrink-0 items-center gap-1.5 rounded-xl border-2 border-toxic bg-blood px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-[0_4px_0_0_var(--color-blood-dark),0_8px_18px_rgba(209,31,42,0.45)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-blood-dark hover:shadow-[0_6px_0_0_var(--color-blood-dark),0_10px_22px_rgba(209,31,42,0.5)] active:translate-y-1 active:shadow-[0_0_0_0_var(--color-blood-dark)] md:gap-2 md:px-4 md:py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-toxic opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-toxic" />
            </span>
            {protest.navLabel}
            {/* Decorative arrow — hidden on the tightest phones to save space. */}
            <span
              aria-hidden
              className="hidden transition-transform duration-150 group-hover:translate-x-0.5 sm:inline"
            >
              →
            </span>
          </Link>
        </div>

        {/* Utility strip: live weather + air quality + support button. */}
        <div className="hidden items-center justify-between gap-2 border-t border-white/10 px-5 py-1.5 sm:flex">
          <span className="truncate text-[11px] uppercase tracking-[0.2em] text-cream/40">
            Strona mieszkańców wsi {site.name}
          </span>
          <div className="flex items-center gap-2">
            <BuyMeACoffee size="sm" />
            <Weather />
            <AirQuality />
          </div>
        </div>
      </div>
    </header>
  );
}
