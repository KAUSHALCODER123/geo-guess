"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllCountries } from "@/lib/api/restcountries";
import type { Country, AppError } from "@/types";

export interface UseCountriesResult {
  countries: Country[];
  isLoading: boolean;
  isError: boolean;
  error: AppError | Error | null;
  isOffline: boolean;
  refetch: () => void;
}

export const COUNTRIES_QUERY_KEY = ["countries"] as const;

/**
 * Public hook to fetch and cache the complete world countries dataset.
 * Supports automatic offline fallback and online/offline status monitoring.
 */
export function useCountries(): UseCountriesResult {
  const [isOffline, setIsOffline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" && !navigator.onLine;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const query = useQuery<Country[], AppError | Error>({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: ({ signal }) => getAllCountries(signal),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    countries: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isOffline,
    refetch: () => {
      query.refetch();
    },
  };
}
