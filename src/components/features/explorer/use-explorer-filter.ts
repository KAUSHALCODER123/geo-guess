"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type Fuse from "fuse.js";
import type { Country } from "@/types";
import {
  type ExplorerFilterState,
  type SortOption,
  type ViewMode,
  type LandlockedFilter,
  type UNMemberFilter,
  DEFAULT_FILTER_STATE,
} from "./types";

interface UseExplorerFilterOptions {
  countries: Country[];
}

export function useExplorerFilter({ countries }: UseExplorerFilterOptions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse state from URL search params
  const initialState = useMemo<ExplorerFilterState>(() => {
    const q = (searchParams ? searchParams.get("q") : null) ?? DEFAULT_FILTER_STATE.searchQuery;
    const region = (searchParams ? searchParams.get("region") : null) ?? DEFAULT_FILTER_STATE.region;
    const subregion = (searchParams ? searchParams.get("subregion") : null) ?? DEFAULT_FILTER_STATE.subregion;
    const minPopStr = searchParams ? searchParams.get("minPop") : null;
    const maxPopStr = searchParams ? searchParams.get("maxPop") : null;
    const minPopulation = minPopStr ? parseInt(minPopStr, 10) : DEFAULT_FILTER_STATE.minPopulation;
    const maxPopulation = maxPopStr ? parseInt(maxPopStr, 10) : DEFAULT_FILTER_STATE.maxPopulation;
    const landlocked = ((searchParams ? searchParams.get("landlocked") : null) as LandlockedFilter) || DEFAULT_FILTER_STATE.landlocked;
    const unMember = ((searchParams ? searchParams.get("un") : null) as UNMemberFilter) || DEFAULT_FILTER_STATE.unMember;
    const sortBy = ((searchParams ? searchParams.get("sort") : null) as SortOption) || DEFAULT_FILTER_STATE.sortBy;
    const viewMode = ((searchParams ? searchParams.get("view") : null) as ViewMode) || DEFAULT_FILTER_STATE.viewMode;

    return {
      searchQuery: q,
      region,
      subregion,
      minPopulation: isNaN(minPopulation) ? 0 : minPopulation,
      maxPopulation: isNaN(maxPopulation) ? 1_500_000_000 : maxPopulation,
      landlocked,
      unMember,
      sortBy,
      viewMode,
    };
  }, [searchParams]);

  const [filterState, setFilterState] = useState<ExplorerFilterState>(initialState);
  const isInternalUpdateRef = useRef(false);

  // Sync internal state when URL changes externally (e.g. Back/Forward button)
  useEffect(() => {
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    setFilterState(initialState);
  }, [initialState]);

  // Debounced URL update
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateURL = useCallback(
    (newState: ExplorerFilterState) => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }

      syncTimeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams();

        if (newState.searchQuery.trim()) {
          params.set("q", newState.searchQuery.trim());
        }
        if (newState.region !== "all") {
          params.set("region", newState.region);
        }
        if (newState.subregion !== "all") {
          params.set("subregion", newState.subregion);
        }
        if (newState.minPopulation > 0) {
          params.set("minPop", String(newState.minPopulation));
        }
        if (newState.maxPopulation < 1_500_000_000) {
          params.set("maxPop", String(newState.maxPopulation));
        }
        if (newState.landlocked !== "all") {
          params.set("landlocked", newState.landlocked);
        }
        if (newState.unMember !== "all") {
          params.set("un", newState.unMember);
        }
        if (newState.sortBy !== DEFAULT_FILTER_STATE.sortBy) {
          params.set("sort", newState.sortBy);
        }
        if (newState.viewMode !== DEFAULT_FILTER_STATE.viewMode) {
          params.set("view", newState.viewMode);
        }

        const queryString = params.toString();
        const basePath = pathname || "/explore";
        const targetUrl = queryString ? `${basePath}?${queryString}` : basePath;
        router.replace(targetUrl, { scroll: false });
      }, 250);
    },
    [pathname, router]
  );

  const updateFilter = useCallback(
    <K extends keyof ExplorerFilterState>(key: K, value: ExplorerFilterState[K]) => {
      isInternalUpdateRef.current = true;
      setFilterState((prev) => {
        const next = { ...prev, [key]: value };
        // If region changed, reset subregion to "all" if the current subregion does not belong to new region
        if (key === "region" && value !== prev.region) {
          next.subregion = "all";
        }
        updateURL(next);
        return next;
      });
    },
    [updateURL]
  );

  const clearFilters = useCallback(() => {
    isInternalUpdateRef.current = true;
    const resetState: ExplorerFilterState = {
      ...DEFAULT_FILTER_STATE,
      viewMode: filterState.viewMode, // retain chosen view mode
    };
    setFilterState(resetState);
    updateURL(resetState);
  }, [filterState.viewMode, updateURL]);

  // Fuse.js is loaded on the first search keystroke so it stays out of the initial bundle.
  const [FuseClass, setFuseClass] = useState<typeof Fuse | null>(null);
  const wantsSearch = filterState.searchQuery.trim().length > 0;
  useEffect(() => {
    if (!wantsSearch || FuseClass) return;
    let cancelled = false;
    void import("fuse.js").then((m) => {
      if (!cancelled) setFuseClass(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, [wantsSearch, FuseClass]);

  // Configure Fuse.js for instant fuzzy searching
  const fuse = useMemo(() => {
    if (!FuseClass) return null;
    return new FuseClass(countries, {
      keys: [
        { name: "name.common", weight: 0.4 },
        { name: "name.official", weight: 0.25 },
        { name: "cca3", weight: 0.15 },
        { name: "cca2", weight: 0.05 },
        { name: "capital", weight: 0.1 },
        { name: "region", weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
  }, [countries, FuseClass]);

  // Derived available regions
  const availableRegions = useMemo(() => {
    const set = new Set<string>();
    countries.forEach((c) => {
      if (c.region) set.add(c.region);
    });
    return Array.from(set).sort();
  }, [countries]);

  // Derived available subregions for current region
  const availableSubregions = useMemo(() => {
    const set = new Set<string>();
    countries.forEach((c) => {
      if (
        c.subregion &&
        (filterState.region === "all" || c.region.toLowerCase() === filterState.region.toLowerCase())
      ) {
        set.add(c.subregion);
      }
    });
    return Array.from(set).sort();
  }, [countries, filterState.region]);

  // Filter & Search & Sort pipeline
  const filteredCountries = useMemo(() => {
    let result: Country[] = countries;

    // 1. Fuzzy Search
    const query = filterState.searchQuery.trim();
    if (query) {
      if (fuse) {
        result = fuse.search(query).map((res) => res.item);
      } else {
        // Interim substring match while the fuzzy-search chunk is still loading.
        const q = query.toLowerCase();
        result = result.filter(
          (c) =>
            c.name.common.toLowerCase().includes(q) ||
            c.name.official.toLowerCase().includes(q) ||
            c.cca3.toLowerCase() === q ||
            c.capital?.some((cap) => cap.toLowerCase().includes(q))
        );
      }
    }

    // 2. Filter by Region
    if (filterState.region !== "all") {
      const targetRegion = filterState.region.toLowerCase();
      result = result.filter((c) => c.region.toLowerCase() === targetRegion);
    }

    // 3. Filter by Subregion
    if (filterState.subregion !== "all") {
      const targetSubregion = filterState.subregion.toLowerCase();
      result = result.filter((c) => c.subregion?.toLowerCase() === targetSubregion);
    }

    // 4. Filter by Population Range
    if (filterState.minPopulation > 0 || filterState.maxPopulation < 1_500_000_000) {
      result = result.filter(
        (c) =>
          c.population >= filterState.minPopulation &&
          c.population <= filterState.maxPopulation
      );
    }

    // 5. Filter by Landlocked
    if (filterState.landlocked === "landlocked") {
      result = result.filter((c) => c.landlocked === true);
    } else if (filterState.landlocked === "coastal") {
      result = result.filter((c) => c.landlocked === false);
    }

    // 6. Filter by UN Member
    if (filterState.unMember === "member") {
      result = result.filter((c) => c.unMember === true);
    } else if (filterState.unMember === "non-member") {
      result = result.filter((c) => c.unMember === false);
    }

    // 7. Sort
    const sorted = [...result].sort((a, b) => {
      switch (filterState.sortBy) {
        case "name_asc":
          return a.name.common.localeCompare(b.name.common);
        case "name_desc":
          return b.name.common.localeCompare(a.name.common);
        case "population_desc":
          return b.population - a.population;
        case "population_asc":
          return a.population - b.population;
        case "area_desc":
          return b.area - a.area;
        case "area_asc":
          return a.area - b.area;
        default:
          return 0;
      }
    });

    return sorted;
  }, [countries, fuse, filterState]);

  const isFiltered = useMemo(() => {
    return (
      Boolean(filterState.searchQuery.trim()) ||
      filterState.region !== "all" ||
      filterState.subregion !== "all" ||
      filterState.minPopulation > 0 ||
      filterState.maxPopulation < 1_500_000_000 ||
      filterState.landlocked !== "all" ||
      filterState.unMember !== "all" ||
      filterState.sortBy !== DEFAULT_FILTER_STATE.sortBy
    );
  }, [filterState]);

  return {
    filterState,
    updateFilter,
    clearFilters,
    isFiltered,
    filteredCountries,
    availableRegions,
    availableSubregions,
    totalCount: countries.length,
    matchCount: filteredCountries.length,
  };
}
