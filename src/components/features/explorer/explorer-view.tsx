"use client";

import * as React from "react";
import Link from "next/link";
import { Scale, WifiOff, Globe } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { useCountries } from "@/hooks/useCountries";
import { useExplorerFilter } from "./use-explorer-filter";
import { ExplorerFilterBar } from "./explorer-filter-bar";
import { CountryCard } from "./country-card";
import { CountryListItem } from "./country-list-item";
import { ExplorerSkeleton } from "./explorer-skeleton";

export function ExplorerView() {
  const { countries, isLoading, isError, error, isOffline, refetch } = useCountries();

  const {
    filterState,
    updateFilter,
    clearFilters,
    isFiltered,
    filteredCountries,
    availableRegions,
    availableSubregions,
    totalCount,
    matchCount,
  } = useExplorerFilter({ countries });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6 animate-in fade-in-50 duration-300">
      {/* Offline Alert Banner */}
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning-foreground dark:text-amber-300"
        >
          <WifiOff className="h-4 w-4 shrink-0 text-warning" />
          <span>
            You are browsing offline. Showing cached world atlas country records.
          </span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="World Explorer"
        description="Search, filter, and discover demographic, geographic, and geopolitical facts across all 250 sovereign nations and territories."
        actions={
          <Button asChild variant="outline" size="md" leftIcon={<Scale className="h-4 w-4" />}>
            <Link href="/compare">Compare Nations</Link>
          </Button>
        }
      />

      {/* Filter and Control Bar */}
      <ExplorerFilterBar
        filterState={filterState}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
        isFiltered={isFiltered}
        availableRegions={availableRegions}
        availableSubregions={availableSubregions}
        totalCount={totalCount}
        matchCount={matchCount}
      />

      {/* Loading State */}
      {isLoading && (
        <ExplorerSkeleton viewMode={filterState.viewMode} count={12} />
      )}

      {/* Error State */}
      {!isLoading && isError && (
        <ErrorState
          title="Unable to load world atlas"
          message="We were unable to load country data from the repository. Check your network or try again."
          details={error?.message}
          onRetry={refetch}
        />
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredCountries.length === 0 && (
        <EmptyState
          icon={<Globe className="h-7 w-7 text-primary" />}
          title="No nations matched your criteria"
          description="We couldn't find any countries matching your active query and filter combination. Try clearing some filters to expand your search."
          action={
            <Button variant="default" size="md" onClick={clearFilters}>
              Reset all filters
            </Button>
          }
        />
      )}

      {/* Results View: Grid or List */}
      {!isLoading && !isError && filteredCountries.length > 0 && (
        <>
          {filterState.viewMode === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredCountries.map((country) => (
                <CountryCard key={country.cca3} country={country} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCountries.map((country) => (
                <CountryListItem key={country.cca3} country={country} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
