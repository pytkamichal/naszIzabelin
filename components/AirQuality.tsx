"use client";

import { useEffect, useState } from "react";
import { air } from "@/data/site";
import { aqiBand, fetchAirQuality, type AirQualityData } from "@/lib/airQuality";

type LoadState = "loading" | "ok" | "error";

export function AirQuality({ className }: { className?: string }) {
  const [data, setData] = useState<AirQualityData | null>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let active = true;
    fetchAirQuality(air.latitude, air.longitude)
      .then((d) => {
        if (!active) return;
        setData(d);
        setState("ok");
      })
      .catch(() => {
        if (active) setState("error");
      });
    return () => {
      active = false;
    };
  }, []);

  const band = data ? aqiBand(data.europeanAqi) : null;
  const dotColor =
    state === "ok" && band ? band.color : "#94a3b8"; // slate-400 fallback
  const label =
    state === "loading" ? "…" : state === "error" ? "brak danych" : band!.label;

  const ariaLabel =
    state === "ok" && data && band
      ? `Jakość powietrza — ${air.locationName}: ${band.label}. Indeks EAQI ${data.europeanAqi}.`
      : `Jakość powietrza — ${air.locationName}`;

  return (
    <div className={`group relative ${className ?? ""}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-cream/70 transition hover:border-white/30 hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
      >
        <span aria-hidden>🍃</span>
        <span>
          Powietrze: <span className="font-semibold text-cream">{label}</span>
        </span>
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: dotColor }}
        />
      </button>

      {/* Hover / focus tooltip with more detail */}
      <div
        role="tooltip"
        className="invisible absolute right-0 top-full z-50 mt-2 w-64 translate-y-1 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <p className="mb-1 flex items-center gap-1.5 font-semibold text-slate-900">
          <span aria-hidden>🍃</span>
          Jakość powietrza — {air.locationName}
        </p>

        {state === "ok" && data && band ? (
          <>
            <p className="flex items-center gap-1.5">
              <span
                aria-hidden
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: band.color }}
              />
              <span className="font-medium text-slate-800">{band.label}</span>
              <span className="text-slate-400">· EAQI {data.europeanAqi}</span>
            </p>
            <p className="mt-1.5 leading-snug">{band.description}</p>
            <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5">
              <dt className="text-slate-400">PM2.5</dt>
              <dd className="text-right tabular-nums">
                {data.pm25.toFixed(1)} µg/m³
              </dd>
              <dt className="text-slate-400">PM10</dt>
              <dd className="text-right tabular-nums">
                {data.pm10.toFixed(1)} µg/m³
              </dd>
            </dl>
            <p className="mt-2 text-[11px] text-slate-400">
              Pomiar: {data.time.slice(11, 16)} · źródło: Open-Meteo
            </p>
          </>
        ) : state === "loading" ? (
          <p>Wczytywanie danych…</p>
        ) : (
          <p>Nie udało się pobrać danych o jakości powietrza.</p>
        )}
      </div>
    </div>
  );
}
