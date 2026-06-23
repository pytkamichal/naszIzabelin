// Air quality via the Open-Meteo Air Quality API (free, no API key, CORS-enabled).
// Uses the European Air Quality Index (EAQI): lower is better.

export type AirQualityData = {
  europeanAqi: number;
  pm25: number;
  pm10: number;
  time: string; // ISO local time of the reading
};

export async function fetchAirQuality(
  latitude: number,
  longitude: number,
): Promise<AirQualityData> {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current=european_aqi,pm2_5,pm10&timezone=Europe%2FWarsaw`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Air quality request failed: ${res.status}`);

  const json = await res.json();
  const current = json?.current;
  if (!current || typeof current.european_aqi !== "number") {
    throw new Error("Air quality response missing data");
  }

  return {
    europeanAqi: current.european_aqi,
    pm25: current.pm2_5,
    pm10: current.pm10,
    time: current.time,
  };
}

export type AqiBand = {
  label: string; // Polish, user-facing
  color: string; // dot/indicator color
  description: string; // Polish, user-facing
};

// EAQI bands per the European Environment Agency.
export function aqiBand(aqi: number): AqiBand {
  if (aqi <= 20)
    return {
      label: "Dobra",
      color: "#22c55e",
      description: "Jakość powietrza jest dobra.",
    };
  if (aqi <= 40)
    return {
      label: "Umiarkowana",
      color: "#a3e635",
      description: "Jakość powietrza jest umiarkowana.",
    };
  if (aqi <= 60)
    return {
      label: "Dostateczna",
      color: "#facc15",
      description:
        "Jakość powietrza jest dostateczna — osoby wrażliwe mogą odczuwać dyskomfort.",
    };
  if (aqi <= 80)
    return {
      label: "Zła",
      color: "#f97316",
      description:
        "Jakość powietrza jest zła — ogranicz długotrwały wysiłek na zewnątrz.",
    };
  if (aqi <= 100)
    return {
      label: "Bardzo zła",
      color: "#ef4444",
      description:
        "Jakość powietrza jest bardzo zła — unikaj aktywności na zewnątrz.",
    };
  return {
    label: "Niebezpieczna",
    color: "#7f1d1d",
    description:
      "Jakość powietrza jest niebezpieczna — pozostań w pomieszczeniach.",
  };
}
