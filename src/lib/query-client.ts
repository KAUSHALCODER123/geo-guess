import { QueryClient } from "@tanstack/react-query";

/**
 * Creates a configured TanStack Query client with production defaults:
 * - 24 hour stale time for countries/geographical data
 * - 2 retries on network failures
 * - No refetch on window focus
 * - Auto refetch on reconnect
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 24 * 60 * 60 * 1000, // 24 hours
        gcTime: 48 * 60 * 60 * 1000, // 48 hours
        retry: (failureCount, error) => {
          // Do not retry 404s
          if (
            error &&
            typeof error === "object" &&
            "isNotFound" in error &&
            (error as { isNotFound: boolean }).isNotFound
          ) {
            return false;
          }
          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}

export const queryClient = createQueryClient();
