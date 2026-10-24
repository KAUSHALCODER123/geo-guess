"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchWikiSummary } from "@/lib/api/wikipedia";
import type { WikiSummary, AppError } from "@/types";

export interface UseWikiSummaryResult {
  summary: WikiSummary | null;
  isLoading: boolean;
  isError: boolean;
  error: AppError | Error | null;
  refetch: () => void;
}

export const WIKI_SUMMARY_QUERY_KEY = (title?: string) =>
  ["wiki-summary", title?.toLowerCase().trim()] as const;

/**
 * Public hook to fetch Wikipedia summary information for a given country or topic.
 */
export function useWikiSummary(countryName?: string): UseWikiSummaryResult {
  const cleanTitle = countryName?.trim();

  const query = useQuery<WikiSummary, AppError | Error>({
    queryKey: WIKI_SUMMARY_QUERY_KEY(cleanTitle),
    queryFn: ({ signal }) => {
      if (!cleanTitle) {
        throw new Error("Country name is required");
      }
      return fetchWikiSummary(cleanTitle, signal);
    },
    enabled: Boolean(cleanTitle && cleanTitle.length > 0),
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days Wikipedia cache
  });

  return {
    summary: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: () => {
      query.refetch();
    },
  };
}
