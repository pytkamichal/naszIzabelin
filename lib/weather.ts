// Weather via Open-Meteo Weather API (free, no API key, CORS-enabled).

export type WeatherData = {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  time: string;
};

export type WeatherDescription = {
  emoji: string;
  label: string;
};

export async function fetchWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${latitude}&longitude=${longitude}` +
    `&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=celsius&timezone=Europe%2FWarsaw`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);

  const json = await res.json();
  const current = json?.current;
  if (!current || typeof current.temperature_2m !== "number") {
    throw new Error("Weather response missing data");
  }

  return {
    temperature: Math.round(current.temperature_2m),
    weatherCode: current.weather_code,
    windSpeed: Math.round(current.wind_speed_10m),
    time: current.time,
  };
}

// WMO Weather interpretation codes
export function weatherDescription(code: number): WeatherDescription {
  // Clear sky
  if (code === 0)
    return { emoji: "☀️", label: "Bezchmurnie" };
  // Mainly clear
  if (code === 1 || code === 2)
    return { emoji: "🌤️", label: "Przeważnie słonecznie" };
  // Partly cloudy
  if (code === 3)
    return { emoji: "⛅", label: "Pochmurnie" };
  // Overcast
  if (code === 45 || code === 48)
    return { emoji: "☁️", label: "Pochmurnie" };
  // Drizzle
  if (code === 51 || code === 53 || code === 55)
    return { emoji: "🌧️", label: "Mży" };
  // Freezing drizzle
  if (code === 56 || code === 57)
    return { emoji: "❄️", label: "Mży lodowa" };
  // Rain
  if (code === 61 || code === 63 || code === 65)
    return { emoji: "🌧️", label: "Deszcz" };
  // Freezing rain
  if (code === 66 || code === 67)
    return { emoji: "❄️", label: "Deszcz lodowy" };
  // Snow
  if (code === 71 || code === 73 || code === 75 || code === 77)
    return { emoji: "❄️", label: "Śnieg" };
  // Rain and snow
  if (code === 80 || code === 81 || code === 82)
    return { emoji: "🌧️", label: "Opad" };
  // Thunderstorm
  if (code === 85 || code === 86)
    return { emoji: "⛈️", label: "Burza" };
  // Thunderstorm with rain/snow
  if (code === 95 || code === 96 || code === 99)
    return { emoji: "⛈️", label: "Burza" };

  return { emoji: "🌤️", label: "Zmiennie" };
}
