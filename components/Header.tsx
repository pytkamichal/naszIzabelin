import { navLinks, site } from "@/data/site";
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";
import { BrandLink } from "./ui/BrandLink";
import { BuyMeACoffee } from "./ui/BuyMeACoffee";
import { PriorityNav } from "./ui/PriorityNav";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating dark-glass bar — sits over the hero photo and stays while
          scrolling; everything (nav, alert, weather) lives inside it. */}
      <div className="mx-auto max-w-6xl overflow-visible rounded-2xl border border-white/10 bg-pine-950/85 shadow-[0_16px_48px_rgba(10,31,21,0.45)] backdrop-blur-xl">
        {/* Main row: logo · single-line priority nav */}
        <div className="flex h-16 items-center gap-1.5 px-2.5 max-[360px]:gap-1 sm:gap-4 sm:px-5">
          <BrandLink className="flex shrink-0 items-baseline gap-1 font-serif text-xl font-semibold tracking-tight text-cream max-[360px]:text-lg sm:text-2xl">
            Nasz {site.name}
            <span aria-hidden className="text-gold-400">
              .
            </span>
          </BrandLink>

          {/* Fills the middle; overflowing links collapse behind a `»` menu. */}
          <PriorityNav links={navLinks} />
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
