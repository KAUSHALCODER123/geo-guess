import { AppError, WikiSummarySchema, type WikiSummary } from "@/types";

const WIKI_API_BASE = "https://en.wikipedia.org/api/rest_v1/page/summary";
const DEFAULT_TIMEOUT_MS = 6000;
const MAX_RETRIES = 2;

// In-memory cache for Wikipedia summaries
const wikiCache = new Map<string, WikiSummary>();

export function clearWikiCache(): void {
  wikiCache.clear();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetches Wikipedia summary for a given country or topic.
 * Handles timeouts, retries with exponential backoff, and validates with Zod.
 */
export async function fetchWikiSummary(
  title: string,
  signal?: AbortSignal
): Promise<WikiSummary> {
  const cleanTitle = title.trim();
  if (!cleanTitle) {
    throw new AppError({
      code: "NOT_FOUND",
      message: "Wikipedia title cannot be empty",
      isNotFound: true,
      retryable: false,
    });
  }

  const cacheKey = cleanTitle.toLowerCase();
  const cached = wikiCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const encodedTitle = encodeURIComponent(cleanTitle.replace(/\s+/g, "_"));
  const url = `${WIKI_API_BASE}/${encodedTitle}`;

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
          message: "Wikipedia request aborted by caller",
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
          "User-Agent": "FlagForge/1.0 (https://flagforge.app; contact@flagforge.app)",
        },
      });

      clearTimeout(timeoutId);
      if (signal) {
        signal.removeEventListener("abort", onExternalAbort);
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new AppError({
            code: "NOT_FOUND",
            message: `Wikipedia summary not found for "${cleanTitle}"`,
            status: 404,
            isNotFound: true,
            retryable: false,
          });
        }
        if (response.status === 429) {
          throw new AppError({
            code: "RATE_LIMITED",
            message: "Wikipedia API rate limit reached",
            status: 429,
            retryable: true,
          });
        }
        if (response.status >= 500) {
          throw new AppError({
            code: "SERVER_ERROR",
            message: `Wikipedia server error: ${response.status}`,
            status: response.status,
            retryable: true,
          });
        }

        throw new AppError({
          code: "UNKNOWN_ERROR",
          message: `Unexpected Wikipedia response: ${response.status}`,
          status: response.status,
          retryable: false,
        });
      }

      const json = await response.json();
      const parsed = WikiSummarySchema.safeParse(json);

      if (!parsed.success) {
        throw new AppError({
          code: "PARSE_ERROR",
          message: "Failed to parse Wikipedia summary schema",
          retryable: false,
        });
      }

      const summary: WikiSummary = {
        title: parsed.data.title,
        extract: parsed.data.extract,
        description: parsed.data.description,
        thumbnail: parsed.data.thumbnail,
        content_urls: parsed.data.content_urls,
      };

      wikiCache.set(cacheKey, summary);
      return summary;
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
            message: `Wikipedia request timed out after ${DEFAULT_TIMEOUT_MS}ms`,
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
          message: error instanceof Error ? error.message : "Wikipedia network request failed",
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
    message: "Exceeded max retries for Wikipedia summary",
    isNetwork: true,
    retryable: true,
  });
}
