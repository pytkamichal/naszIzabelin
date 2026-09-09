import { village } from "@/data/village";
import { FieldForest } from "./illustrations/FieldForest";
import { Icon } from "./ui/Icon";

// Deterministic pseudo-random generator (mulberry32). Seeded so the particle
// layouts are identical on the server and the client — random-per-render would
// cause a hydration mismatch. Computed once at module load.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const LEAF_GLYPHS = ["🍂", "🍁"];
const PETAL_GLYPHS = ["🌸", "🌼", "🌷"];

// 22 drifting blossom petals (spring). Slightly smaller than the leaves; they
// reuse the same falling keyframe.
const PETALS = Array.from({ length: 22 }, (_, i) => {
  const r = seeded(307 + i * 7);
  return {
    left: `${(r() * 100).toFixed(1)}%`,
    size: `${(11 + r() * 10).toFixed(0)}px`,
    dur: `${(6 + r() * 9).toFixed(1)}s`,
    delay: `${(r() * 12).toFixed(1)}s`,
    glyph: PETAL_GLYPHS[i % 3],
  };
});

// Nine falling leaves (autumn) and 22 snowflakes (winter), each with a fixed
// column, size, speed and start delay so the drift looks organic but stable.
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const r = seeded(101 + i * 7);
  const depth = r();
  const drift = r() * 150 - 75;
  return {
    left: `${(r() * 100).toFixed(1)}%`,
    size: `${(12 + depth * 18).toFixed(0)}px`,
    dur: `${(18 + r() * 12).toFixed(1)}s`,
    delay: `${(-r() * 30).toFixed(1)}s`,
    drift: `${drift.toFixed(0)}px`,
    driftMid: `${(drift * -0.35).toFixed(0)}px`,
    blur: `${((1 - depth) * 1.2).toFixed(1)}px`,
    opacity: (0.52 + depth * 0.42).toFixed(2),
    glyph: LEAF_GLYPHS[i % LEAF_GLYPHS.length],
  };
});

