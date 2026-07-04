"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import type { NavLink } from "@/data/site";

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ITEM_CLASS =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] font-semibold text-cream/70 transition hover:bg-white/10 hover:text-cream";

// Small "Nowość"-style pill shown next to flagged links.
function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-gold-400 px-1.5 py-0.5 text-[9px] font-extrabold uppercase leading-none tracking-wide text-pine-950">
      {label}
    </span>
  );
}

// Matches the flex `gap` used on the nav rows below (gap-0.5 = 2px).
const GAP = 2;

/**
 * Single-line "priority navigation": renders as many links as fit on one line
 * and tucks the overflow behind a `»` button that expands into a dropdown.
 * At very narrow widths every link ends up under `»`, so this doubles as the
 * mobile menu (no separate hamburger needed).
 */
export function PriorityNav({ links }: { links: NavLink[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  // How many links are shown inline; the rest go into the dropdown.
  const [visibleCount, setVisibleCount] = useState(links.length);
  const [open, setOpen] = useState(false);

  const recompute = useCallback(() => {
    const container = containerRef.current;
    const measurer = measureRef.current;
    if (!container || !measurer) return;

    // Small safety margin so a sub-pixel rounding never forces a wrap.
    const available = container.clientWidth - 2;
    const itemEls = Array.from(
      measurer.querySelectorAll<HTMLElement>("[data-nav-item]"),
    );
    const moreEl = measurer.querySelector<HTMLElement>("[data-more]");
    if (itemEls.length === 0 || !moreEl) return;

    const widths = itemEls.map((el) => el.getBoundingClientRect().width);
    const moreWidth = moreEl.getBoundingClientRect().width;

    const totalAll =
      widths.reduce((sum, w) => sum + w, 0) + GAP * (widths.length - 1);

    // Everything fits — no overflow button needed.
    if (totalAll <= available) {
      setVisibleCount(links.length);
      return;
    }

    // Otherwise fit as many as possible while reserving room for the `»` button.
    let used = 0;
    let count = 0;
    for (let i = 0; i < widths.length; i++) {
      const add = widths[i] + (count > 0 ? GAP : 0);
      if (used + add + GAP + moreWidth <= available) {
        used += add;
        count++;
      } else {
        break;
      }
    }
    setVisibleCount(count);
  }, [links.length]);

  useIsoLayoutEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    window.addEventListener("resize", recompute);
    // Re-measure once the web font has loaded (glyph widths change).
    document.fonts?.ready.then(recompute).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
  }, [recompute]);

  // Close the dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!overflowRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const visible = links.slice(0, visibleCount);
  const overflow = links.slice(visibleCount);

  return (
    <div ref={containerRef} className="relative min-w-0 flex-1">
      {/* Hidden measurer: every link + the `»` button laid out in one row so we
          can read their natural widths. Clipped to 0×0 so it never affects
          layout or page scroll. */}
      <div
        aria-hidden
        className="pointer-events-none invisible absolute left-0 top-0 h-0 w-0 overflow-hidden"
      >
        <div ref={measureRef} className="flex w-max items-center gap-0.5">
          {links.map((link) => (
            <span key={link.href} data-nav-item className={ITEM_CLASS}>
              {link.label}
              {link.badge ? <Badge label={link.badge} /> : null}
            </span>
          ))}
          <span data-more className={ITEM_CLASS} aria-hidden>
            <Chevrons />
          </span>
        </div>
      </div>

      {/* Real, visible nav row */}
      <nav className="flex items-center gap-0.5">
        {visible.map((link) => (
          <Link key={link.href} href={link.href} className={ITEM_CLASS}>
            {link.label}
            {link.badge ? <Badge label={link.badge} /> : null}
          </Link>
        ))}

        {overflow.length > 0 ? (
          <div ref={overflowRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-haspopup="menu"
              aria-label="Więcej odnośników"
              className={`${ITEM_CLASS} inline-flex items-center ${
                open ? "bg-white/10 text-cream" : ""
              }`}
            >
              <Chevrons className={open ? "rotate-90" : ""} />
            </button>

            {open ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-50 mt-2 min-w-[180px] rounded-2xl border border-white/10 bg-pine-950/95 p-1.5 shadow-[0_16px_48px_rgba(10,31,21,0.55)] backdrop-blur-xl"
              >
                {overflow.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-cream/80 transition hover:bg-white/10 hover:text-cream"
                  >
                    {link.label}
                    {link.badge ? <Badge label={link.badge} /> : null}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </nav>
    </div>
  );
}

function Chevrons({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-150 ${className ?? ""}`}
      aria-hidden
    >
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
}
