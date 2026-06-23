import { village } from "@/data/village";
import { formatNumberPL } from "@/lib/format";
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

      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-100 drop-shadow">
          {village.region}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl">
          {village.heroHeading}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 drop-shadow-sm">
          {village.heroLead}
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-black/35 px-5 py-2.5 text-base font-medium text-white ring-1 ring-white/25 backdrop-blur">
          <span aria-hidden>👤</span>
          <span>
            Liczba mieszkańców:{" "}
            <strong className="font-bold">
              {formatNumberPL(village.population)}
            </strong>{" "}
            <span className="text-white/75">
              (Stan na {village.populationYear} r.)
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
