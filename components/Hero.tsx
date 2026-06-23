import { village } from "@/data/village";
import { FieldForest } from "./illustrations/FieldForest";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[620px] overflow-hidden bg-[#0c1f14] sm:min-h-[720px]"
    >
      {/* Peaceful field + forest illustration */}
      <FieldForest className="absolute inset-0 h-full w-full" />

      {/* Hero photo (falls back to the illustration above if missing). */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/hero.jpg')",
          // Anchor to the bottom so the animals stand fully in frame (no clipped legs).
          backgroundPosition: "center bottom",
          // Mirror so the moose sits on the open right side, clear of the text.
          transform: "scaleX(-1)",
        }}
      />

      {/* Scrims so white text stays readable over the bright photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
      />

      {/* Village coat of arms — a soft watermark on the open right side.
          Hidden on small screens so the photo and copy stay uncluttered. */}
      <img
        src="/herb.png?v=2"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 hidden h-[185px] w-auto opacity-100 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] md:block lg:right-14 lg:h-[220px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100 drop-shadow">
          <span aria-hidden className="h-px w-8 bg-brand-200/70" />
          {village.region}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white drop-shadow-md sm:text-6xl">
          {village.heroHeading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 drop-shadow-sm">
          {village.heroLead}
        </p>

        {/* Village motto */}
        <figure className="mt-10 max-w-xl border-l-2 border-brand-200/50 pl-5">
          <blockquote className="font-serif text-xl font-medium italic leading-relaxed text-white/90 drop-shadow sm:text-2xl">
            „{village.quote.text}"
          </blockquote>
          <figcaption className="mt-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-100/85">
            — {village.quote.author}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
