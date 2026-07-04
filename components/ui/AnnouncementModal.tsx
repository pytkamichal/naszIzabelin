"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Bump the version suffix to re-announce something new in the future.
const STORAGE_KEY = "izabelin:announce:sasiedzka-pomoc:v1";

/**
 * One-time welcome popup announcing the new "Sąsiedzka pomoc" section.
 * Shows once per browser; dismissing it (button, Escape, backdrop or ✕)
 * persists a flag in localStorage so it never appears again. Renders nothing
 * on the server, so there's no hydration mismatch.
 */
export function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false); // drives the entrance transition
  const dialogRef = useRef<HTMLDivElement>(null);

  // Decide on mount whether to show it.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage blocked (private mode etc.) — just don't show.
      dismissed = true;
    }
    if (dismissed) return;

    const t = setTimeout(() => {
      setOpen(true);
      // Next frame: flip `shown` so the card fades/scales in.
      requestAnimationFrame(() => setShown(true));
    }, 550);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — worst case it shows again next visit
    }
    setShown(false);
    setOpen(false);
  }, []);

  // "Zobacz sekcję": unlock the page scroller first (it's the <html> element),
  // then scroll to the section — otherwise the still-active scroll lock would
  // swallow the jump.
  const goToSection = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      document.documentElement.style.overflow = "";
      document
        .getElementById("sasiedzka-pomoc")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      dismiss();
    },
    [dismiss],
  );

  // While open: focus the dialog, lock body scroll, handle Escape + Tab trap.
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    dialog?.focus();

    // <html> is the scrolling element here, so lock it (not <body>).
    const scroller = document.documentElement;
    const prevOverflow = scroller.style.overflow;
    scroller.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        dismiss();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      // Minimal focus trap: keep Tab focus inside the dialog.
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      scroller.style.overflow = prevOverflow;
    };
  }, [open, dismiss]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={dismiss}
        className={`absolute inset-0 bg-pine-950/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Card */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="announce-title"
        aria-describedby="announce-desc"
        tabIndex={-1}
        className={`relative w-full max-w-md overflow-hidden rounded-3xl border border-ink/10 bg-cream shadow-2xl shadow-pine-950/40 outline-none transition-all duration-300 motion-reduce:transition-none ${
          shown
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Close (✕) */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Zamknij"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="p-7 sm:p-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pine-100 to-gold-300/50 text-3xl ring-1 ring-pine-600/10">
            🤝
          </span>

          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.22em] text-gold-600">
            Nowość na stronie
          </p>
          <h2
            id="announce-title"
            className="mt-1.5 font-serif text-3xl font-semibold tracking-tight text-pine-900"
          >
            Sąsiedzka pomoc
          </h2>
          <p
            id="announce-desc"
            className="mt-3 leading-relaxed text-ink/70"
          >
            Dodaliśmy nową sekcję, w której możesz zaoferować pomoc sąsiadom albo
            poprosić o wsparcie — od podwiezienia, przez pożyczenie narzędzi, po
            opiekę nad zwierzętami. Każde zgłoszenie sprawdza administrator, zanim
            trafi na tablicę.
          </p>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center justify-center rounded-full border border-ink/15 px-6 py-3 font-bold text-ink/70 transition hover:border-ink/30 hover:text-ink"
            >
              OK, rozumiem
            </button>
            <a
              href="#sasiedzka-pomoc"
              onClick={goToSection}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-pine-900 px-6 py-3 font-extrabold text-cream transition hover:bg-pine-800"
            >
              Zobacz sekcję
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
