"use client";

import { useState } from "react";
import { navLinks, site } from "@/data/site";
import { protest } from "@/data/protest";
import { AirQuality } from "./AirQuality";
import { Weather } from "./Weather";
import { Icon } from "./ui/Icon";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip: air quality + weather + coffee button.
          z-50 keeps the tooltips above the main row below it. */}
      <div className="relative z-50 border-b border-slate-200 bg-slate-100/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-1.5">
          <span className="hidden truncate text-xs text-slate-500 sm:inline">
            Oficjalna strona mieszkańców wsi {site.name}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href={site.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-900 transition hover:bg-amber-100"
            >
              <Icon name="coffee" className="h-3.5 w-3.5" />
              Buy me a coffee
            </a>
            <Weather />
            <AirQuality />
          </div>
        </div>
      </div>

      {/* Main row */}
      <div className="relative z-40 border-b border-slate-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <a
            href="#top"
            className="shrink-0 font-serif text-2xl font-semibold tracking-tight text-brand-800"
          >
            Nasz {site.name}
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#strefa-6sp"
              className="animate-pulse-soft inline-flex items-center gap-1.5 rounded-md bg-blood px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm ring-2 ring-toxic/60 transition hover:bg-blood-dark md:gap-2 md:px-4 md:py-2 md:text-sm"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
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

        {open ? (
          <nav
            id="mobile-nav"
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
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
