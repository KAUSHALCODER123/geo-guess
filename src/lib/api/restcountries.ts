import {
  RestCountryBatch1Schema,
  RestCountryBatch2Schema,
  AppError,
  type Country,
  type BorderCountry,
  type RestCountryBatch1,
  type RestCountryBatch2,
} from "@/types";
import { FALLBACK_COUNTRIES } from "./fallback-countries";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";
const DEFAULT_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

// In compliance with REST Countries guidelines: MAX 10 fields per request
export const BATCH_1_FIELDS = [
  "cca3",
  "name",
  "capital",
  "region",
  "subregion",
  "flags",
  "population",
  "area",
  "cca2",
] as const;

export const BATCH_2_FIELDS = [
  "cca3",
  "languages",
  "currencies",
  "borders",
  "latlng",
  "timezones",
  "continents",
  "landlocked",
  "unMember",
  "car",
] as const;

// In-memory country cache
const countryCache = new Map<string, Country>();
let allCountriesCache: Country[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Resets in-memory caches (primarily for unit tests).
 */
export function clearCountryCache(): void {
  countryCache.clear();
  allCountriesCache = null;
  lastCacheTime = 0;
}

/**
 * Helper to sleep during retry backoff.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Robust fetch wrapper with timeout, exponential backoff, and typed AppError responses.
 */
async function fetchWithRetryAndTimeout<T>(
  url: string,
  options: {
    signal?: AbortSignal;
    timeoutMs?: number;
    retries?: number;
  } = {}
): Promise<T> {
  const { signal: externalSignal, timeoutMs = DEFAULT_TIMEOUT_MS, retries = MAX_RETRIES } = options;

  let attempt = 0;
  while (attempt <= retries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    // Chain external abort signal if provided
    const onExternalAbort = () => controller.abort();
    if (externalSignal) {
      if (externalSignal.aborted) {
        clearTimeout(timeoutId);
        throw new AppError({
          code: "TIMEOUT_ERROR",
          message: "Request aborted by caller",
          isNetwork: true,
          retryable: false,
        });
      }
      externalSignal.addEventListener("abort", onExternalAbort);
    }

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener("abort", onExternalAbort);
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new AppError({
            code: "NOT_FOUND",
            message: `Resource not found at ${url}`,
            status: 404,
            isNotFound: true,
            retryable: false,
          });
        }
        if (response.status === 429) {
          throw new AppError({
            code: "RATE_LIMITED",
            message: "Too many requests to REST Countries API",
            status: 429,
            retryable: true,
          });
        }
        if (response.status >= 500) {
          throw new AppError({
            code: "SERVER_ERROR",
            message: `REST Countries server error: ${response.status} ${response.statusText}`,
            status: response.status,
            retryable: true,
          });
        }

        throw new AppError({
          code: "UNKNOWN_ERROR",
          message: `Unexpected HTTP status: ${response.status}`,
          status: response.status,
          retryable: false,
        });
      }

      const rawData = await response.json();
      return rawData as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener("abort", onExternalAbort);
      }

      const isAbort = error instanceof Error && error.name === "AbortError";

      // Do not retry 404s or non-retryable errors
      if (error instanceof AppError && !error.retryable) {
        throw error;
      }

      attempt++;
      if (attempt > retries) {
        if (isAbort) {
          throw new AppError({
            code: "TIMEOUT_ERROR",
            message: `Request timed out after ${timeoutMs}ms: ${url}`,
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
          message: error instanceof Error ? error.message : "Network request failed",
          isNetwork: true,
          retryable: true,
          cause: error,
        });
      }

      // Exponential backoff: 250ms, 500ms...
      const backoffDelay = Math.pow(2, attempt) * 125;
      await sleep(backoffDelay);
    }
  }

  throw new AppError({
    code: "NETWORK_ERROR",
    message: "Exceeded max retries",
    isNetwork: true,
    retryable: true,
  });
}

/**
 * Merges raw Batch 1 and Batch 2 API responses and normalizes into a Country domain object.
 */
