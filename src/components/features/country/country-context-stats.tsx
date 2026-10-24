"use client";

import * as React from "react";
import { Users, Maximize2, Activity } from "lucide-react";
import type { Country } from "@/types";
import { StatCard } from "@/components/common/stat-card";

export interface CountryContextStatsProps {
  country: Country;
  allCountries: Country[];
}

export function CountryContextStats({ country, allCountries }: CountryContextStatsProps) {
  const stats = React.useMemo(() => {
    const total = allCountries.length || 1;

    // Population ranking & percentile
    const sortedByPop = [...allCountries].sort((a, b) => b.population - a.population);
    const popRankIndex = sortedByPop.findIndex((c) => c.cca3 === country.cca3);
    const popRank = popRankIndex >= 0 ? popRankIndex + 1 : "—";
    const popSmallerCount = allCountries.filter((c) => c.population < country.population).length;
    const popPercentile = Math.round((popSmallerCount / total) * 100);

    // Area ranking & percentile
    const sortedByArea = [...allCountries].sort((a, b) => b.area - a.area);
    const areaRankIndex = sortedByArea.findIndex((c) => c.cca3 === country.cca3);
    const areaRank = areaRankIndex >= 0 ? areaRankIndex + 1 : "—";
    const areaSmallerCount = allCountries.filter((c) => c.area < country.area).length;
    const areaPercentile = Math.round((areaSmallerCount / total) * 100);

    // Population density
    const density =
      country.area > 0 ? Math.round(country.population / country.area) : 0;

    return {
      popRank,
      popPercentile,
      areaRank,
      areaPercentile,
      density,
    };
  }, [country, allCountries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Population Stat Card */}
      <StatCard
        label="Population"
        value={country.population.toLocaleString()}
        icon={<Users className="h-4 w-4" />}
        trend={{
          value: `Rank #${stats.popRank}`,
          isPositive: true,
        }}
        description={`Larger population than ${stats.popPercentile}% of nations`}
      />

      {/* Area Stat Card */}
      <StatCard
        label="Total Surface Area"
        value={country.area > 0 ? `${country.area.toLocaleString()} km²` : "N/A"}
        icon={<Maximize2 className="h-4 w-4" />}
        trend={{
          value: `Rank #${stats.areaRank}`,
          isPositive: true,
        }}
        description={`Larger territory than ${stats.areaPercentile}% of nations`}
      />

      {/* Density Stat Card */}
      <StatCard
        label="Population Density"
        value={stats.density > 0 ? `${stats.density.toLocaleString()} / km²` : "N/A"}
        icon={<Activity className="h-4 w-4" />}
        description={
          country.area > 0
            ? "Estimated demographic density per square kilometer"
            : "Surface area unrecorded"
        }
      />
    </div>
  );
}
