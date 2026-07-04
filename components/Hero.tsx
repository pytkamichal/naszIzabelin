import { village } from "@/data/village";
import { FieldForest } from "./illustrations/FieldForest";

/** Renders the hero heading with the village name set in italic gold —
 *  the copy itself is unchanged, only the emphasis is typographic. */
function AccentedHeading({ text }: { text: string }) {
  const idx = text.indexOf(village.name);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <em className="font-serif italic text-gold-300">{village.name}</em>
      {text.slice(idx + village.name.length)}
    </>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-pine-950"
    >
      {/* Peaceful field + forest illustration (fallback under the photo) */}
      <FieldForest className="absolute inset-0 h-full w-full" />

      {/* Hero photo (falls back to the illustration above if missing).
          Slow Ken Burns drift; the keyframes carry the scaleX(-1) mirror. */}
      <div
        aria-hidden
        className="hero-kenburns absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/hero.jpg')",
          // Anchor to the bottom so the animals stand fully in frame (no clipped legs).
          backgroundPosition: "center bottom",
          // Mirror so the moose sits on the open right side, clear of the text.
          transform: "scaleX(-1)",
        }}
      />

      {/* Pine-tinted scrims so cream text stays readable over the photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/35 to-pine-950/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-pine-950/80 via-pine-950/25 to-transparent"
      />

      {/* Fireflies drifting over the evening field (decorative, CSS-only). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[
          { left: "12%", bottom: "18%", duration: "11s", delay: "0s" },
          { left: "28%", bottom: "10%", duration: "14s", delay: "2.5s" },
          { left: "45%", bottom: "22%", duration: "12s", delay: "5s" },
          { left: "62%", bottom: "12%", duration: "15s", delay: "1s" },
          { left: "74%", bottom: "26%", duration: "10s", delay: "6.5s" },
          { left: "86%", bottom: "16%", duration: "13s", delay: "3.5s" },
          { left: "93%", bottom: "30%", duration: "16s", delay: "8s" },
        ].map((fly) => (
          <span
            key={fly.left}
            className="firefly"
            style={
              {
                left: fly.left,
                bottom: fly.bottom,
                "--ff-duration": fly.duration,
                "--ff-delay": fly.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Village coat of arms — floats on the open right side, above the moose.
          Hidden on small screens, where it appears inline above the title. */}
      <img
        src="/herb.png?v=2"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-8 top-32 hidden h-[180px] w-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] md:block lg:right-16 lg:h-[220px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-40 sm:px-5 sm:pb-28">
        {/* Coat of arms for small screens — sits above the title, clear of the copy. */}
        <img
          src="/herb.png?v=2"
          alt="Herb wsi Izabelin"
          className="mb-8 h-24 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] md:hidden"
        />

        <p className="flex items-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.32em] text-gold-300 sm:text-xs">
          <span aria-hidden className="h-px w-12 bg-gold-400/80" />
          {village.region}
        </p>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">
          <AccentedHeading text={village.heroHeading} />
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-cream/85 drop-shadow-sm sm:text-lg">
          {village.heroLead}
        </p>

        {/* Village motto */}
        <figure className="mt-12 max-w-xl border-l-2 border-gold-400/70 pl-6">
          <blockquote className="font-serif text-xl font-medium italic leading-relaxed text-cream/90 drop-shadow sm:text-2xl">
            „{village.quote.text}"
          </blockquote>
          <figcaption className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-300/90">
            — {village.quote.author}
          </figcaption>
        </figure>
      </div>

      {/* Scroll cue */}
      <a
        href="#o-wsi"
        aria-label="Przewiń do sekcji o wsi"
        className="animate-cue-bounce absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/70 transition hover:text-cream sm:block"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