export function normalizeCountry(
  batch1: RestCountryBatch1,
  batch2?: Partial<RestCountryBatch2>
): Country {
  return {
    cca3: batch1.cca3.toUpperCase(),
    cca2: (batch1.cca2 || batch1.cca3.slice(0, 2)).toUpperCase(),
    name: {
      common: batch1.name.common,
      official: batch1.name.official,
      nativeName: batch1.name.nativeName,
    },
    capital: Array.isArray(batch1.capital) ? batch1.capital : [],
    region: batch1.region || "Unknown",
    subregion: batch1.subregion || "",
    languages: batch2?.languages ?? {},
    currencies: batch2?.currencies ?? {},
    borders: Array.isArray(batch2?.borders) ? batch2.borders.map((b) => b.toUpperCase()) : [],
    population: typeof batch1.population === "number" ? batch1.population : 0,
    area: typeof batch1.area === "number" ? batch1.area : 0,
    flags: {
      png: batch1.flags.png || "",
      svg: batch1.flags.svg || "",
      alt: batch1.flags.alt,
    },
    latlng:
      batch2?.latlng && batch2.latlng.length >= 2
        ? [batch2.latlng[0], batch2.latlng[1]]
        : [0, 0],
    capitalInfo:
      batch2?.capitalInfo?.latlng && batch2.capitalInfo.latlng.length >= 2
        ? { latlng: [batch2.capitalInfo.latlng[0], batch2.capitalInfo.latlng[1]] }
        : undefined,
    timezones: Array.isArray(batch2?.timezones) ? batch2.timezones : [],
    continents: Array.isArray(batch2?.continents)
      ? batch2.continents
      : batch1.region
        ? [batch1.region]
        : [],
    landlocked: Boolean(batch2?.landlocked),
    unMember: Boolean(batch2?.unMember),
    callingCodes: batch2?.idd?.root
      ? batch2.idd.suffixes && batch2.idd.suffixes.length > 0
        ? batch2.idd.suffixes.map((s) => `${batch2?.idd?.root}${s}`)
        : [batch2.idd.root]
      : [],
    carSide: batch2?.car?.side,
  };
}

/**
 * Fetches all countries in two parallel requests of <= 10 fields each,
 * merges on cca3, validates with Zod, and falls back to embedded data if offline/error.
 */
export async function getAllCountries(signal?: AbortSignal): Promise<Country[]> {
  const now = Date.now();
  if (allCountriesCache && now - lastCacheTime < CACHE_TTL_MS) {
    return allCountriesCache;
  }

  const urlBatch1 = `${REST_COUNTRIES_BASE_URL}/all?fields=${BATCH_1_FIELDS.join(",")}`;
  const urlBatch2 = `${REST_COUNTRIES_BASE_URL}/all?fields=${BATCH_2_FIELDS.join(",")}`;

  try {
    const [rawBatch1, rawBatch2] = await Promise.all([
      fetchWithRetryAndTimeout<unknown[]>(urlBatch1, { signal }),
      fetchWithRetryAndTimeout<unknown[]>(urlBatch2, { signal }),
    ]);

    if (!Array.isArray(rawBatch1) || !Array.isArray(rawBatch2)) {
      throw new AppError({
        code: "PARSE_ERROR",
        message: "Invalid response format: expected array of countries",
        retryable: false,
      });
    }

    // Index batch 2 by cca3 for fast merging
    const batch2Map = new Map<string, RestCountryBatch2>();
    for (const item of rawBatch2) {
      const parsed = RestCountryBatch2Schema.safeParse(item);
      if (parsed.success) {
        batch2Map.set(parsed.data.cca3.toUpperCase(), parsed.data);
      }
    }

    const mergedList: Country[] = [];
    for (const item of rawBatch1) {
      const parsed = RestCountryBatch1Schema.safeParse(item);
      if (parsed.success) {
        const code = parsed.data.cca3.toUpperCase();
        const batch2Data = batch2Map.get(code);
        const normalized = normalizeCountry(parsed.data, batch2Data);
        mergedList.push(normalized);
        countryCache.set(code, normalized);
      }
    }

    if (mergedList.length === 0) {
      throw new AppError({
        code: "PARSE_ERROR",
        message: "No valid countries parsed from REST Countries response",
        retryable: false,
      });
    }

    allCountriesCache = mergedList;
    lastCacheTime = Date.now();
    return mergedList;
  } catch (error) {
    // If we have cached countries, return them
    if (allCountriesCache && allCountriesCache.length > 0) {
      return allCountriesCache;
    }

    // Graceful offline fallback
    console.warn("REST Countries API unreachable; activating embedded offline fallback dataset", error);
    for (const country of FALLBACK_COUNTRIES) {
      countryCache.set(country.cca3.toUpperCase(), country);
    }
    allCountriesCache = FALLBACK_COUNTRIES;
    lastCacheTime = Date.now();
    return FALLBACK_COUNTRIES;
  }
}

