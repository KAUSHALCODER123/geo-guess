"use client";

import * as React from "react";
import { X, Sparkles } from "lucide-react";
import type { Country } from "@/types";
import { FlagImage } from "@/components/common/flag-image";
import { Input } from "@/components/ui/input";

export interface ComparePickerProps {
  allCountries: Country[];
  selectedCountries: Country[];
  onAddCountry: (country: Country) => void;
  onRemoveCountry: (code: string) => void;
  onSelectPreset: (codes: string[]) => void;
}

const PRESETS = [
  { label: "North America", codes: ["USA", "CAN", "MEX"] },
  { label: "European Trio", codes: ["FRA", "DEU", "ITA"] },
  { label: "East Asia", codes: ["JPN", "KOR", "CHN"] },
  { label: "Southern Hemisphere", codes: ["AUS", "NZL", "ZAF"] },
];

export function ComparePicker({
  allCountries,
  selectedCountries,
  onAddCountry,
  onRemoveCountry,
  onSelectPreset,
}: ComparePickerProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedCodes = React.useMemo(() => {
    return new Set(selectedCountries.map((c) => c.cca3.toUpperCase()));
  }, [selectedCountries]);

  const canAddMore = selectedCountries.length < 3;

  // Filter available countries
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return allCountries
        .filter((c) => !selectedCodes.has(c.cca3.toUpperCase()))
        .slice(0, 8);
    }
    const q = searchQuery.toLowerCase().trim();
    return allCountries
      .filter((c) => {
        if (selectedCodes.has(c.cca3.toUpperCase())) return false;
        return (
          c.name.common.toLowerCase().includes(q) ||
          c.name.official.toLowerCase().includes(q) ||
          c.cca3.toLowerCase().includes(q) ||
          c.capital?.some((cap) => cap.toLowerCase().includes(q))
        );
      })
      .slice(0, 8);
  }, [allCountries, searchQuery, selectedCodes]);

  // Click outside listener
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
            Select Countries to Compare (Up to 3)
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {selectedCountries.length} of 3 slots filled
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-accent" /> Presets:
          </span>
          {PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSelectPreset(preset.codes)}
              className="text-xs px-2.5 py-1 rounded-md border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-colors font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Country Tags & Add Trigger */}
      <div className="flex flex-wrap items-center gap-3">
        {selectedCountries.map((c) => (
          <div
            key={c.cca3}
            className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-foreground shadow-2xs"
          >
            <div className="relative h-4 w-6 shrink-0 overflow-hidden rounded-xs border border-border/40">
              <FlagImage
                src={c.flags.svg || c.flags.png}
                countryCode={c.cca2}
                countryName={c.name.common}
                aspectRatio="3/2"
                className="h-full w-full object-cover"
              />
            </div>
            <span>{c.name.common}</span>
            <button
              type="button"
              onClick={() => onRemoveCountry(c.cca3)}
              aria-label={`Remove ${c.name.common}`}
              className="ml-1 text-muted-foreground hover:text-destructive rounded-full p-0.5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {/* Combobox Search Trigger */}
        {canAddMore ? (
          <div className="relative flex-1 min-w-[200px]" ref={containerRef}>
            <Input
              isSearch
              placeholder="Search country to add..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              aria-label="Search country to compare"
            />

            {/* Dropdown Options */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border bg-popover p-1 shadow-lg">
                {searchResults.length > 0 ? (
                  searchResults.map((country) => (
                    <button
                      key={country.cca3}
                      type="button"
                      onClick={() => {
                        onAddCountry(country);
                        setSearchQuery("");
                        setIsOpen(false);
                      }}
                      className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm hover:bg-muted focus:bg-muted transition-colors"
                    >
                      <div className="relative h-4 w-6 shrink-0 overflow-hidden rounded-xs border border-border/40">
                        <FlagImage
                          src={country.flags.svg || country.flags.png}
                          countryCode={country.cca2}
                          countryName={country.name.common}
                          aspectRatio="3/2"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium text-foreground truncate">
                        {country.name.common}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto font-mono">
                        {country.cca3}
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs text-muted-foreground">
                    No matching countries found
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <span className="text-xs text-muted-foreground italic">
            Maximum 3 countries selected. Remove one to add another.
          </span>
        )}
      </div>
    </div>
  );
}
