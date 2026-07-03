import { village } from "@/data/village";

// Facts pulled straight from the village data — the ticker is decoration,
// the words are the content we already publish elsewhere on the page.
const items = [
  `Wieś ${village.name}`,
  ...village.region.split(", "),
  `${village.population} mieszkańców (${village.populationYear})`,
  "wśród lasów i pól",
];

/**
 * Harvest-gold marquee strip between the hero and the page body. The track
 * holds two copies of the items and slides by exactly 50% for a seamless
 * loop; reduced-motion users get a static strip.
 */
export function Ticker() {
  return (
    // Outer wrapper clips the slight rotation so it never creates a
    // horizontal scrollbar; negative margins let the ribbon overlap the
    // hero above and the section below.
    <div aria-hidden className="relative z-10 -my-6 overflow-x-clip py-2">
      <div className="-mx-[2%] -rotate-1 overflow-hidden bg-gold-400 py-3 shadow-[0_10px_30px_rgba(10,31,21,0.35)]">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {items.map((item) => (
                <span
                  key={item}
                  className="flex items-center whitespace-nowrap px-6 text-sm font-extrabold uppercase tracking-[0.22em] text-pine-950"
                >
                  {item}
                  <span className="ml-12 text-gold-600">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
