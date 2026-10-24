import {
  AppError,
  OpenMeteoResponseSchema,
  type WeatherData,
  type WeatherIconKey,
} from "@/types";

const OPEN_METEO_BASE = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_TIMEOUT_MS = 6000;
const MAX_RETRIES = 2;

// In-memory weather cache: key is "lat,lng" rounded to 2 decimals
const weatherCache = new Map<string, { data: WeatherData; timestamp: number }>();
const WEATHER_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function clearWeatherCache(): void {
  weatherCache.clear();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Maps WMO weather code to condition string and visual icon category.
 */
export function interpretWeatherCode(
  code: number,
  isDay: boolean
): { condition: string; iconKey: WeatherIconKey } {
  switch (code) {
    case 0:
      return {
        condition: "Clear sky",
        iconKey: isDay ? "clear-day" : "clear-night",
      };
    case 1:
      return { condition: "Mainly clear", iconKey: isDay ? "clear-day" : "cloudy" };
    case 2:
      return { condition: "Partly cloudy", iconKey: "cloudy" };
    case 3:
      return { condition: "Overcast", iconKey: "cloudy" };
    case 45:
    case 48:
      return { condition: "Foggy", iconKey: "fog" };
    case 51:
    case 53:
    case 55:
      return { condition: "Drizzle", iconKey: "rain" };
    case 56:
    case 57:
      return { condition: "Freezing drizzle", iconKey: "rain" };
    case 61:
      return { condition: "Slight rain", iconKey: "rain" };
    case 63:
      return { condition: "Moderate rain", iconKey: "rain" };
    case 65:
      return { condition: "Heavy rain", iconKey: "rain" };
    case 66:
    case 67:
      return { condition: "Freezing rain", iconKey: "rain" };
    case 71:
    case 73:
    case 75:
    case 77:
      return { condition: "Snowfall", iconKey: "snow" };
    case 80:
    case 81:
    case 82:
      return { condition: "Rain showers", iconKey: "rain" };
    case 85:
    case 86:
      return { condition: "Snow showers", iconKey: "snow" };
    case 95:
      return { condition: "Thunderstorm", iconKey: "thunderstorm" };
    case 96:
    case 99:
      return { condition: "Thunderstorm with hail", iconKey: "thunderstorm" };
    default:
      return { condition: "Partly cloudy", iconKey: "cloudy" };
  }
}

/**
 * Fetches capital weather using the free Open-Meteo REST API.
 */
export async function fetchCapitalWeather(
  lat: number,
  lng: number,
  signal?: AbortSignal
): Promise<WeatherData> {
  if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) {
    throw new AppError({
      code: "PARSE_ERROR",
      message: "Valid latitude and longitude numbers are required",
      retryable: false,
    });
  }

  const cacheKey = `${lat.toFixed(2)},${lng.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < WEATHER_CACHE_TTL_MS) {
    return cached.data;
  }

  const url = `${OPEN_METEO_BASE}?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day`;

  let attempt = 0;
  while (attempt <= MAX_RETRIES) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

    const onExternalAbort = () => controller.abort();
    if (signal) {
      if (signal.aborted) {
        clearTimeout(timeoutId);
        throw new AppError({
          code: "TIMEOUT_ERROR",
          message: "Weather request aborted by caller",
          isNetwork: true,
          retryable: false,
        });
      }
      signal.addEventListener("abort", onExternalAbort);
    }

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onExternalAbort);
      }

      if (!response.ok) {
        if (response.status === 429) {
          throw new AppError({
            code: "RATE_LIMITED",
            message: "Open-Meteo rate limit exceeded",
            status: 429,
            retryable: true,
          });
        }
        if (response.status >= 500) {
          throw new AppError({
            code: "SERVER_ERROR",
            message: `Open-Meteo server error: ${response.status}`,
            status: response.status,
            retryable: true,
          });
        }

        throw new AppError({
          code: "UNKNOWN_ERROR",
          message: `Unexpected Open-Meteo response: ${response.status}`,
          status: response.status,
          retryable: false,
        });
      }

      const json = await response.json();
      const parsed = OpenMeteoResponseSchema.safeParse(json);

      if (!parsed.success) {
        throw new AppError({
          code: "PARSE_ERROR",
          message: "Failed to parse Open-Meteo weather response",
          retryable: false,
        });
      }

      const isDay = parsed.data.current.is_day === 1;
      const weatherCode = parsed.data.current.weather_code;
      const { condition, iconKey } = interpretWeatherCode(weatherCode, isDay);

      const weatherData: WeatherData = {
        temperature: Math.round(parsed.data.current.temperature_2m * 10) / 10,
        apparentTemp: Math.round(parsed.data.current.apparent_temperature * 10) / 10,
        humidity: Math.round(parsed.data.current.relative_humidity_2m),
        windSpeed: Math.round(parsed.data.current.wind_speed_10m * 10) / 10,
        precipitation: parsed.data.current.precipitation,
        weatherCode,
        condition,
        iconKey,
        isDay,
      };

      weatherCache.set(cacheKey, { data: weatherData, timestamp: Date.now() });
      return weatherData;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onExternalAbort);
      }

      const isAbort = error instanceof Error && error.name === "AbortError";

      if (error instanceof AppError && !error.retryable) {
        throw error;
      }

      attempt++;
      if (attempt > MAX_RETRIES) {
        if (isAbort) {
          throw new AppError({
            code: "TIMEOUT_ERROR",
            message: `Open-Meteo request timed out after ${DEFAULT_TIMEOUT_MS}ms`,
            isNetwork: true,
            retryable: true,
            cause: error,
          });
        }
        if (error instanceof AppError) {
          throw error;
        }
        throw new AppError({
          code: "NETWORK_ERROR",
          message: error instanceof Error ? error.message : "Open-Meteo network request failed",
          isNetwork: true,
          retryable: true,
          cause: error,
        });
      }

      await sleep(Math.pow(2, attempt) * 125);
    }
  }

  throw new AppError({
    code: "NETWORK_ERROR",
    message: "Exceeded max retries for weather data",
    isNetwork: true,
    retryable: true,
  });
}