const SNOW = Array.from({ length: 22 }, (_, i) => {
  const r = seeded(613 + i * 7);
  const size = 3 + r() * 6;
  return {
    left: `${(r() * 100).toFixed(1)}%`,
    size: `${size.toFixed(1)}px`,
    dur: `${(6 + r() * 9).toFixed(1)}s`,
    delay: `${(r() * 12).toFixed(1)}s`,
    sway: `${(r() * 60 - 30).toFixed(0)}px`,
  };
});

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
      className="village-hero relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-pine-950"
    >
      {/* Peaceful field + forest illustration (fallback under the photo) */}
      <FieldForest className="absolute inset-0 h-full w-full" />

      <div aria-hidden className="autumn-landscape pointer-events-none absolute inset-0" />

      {/* Hero photo (falls back to the illustration above if missing).
          Slow Ken Burns drift; the keyframes carry the scaleX(-1) mirror. */}
      <div
        aria-hidden
        className="hero-photo hero-kenburns absolute inset-0 bg-cover"
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
        className="hero-standard-scrim absolute inset-0 bg-gradient-to-t from-pine-950 via-pine-950/35 to-pine-950/10"
      />
      <div
        aria-hidden
        className="hero-standard-scrim absolute inset-0 bg-gradient-to-r from-pine-950/80 via-pine-950/25 to-transparent"
      />

      {/* A cinematic, low-sun wash reserved for the autumn composition. */}
      <div aria-hidden className="autumn-atmosphere pointer-events-none absolute inset-0" />

      {/* Fireflies drifting over the evening field (decorative, CSS-only).
          Shown in the default warm season; hidden once autumn/winter is on. */}
      <div
        aria-hidden
        className="hero-fireflies pointer-events-none absolute inset-0 overflow-hidden"
      >
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

      {/* Drifting petals — shown only in spring (CSS-gated by data-season). */}
      <div
        aria-hidden
        className="hero-petals pointer-events-none absolute inset-0 overflow-hidden"
      >
        {PETALS.map((petal, i) => (
          <span
            key={i}
            className="season-petal"
            style={
              {
                left: petal.left,
                fontSize: petal.size,
                "--dur": petal.dur,
                "--delay": petal.delay,
              } as React.CSSProperties
            }
          >
            {petal.glyph}
          </span>
        ))}
      </div>

      {/* Falling leaves — shown only in autumn (CSS-gated by data-season). */}
      <div
        aria-hidden
        className="hero-leaves pointer-events-none absolute inset-0 overflow-hidden"
      >
        {LEAVES.map((leaf, i) => (
          <span
            key={i}
            className="season-leaf"
            style={
              {
                left: leaf.left,
                fontSize: leaf.size,
                "--dur": leaf.dur,
                "--delay": leaf.delay,
                "--drift": leaf.drift,
                "--drift-mid": leaf.driftMid,
                "--leaf-blur": leaf.blur,
                "--leaf-opacity": leaf.opacity,
              } as React.CSSProperties
            }
          >
            {leaf.glyph}
          </span>
        ))}
      </div>

      {/* Falling snow — shown only in winter (CSS-gated by data-season). */}
      <div
        aria-hidden
        className="hero-snow pointer-events-none absolute inset-0 overflow-hidden"
      >
        {SNOW.map((flake, i) => (
          <span
            key={i}
            className="season-snow"
            style={
              {
                left: flake.left,
                width: flake.size,
                height: flake.size,
                "--dur": flake.dur,
                "--delay": flake.delay,
                "--sway": flake.sway,
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
        className="hero-desktop-crest pointer-events-none absolute right-8 top-32 hidden h-[180px] w-auto drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)] md:block lg:right-16 lg:h-[220px]"
      />

      <div className="hero-content relative site-container pb-24 pt-40 sm:pb-28">
        {/* Coat of arms for small screens — sits above the title, clear of the copy. */}
        <img
          src="/herb.png?v=2"
          alt="Herb wsi Izabelin"
          className="hero-mobile-crest mb-8 h-24 w-auto drop-shadow-[0_10px_24px_rgba(0,0,0,0.55)] md:hidden"
        />

        <div className="autumn-season-mark items-center gap-3">
          <Icon name="leaf" className="h-4 w-4" />
          <span>Złota jesień na Mazowszu</span>
        </div>

        <p className="hero-region flex items-center gap-4 text-[11px] font-extrabold uppercase tracking-[0.32em] text-gold-300 sm:text-xs">
          <span aria-hidden className="h-px w-12 bg-gold-400/80" />
          {village.region}
        </p>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-cream drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl">
          <span className="hero-standard-copy"><AccentedHeading text={village.heroHeading} /></span>
          <span className="autumn-heading">
            <span>Izabelin<span className="autumn-heading-dot">.</span></span>
            <em>Dobrze tu być.</em>
          </span>
        </h1>

        <p className="hero-lead mt-8 max-w-2xl text-base leading-relaxed text-cream/85 drop-shadow-sm sm:text-lg">
          <span className="hero-standard-copy">{village.heroLead}</span>
          <span className="autumn-only">Wśród mazowieckich lasów i pól jest nasze miejsce.
            Mała wieś, bliscy sąsiedzi i sprawy, które nas łączą.
            Witaj na stronie mieszkańców Izabelina.</span>
        </p>

        <div className="autumn-actions">
          <a href="#o-wsi" className="autumn-primary-link">Poznaj naszą wieś <Icon name="arrow-right" className="h-4 w-4" /></a>
          <a href="#kalendarz" className="autumn-secondary-link">Co słychać w okolicy <span aria-hidden>↗</span></a>
        </div>

        {/* Village motto */}
        <figure className="hero-motto mt-12 max-w-xl border-l-2 border-gold-400/70 pl-6">
          <blockquote className="font-serif text-xl font-medium italic leading-relaxed text-cream/90 drop-shadow sm:text-2xl">
            „{village.quote.text}”
          </blockquote>
          <figcaption className="mt-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-gold-300/90">
            — {village.quote.author}
          </figcaption>
        </figure>
      </div>

      <nav className="autumn-shortcuts" aria-label="Na co dzień w Izabelinie">
        <div className="autumn-shortcuts-title"><span>Dla mieszkańców</span><span>Na co dzień</span></div>
        <a href="#kalendarz"><Icon name="calendar" className="h-5 w-5" /><span><strong>Kalendarz</strong><small>Wydarzenia i terminy</small></span><Icon name="arrow-right" className="shortcut-arrow h-4 w-4" /></a>
        <a href="#odpady"><Icon name="leaf" className="h-5 w-5" /><span><strong>Odbiór odpadów</strong><small>Sprawdź harmonogram</small></span><Icon name="arrow-right" className="shortcut-arrow h-4 w-4" /></a>
        <a href="#kontakty"><Icon name="users" className="h-5 w-5" /><span><strong>Ważne kontakty</strong><small>Zawsze pod ręką</small></span><Icon name="arrow-right" className="shortcut-arrow h-4 w-4" /></a>
      </nav>

      {/* Scroll cue */}
      <a
        href="#o-wsi"
        aria-label="Przewiń do sekcji o wsi"
        className="hero-scroll-cue animate-cue-bounce absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-cream/70 transition hover:text-cream sm:block"
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
