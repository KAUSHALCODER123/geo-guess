"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCapitalWeather } from "@/lib/api/weather";
import type { WeatherData, AppError } from "@/types";

export interface UseCapitalWeatherResult {
  weather: WeatherData | null;
  isLoading: boolean;
  isError: boolean;
  error: AppError | Error | null;
  refetch: () => void;
}

export const WEATHER_QUERY_KEY = (lat?: number, lng?: number) =>
  ["capital-weather", lat, lng] as const;

/**
 * Public hook to fetch real-time weather conditions for capital city coordinates.
 */
export function useCapitalWeather(lat?: number, lng?: number): UseCapitalWeatherResult {
  const isValidCoords =
    typeof lat === "number" &&
    typeof lng === "number" &&
    !isNaN(lat) &&
    !isNaN(lng);

  const query = useQuery<WeatherData, AppError | Error>({
    queryKey: WEATHER_QUERY_KEY(lat, lng),
    queryFn: ({ signal }) => {
      if (!isValidCoords) {
        throw new Error("Latitude and longitude coordinates are required");
      }
      return fetchCapitalWeather(lat, lng, signal);
    },
    enabled: isValidCoords,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  return {
    weather: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: () => {
      query.refetch();
    },
  };
}
