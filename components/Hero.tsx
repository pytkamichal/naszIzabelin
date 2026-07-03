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

      {/* Scrims so white text stays readable over the bright photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/5"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent"
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

      {/* Village coat of arms — a soft watermark on the open right side.
          Hidden on small screens, where it appears inline above the title instead. */}
      <img
        src="/herb.png?v=2"
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-6 top-28 hidden h-[185px] w-auto opacity-100 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] md:block lg:right-14 lg:h-[220px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-36">
        {/* Coat of arms for small screens — sits above the title, clear of the copy. */}
        <img
          src="/herb.png?v=2"
          alt="Herb wsi Izabelin"
          className="mb-6 h-28 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] md:hidden"
        />
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

      {/* Organic hills edge — the hero melts into the page background. */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-12 w-full sm:h-16"
        viewBox="0 0 2880 120"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,84 Q360,44 720,70 T1440,58 T2160,72 T2880,54 L2880,120 L0,120 Z"
          fill="var(--color-canvas)"
          opacity="0.4"
        />
        <path
          d="M0,100 Q360,66 720,88 T1440,78 T2160,92 T2880,74 L2880,120 L0,120 Z"
          fill="var(--color-canvas)"
        />
      </svg>

      {/* Scroll cue */}
      <a
        href="#o-wsi"
        aria-label="Przewiń do sekcji o wsi"
        className="animate-cue-bounce absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-brand-800/70 transition hover:text-brand-800 sm:block"
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
