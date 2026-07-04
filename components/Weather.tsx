"use client";

import { useEffect, useState } from "react";
import { air } from "@/data/site";
import { fetchWeather, weatherDescription, type WeatherData } from "@/lib/weather";

type LoadState = "loading" | "ok" | "error";

export function Weather({ className }: { className?: string }) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let active = true;
    fetchWeather(air.latitude, air.longitude)
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

  const description = data ? weatherDescription(data.weatherCode) : null;
  const displayText =
    state === "loading"
      ? "…"
      : state === "error"
        ? "brak danych"
        : `${data?.temperature}°C`;
  const emoji =
    state === "ok" && description
      ? description.emoji
      : "🌤️";

  const ariaLabel =
    state === "ok" && data && description
      ? `Pogoda w ${air.locationName}: ${description.label}, ${data.temperature}°C, wiatr ${data.windSpeed} km/h`
      : `Pogoda w ${air.locationName}`;

  return (
    <div className={`group relative ${className ?? ""}`}>
      <button
        type="button"
        aria-label={ariaLabel}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-medium text-cream/70 transition hover:border-white/30 hover:text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
      >
        <span aria-hidden>{emoji}</span>
        <span>
          Pogoda: <span className="font-semibold text-cream">{displayText}</span>
        </span>
      </button>

      {/* Hover / focus tooltip with more detail */}
      <div
        role="tooltip"
        className="invisible absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600 opacity-0 shadow-lg transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        <p className="mb-2 flex items-center gap-1.5 font-semibold text-slate-900">
          <span aria-hidden>{emoji}</span>
          Pogoda — {air.locationName}
        </p>

        {state === "ok" && data && description ? (
          <>
            <div className="space-y-1">
              <p className="flex justify-between">
                <span>Temperatura:</span>
                <span className="font-medium text-slate-800">{data.temperature}°C</span>
              </p>
              <p className="flex justify-between">
                <span>Warunki:</span>
                <span className="font-medium text-slate-800">{description.label}</span>
              </p>
              <p className="flex justify-between">
                <span>Wiatr:</span>
                <span className="font-medium text-slate-800">{data.windSpeed} km/h</span>
              </p>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              źródło: Open-Meteo
            </p>
          </>
        ) : state === "loading" ? (
          <p>Wczytywanie danych…</p>
        ) : (
          <p>Nie udało się pobrać danych pogodowych.</p>
        )}
      </div>
    </div>
  );
}
