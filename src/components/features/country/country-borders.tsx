"use client";

import * as React from "react";
import { Compass, Palmtree } from "lucide-react";
import type { BorderCountry } from "@/types";
import { CountryChip } from "@/components/common/country-chip";

export interface CountryBordersProps {
  borders: BorderCountry[];
  countryName: string;
}

export function CountryBorders({ borders, countryName }: CountryBordersProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" />
          Bordering Nations
        </h2>
        <span className="text-xs text-muted-foreground font-mono">
          {borders.length} {borders.length === 1 ? "border" : "borders"}
        </span>
      </div>

      {borders.length > 0 ? (
        <div className="flex flex-wrap gap-2.5">
          {borders.map((border) => (
            <CountryChip
              key={border.cca3}
              name={border.name.common}
              cca3={border.cca3}
              cca2={border.cca2}
              flagSrc={border.flags.svg || border.flags.png}
              size="md"
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-4 text-sm text-muted-foreground">
          <Palmtree className="h-5 w-5 text-primary shrink-0" />
          <span>
            {countryName} is an island nation or sovereign territory with no direct land borders. All boundaries are maritime.
          </span>
        </div>
      )}
    </div>
  );
}