/**
 * Fetches a single country by 2-letter or 3-letter code.
 * Adheres strictly to <= 10 fields per request.
 */
export async function getCountryByCode(code: string, signal?: AbortSignal): Promise<Country> {
  const upperCode = code.trim().toUpperCase();

  // Check in-memory cache first
  const cached = countryCache.get(upperCode);
  if (cached) {
    return cached;
  }

  // Check fallback dataset if already initialized
  const fallback = FALLBACK_COUNTRIES.find(
    (c) => c.cca3 === upperCode || c.cca2 === upperCode
  );

  const urlBatch1 = `${REST_COUNTRIES_BASE_URL}/alpha/${upperCode}?fields=${BATCH_1_FIELDS.join(",")}`;
  const urlBatch2 = `${REST_COUNTRIES_BASE_URL}/alpha/${upperCode}?fields=${BATCH_2_FIELDS.join(",")}`;

  try {
    const [rawBatch1, rawBatch2] = await Promise.all([
      fetchWithRetryAndTimeout<unknown>(urlBatch1, { signal }),
      fetchWithRetryAndTimeout<unknown>(urlBatch2, { signal }),
    ]);

    const parsed1 = RestCountryBatch1Schema.safeParse(rawBatch1);
    if (!parsed1.success) {
      throw new AppError({
        code: "PARSE_ERROR",
        message: `Failed to parse country batch 1 for ${upperCode}`,
        retryable: false,
      });
    }

    const parsed2 = RestCountryBatch2Schema.safeParse(rawBatch2);
    const country = normalizeCountry(parsed1.data, parsed2.success ? parsed2.data : undefined);

    countryCache.set(country.cca3, country);
    countryCache.set(country.cca2, country);
    return country;
  } catch (error) {
    if (fallback) {
      countryCache.set(fallback.cca3, fallback);
      return fallback;
    }
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError({
      code: "NOT_FOUND",
      message: `Country not found: ${upperCode}`,
      status: 404,
      isNotFound: true,
      retryable: false,
      cause: error,
    });
  }
}

/**
 * Resolves an array of bordering country codes into basic Country summaries.
 */
export async function getBorders(codes: string[], signal?: AbortSignal): Promise<BorderCountry[]> {
  if (!codes || codes.length === 0) {
    return [];
  }

  // Pre-load all countries if not already cached
  let allCountries: Country[];
  try {
    allCountries = await getAllCountries(signal);
  } catch {
    allCountries = FALLBACK_COUNTRIES;
  }

  const lookup = new Map<string, Country>();
  for (const c of allCountries) {
    lookup.set(c.cca3.toUpperCase(), c);
  }

  const results: BorderCountry[] = [];
  for (const rawCode of codes) {
    const code = rawCode.trim().toUpperCase();
    const match = lookup.get(code);
    if (match) {
      results.push({
        cca3: match.cca3,
        cca2: match.cca2,
        name: {
          common: match.name.common,
          official: match.name.official,
        },
        flags: match.flags,
      });
    }
  }

  return results;
}

/**
 * Searches countries locally by common name, official name, cca2, cca3, or capital.
 */
export async function searchCountries(query: string, signal?: AbortSignal): Promise<Country[]> {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return [];
  }

  const countries = await getAllCountries(signal);
  return countries.filter((c) => {
    return (
      c.name.common.toLowerCase().includes(normalizedQuery) ||
      c.name.official.toLowerCase().includes(normalizedQuery) ||
      c.cca2.toLowerCase() === normalizedQuery ||
      c.cca3.toLowerCase() === normalizedQuery ||
      c.capital.some((cap) => cap.toLowerCase().includes(normalizedQuery)) ||
      c.region.toLowerCase().includes(normalizedQuery)
    );
  });
}
