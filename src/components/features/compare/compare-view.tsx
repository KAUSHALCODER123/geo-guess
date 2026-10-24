"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Scale, Sparkles } from "lucide-react";
import type { Country } from "@/types";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCountries } from "@/hooks/useCountries";
import { ComparePicker } from "./compare-picker";
import { CompareMatrix } from "./compare-matrix";
import dynamic from "next/dynamic";

// Recharts is heavy: load it only once two or more countries are selected.
const CompareCharts = dynamic(() => import("./compare-charts").then((m) => m.CompareCharts), {
  ssr: false,
  loading: () => <Skeleton className="h-80 w-full rounded-xl" />,
});

export function CompareView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { countries: allCountries, isLoading } = useCountries();

  // Read country codes from `?c=USA,CAN,MEX`
  const selectedCodes = React.useMemo(() => {
    const raw = searchParams ? searchParams.get("c") : null;
    if (!raw) return [];
    return raw
      .split(",")
      .map((code) => code.trim().toUpperCase())
      .filter(Boolean)
      .slice(0, 3);
  }, [searchParams]);

  // Resolve matching Country objects
  const selectedCountries = React.useMemo(() => {
    if (allCountries.length === 0 || selectedCodes.length === 0) return [];
    const lookup = new Map<string, Country>();
    allCountries.forEach((c) => {
      lookup.set(c.cca3.toUpperCase(), c);
      lookup.set(c.cca2.toUpperCase(), c);
    });

    const result: Country[] = [];
    selectedCodes.forEach((code) => {
      const found = lookup.get(code);
      if (found && !result.some((existing) => existing.cca3 === found.cca3)) {
        result.push(found);
      }
    });
    return result;
  }, [allCountries, selectedCodes]);

  // URL sync helper
  const updateUrlWithCodes = React.useCallback(
    (codes: string[]) => {
      const targetPath = pathname || "/compare";
      const unique = Array.from(new Set(codes.map((c) => c.toUpperCase()))).slice(0, 3);
      if (unique.length > 0) {
        router.replace(`${targetPath}?c=${unique.join(",")}`, { scroll: false });
      } else {
        router.replace(targetPath, { scroll: false });
      }
    },
    [pathname, router]
  );

  const handleAddCountry = (country: Country) => {
    const nextCodes = [...selectedCountries.map((c) => c.cca3), country.cca3];
    updateUrlWithCodes(nextCodes);
  };

  const handleRemoveCountry = (code: string) => {
    const nextCodes = selectedCountries
      .filter((c) => c.cca3.toUpperCase() !== code.toUpperCase())
      .map((c) => c.cca3);
    updateUrlWithCodes(nextCodes);
  };

  const handleSwapCountries = (indexA: number, indexB: number) => {
    const nextList = [...selectedCountries];
    const temp = nextList[indexA];
    nextList[indexA] = nextList[indexB];
    nextList[indexB] = temp;
    updateUrlWithCodes(nextList.map((c) => c.cca3));
  };

  const handleSelectPreset = (codes: string[]) => {
    updateUrlWithCodes(codes);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8 animate-in fade-in-50 duration-300">
      {/* Page Header */}
      <PageHeader
        title="Compare Nations"
        description="Analyze up to 3 sovereign nations side-by-side with demographic metrics, geography facts, winner badges, and visual radar analysis."
      />

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      )}

      {/* Country Selection Combobox & Presets */}
      {!isLoading && (
        <ComparePicker
          allCountries={allCountries}
          selectedCountries={selectedCountries}
          onAddCountry={handleAddCountry}
          onRemoveCountry={handleRemoveCountry}
          onSelectPreset={handleSelectPreset}
        />
      )}

      {/* Empty State when fewer than 2 countries selected */}
      {!isLoading && selectedCountries.length < 2 && (
        <EmptyState
          icon={<Scale className="h-8 w-8 text-primary" />}
          title={
            selectedCountries.length === 1
              ? `Select at least 1 more nation to compare with ${selectedCountries[0].name.common}`
              : "Select 2 or 3 nations to begin comparison"
          }
          description="Use the search bar above or choose a preset combination to instantly benchmark population, surface area, density, languages, and boundaries."
          action={
            <div className="flex gap-2.5 flex-wrap justify-center">
              <Button
                variant="default"
                size="md"
                onClick={() => handleSelectPreset(["USA", "CAN", "MEX"])}
                leftIcon={<Sparkles className="h-4 w-4" />}
              >
                Compare North America (USA, CAN, MEX)
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => handleSelectPreset(["FRA", "DEU", "ITA"])}
              >
                Compare European Trio (FRA, DEU, ITA)
              </Button>
            </div>
          }
        />
      )}

      {/* Full Comparison Matrix & Charts when 2 or 3 countries selected */}
      {!isLoading && selectedCountries.length >= 2 && (
        <div className="space-y-8 animate-in fade-in-50 duration-300">
          {/* Side-by-Side Comparison Matrix */}
          <CompareMatrix
            countries={selectedCountries}
            onRemoveCountry={handleRemoveCountry}
            onSwapCountries={handleSwapCountries}
          />

          {/* Interactive Recharts Section */}
          <CompareCharts countries={selectedCountries} />
        </div>
      )}
    </div>
  );
}
