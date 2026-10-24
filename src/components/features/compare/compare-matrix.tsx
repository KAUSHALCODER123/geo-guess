"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeftRight, Trash2, Trophy, ExternalLink } from "lucide-react";
import type { Country } from "@/types";
import { FlagImage } from "@/components/common/flag-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CompareMatrixProps {
  countries: Country[];
  onRemoveCountry: (code: string) => void;
  onSwapCountries: (indexA: number, indexB: number) => void;
}

export function CompareMatrix({
  countries,
  onRemoveCountry,
  onSwapCountries,
}: CompareMatrixProps) {
  // Compute metrics and winners
  const metrics = React.useMemo(() => {
    return countries.map((c) => {
      const density = c.area > 0 ? Math.round(c.population / c.area) : 0;
      const languagesCount = Object.keys(c.languages || {}).length;
      const bordersCount = (c.borders || []).length;
      const currenciesFormatted = Object.values(c.currencies || {})
        .map((cur) => `${cur.name} (${cur.symbol || ""})`)
        .join(", ");

      return {
        country: c,
        density,
        languagesCount,
        bordersCount,
        currenciesFormatted: currenciesFormatted || "None",
      };
    });
  }, [countries]);

  // Identify winners for each numerical metric
  const winners = React.useMemo(() => {
    if (countries.length < 2) return {};

    const maxPop = Math.max(...countries.map((c) => c.population));
    const maxArea = Math.max(...countries.map((c) => c.area));
    const maxDensity = Math.max(...metrics.map((m) => m.density));
    const maxLanguages = Math.max(...metrics.map((m) => m.languagesCount));
    const maxBorders = Math.max(...metrics.map((m) => m.bordersCount));

    return {
      population: maxPop > 0 ? countries.filter((c) => c.population === maxPop).map((c) => c.cca3) : [],
      area: maxArea > 0 ? countries.filter((c) => c.area === maxArea).map((c) => c.cca3) : [],
      density: maxDensity > 0 ? metrics.filter((m) => m.density === maxDensity).map((m) => m.country.cca3) : [],
      languages: maxLanguages > 0 ? metrics.filter((m) => m.languagesCount === maxLanguages).map((m) => m.country.cca3) : [],
      borders: maxBorders > 0 ? metrics.filter((m) => m.bordersCount === maxBorders).map((m) => m.country.cca3) : [],
    };
  }, [countries, metrics]);

  const rows = [
    {
      label: "Capital",
      render: (m: (typeof metrics)[0]) => (
        <span className="font-semibold text-foreground">
          {m.country.capital?.length > 0 ? m.country.capital.join(", ") : "None"}
        </span>
      ),
    },
    {
      label: "Population",
      render: (m: (typeof metrics)[0]) => {
        const isWinner = winners.population?.includes(m.country.cca3);
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn("font-mono font-bold text-sm sm:text-base", isWinner && "text-amber-500 font-extrabold")}>
              {m.country.population.toLocaleString()}
            </span>
            {isWinner && (
              <Badge variant="accent" size="sm" className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1">
                <Trophy className="h-3 w-3" /> Largest
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      label: "Surface Area",
      render: (m: (typeof metrics)[0]) => {
        const isWinner = winners.area?.includes(m.country.cca3);
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn("font-mono font-bold text-sm sm:text-base", isWinner && "text-emerald-500 font-extrabold")}>
              {m.country.area > 0 ? `${m.country.area.toLocaleString()} km²` : "N/A"}
            </span>
            {isWinner && (
              <Badge variant="success" size="sm" className="gap-1">
                <Trophy className="h-3 w-3" /> Largest
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      label: "Population Density",
      render: (m: (typeof metrics)[0]) => {
        const isWinner = winners.density?.includes(m.country.cca3);
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn("font-mono font-bold text-sm", isWinner && "text-sky-500 font-extrabold")}>
              {m.density > 0 ? `${m.density.toLocaleString()} / km²` : "N/A"}
            </span>
            {isWinner && (
              <Badge variant="default" size="sm" className="gap-1">
                <Trophy className="h-3 w-3" /> Densest
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      label: "Official Languages",
      render: (m: (typeof metrics)[0]) => {
        const isWinner = winners.languages?.includes(m.country.cca3);
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn("font-mono font-bold text-sm", isWinner && "text-primary font-extrabold")}>
              {m.languagesCount} ({Object.values(m.country.languages || {}).join(", ") || "None"})
            </span>
            {isWinner && (
              <Badge variant="secondary" size="sm">
                Most
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      label: "Border Count",
      render: (m: (typeof metrics)[0]) => {
        const isWinner = winners.borders?.includes(m.country.cca3);
        return (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={cn("font-mono font-bold text-sm", isWinner && "text-primary font-extrabold")}>
              {m.bordersCount} {m.bordersCount === 1 ? "neighbor" : "neighbors"}
            </span>
            {isWinner && (
              <Badge variant="secondary" size="sm">
                Most
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      label: "Currencies",
      render: (m: (typeof metrics)[0]) => (
        <span className="text-sm font-medium text-foreground">
          {m.currenciesFormatted}
        </span>
      ),
    },
    {
      label: "Region / Subregion",
      render: (m: (typeof metrics)[0]) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          <Badge variant="secondary" size="sm">{m.country.region}</Badge>
          {m.country.subregion && (
            <span className="text-xs text-muted-foreground">{m.country.subregion}</span>
          )}
        </div>
      ),
    },
    {
      label: "UN Membership",
      render: (m: (typeof metrics)[0]) => (
        <Badge variant={m.country.unMember ? "success" : "secondary"} size="sm">
          {m.country.unMember ? "Member" : "Non-member"}
        </Badge>
      ),
    },
    {
      label: "Coastline Status",
      render: (m: (typeof metrics)[0]) => (
        <Badge variant={m.country.landlocked ? "warning" : "outline"} size="sm">
          {m.country.landlocked ? "Landlocked" : "Coastal"}
        </Badge>
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header Row: Flags, Names, and Controls */}
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="p-4 sm:p-5 w-44 min-w-[140px] text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Metric
              </th>
              {metrics.map((m, idx) => (
                <th
                  key={m.country.cca3}
                  className="p-4 sm:p-5 min-w-[220px] max-w-[320px] align-top"
                >
                  <div className="space-y-3">
                    {/* Flag & Links */}
                    <div className="relative aspect-[3/2] w-full max-w-[200px] overflow-hidden rounded-lg border border-border/70 shadow-xs">
                      <FlagImage
                        src={m.country.flags.svg || m.country.flags.png}
                        countryCode={m.country.cca2}
                        countryName={m.country.name.common}
                        aspectRatio="3/2"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/country/${m.country.cca3.toLowerCase()}`}
                          className="font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                        >
                          {m.country.name.common}
                          <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                        </Link>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {m.country.name.official}
                      </p>
                    </div>

                    {/* Quick Column Actions */}
                    <div className="flex items-center gap-2 pt-1">
                      {idx > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => onSwapCountries(idx, idx - 1)}
                          title="Swap with left"
                          leftIcon={<ArrowLeftRight className="h-3.5 w-3.5" />}
                          className="h-7 px-2 text-xs"
                        >
                          Swap
                        </Button>
                      )}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveCountry(m.country.cca3)}
                        title="Remove country"
                        leftIcon={<Trash2 className="h-3.5 w-3.5 text-destructive" />}
                        className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body Rows */}
          <tbody className="divide-y divide-border/60">
            {rows.map((row, rIdx) => (
              <tr
                key={row.label}
                className={cn(
                  "transition-colors hover:bg-muted/20",
                  rIdx % 2 === 0 ? "bg-card" : "bg-muted/10"
                )}
              >
                <td className="p-4 sm:p-5 text-xs font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  {row.label}
                </td>
                {metrics.map((m) => (
                  <td key={m.country.cca3} className="p-4 sm:p-5 align-middle">
                    {row.render(m)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
