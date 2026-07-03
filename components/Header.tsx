"use client";

import { useState } from "react";
import { navLinks, site } from "@/data/site";
import { protest } from "@/data/protest";
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";
import { BuyMeACoffee } from "./ui/BuyMeACoffee";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      {/* Floating dark-glass bar — sits over the hero photo and stays while
          scrolling; everything (nav, alert, weather) lives inside it. */}
      <div className="mx-auto max-w-6xl overflow-visible rounded-2xl border border-white/10 bg-pine-950/85 shadow-[0_16px_48px_rgba(10,31,21,0.45)] backdrop-blur-xl">
        {/* Main row */}
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-5">
          <a
            href="#top"
            className="flex shrink-0 items-baseline gap-1 font-serif text-xl font-semibold tracking-tight text-cream sm:text-2xl"
          >
            Nasz {site.name}
            <span aria-hidden className="text-gold-400">
              .
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-2 text-[13px] font-semibold text-cream/70 transition hover:bg-white/10 hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#strefa-6sp"
              className="animate-pulse-soft inline-flex items-center gap-1.5 rounded-lg bg-blood px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm ring-2 ring-toxic/60 transition hover:bg-blood-dark md:gap-2 md:px-4 md:py-2"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-toxic opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-toxic" />
              </span>
              {protest.navLabel}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-cream/80 hover:bg-white/10 hover:text-cream lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Otwórz menu"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
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

        {open ? (
          <nav
            id="mobile-nav"
            className="border-t border-white/10 px-4 py-3 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-semibold text-cream/85 hover:bg-white/10 hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
