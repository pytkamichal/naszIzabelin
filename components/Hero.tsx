import { village } from "@/data/village";
import { formatNumberPL } from "@/lib/format";
import { FieldForest } from "./illustrations/FieldForest";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#0c1f14]"
    >
      {/* Peaceful field + forest illustration */}
      <FieldForest className="absolute inset-0 h-full w-full" />

      {/* Optional real photo override: drop public/hero.jpg to replace the scene. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Scrims so white text stays readable over the bright scene */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent"
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
