"use client";

import { useQuery } from "@tanstack/react-query";
import { getCountryByCode, getBorders } from "@/lib/api/restcountries";
import type { Country, BorderCountry, AppError } from "@/types";

export interface CountryWithBorders {
  country: Country;
  borders: BorderCountry[];
}

export interface UseCountryResult {
  country: Country | null;
  borders: BorderCountry[];
  isLoading: boolean;
  isError: boolean;
  error: AppError | Error | null;
  refetch: () => void;
}

export const COUNTRY_QUERY_KEY = (code?: string) => ["country", code?.toUpperCase()] as const;

/**
 * Public hook to fetch a specific country by alpha-2 or alpha-3 code,
 * resolving all bordering countries.
 */
export function useCountry(code?: string): UseCountryResult {
  const upperCode = code?.trim().toUpperCase();

  const query = useQuery<CountryWithBorders, AppError | Error>({
    queryKey: COUNTRY_QUERY_KEY(upperCode),
    queryFn: async ({ signal }) => {
      if (!upperCode) {
        throw new Error("Country code is required");
      }
      const country = await getCountryByCode(upperCode, signal);
      const borders = await getBorders(country.borders, signal);
      return { country, borders };
    },
    enabled: Boolean(upperCode && upperCode.length >= 2),
    staleTime: 24 * 60 * 60 * 1000,
  });

  return {
    country: query.data?.country ?? null,
    borders: query.data?.borders ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: () => {
      query.refetch();
    },
  };
}
