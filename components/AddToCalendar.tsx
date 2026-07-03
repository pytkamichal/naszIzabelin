"use client";

import { Icon } from "./ui/Icon";

/**
 * Subscribe (webcal://, auto-updating) + download (.ics) buttons for a calendar
 * feed route such as "/odpady.ics". The webcal host is read from the browser at
 * click time, so the link is always the current origin — no build-time URL.
 */
export function AddToCalendar({
  path,
  className = "",
}: {
  path: string;
  className?: string;
}) {
  function subscribe() {
    window.location.href = `webcal://${window.location.host}${path}`;
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={subscribe}
        className="inline-flex items-center gap-2 rounded-full bg-pine-800 px-5 py-2.5 text-sm font-bold text-cream transition hover:bg-pine-700"
      >
        <Icon name="calendar" className="h-4 w-4" />
        Subskrybuj
      </button>
      <a
        href={path}
        download
        className="inline-flex items-center gap-2 rounded-full border border-pine-800/30 px-5 py-2.5 text-sm font-bold text-pine-800 transition hover:bg-pine-50"
      >
        Pobierz plik .ics
      </a>
    </div>
  );
}
