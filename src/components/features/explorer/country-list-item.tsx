"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import type { Country } from "@/types";
import { FlagImage } from "@/components/common/flag-image";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export interface CountryListItemProps {
  country: Country;
}

export function CountryListItem({ country }: CountryListItemProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(country.cca3);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(country.cca3);
  };

  const formattedPopulation = country.population.toLocaleString();
  const formattedArea = country.area > 0 ? `${country.area.toLocaleString()} km²` : "—";
  const capitalDisplay = country.capital?.length > 0 ? country.capital[0] : "—";

  return (
    <div className="group relative flex items-center justify-between rounded-xl border border-border bg-card p-3 sm:p-4 shadow-xs transition-all duration-150 hover:border-primary/40 hover:bg-muted/30">
      {/* Left: Flag & Details Link */}
      <Link
        href={`/country/${country.cca3.toLowerCase()}`}
        className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-[var(--ring)] rounded-lg"
      >
        {/* Flag Thumbnail */}
        <div className="relative h-10 w-14 sm:h-12 sm:w-16 shrink-0 overflow-hidden rounded-md border border-border/60">
          <FlagImage
            src={country.flags.svg || country.flags.png}
            countryCode={country.cca2}
            countryName={country.name.common}
            alt={country.flags.alt || `Flag of ${country.name.common}`}
            aspectRatio="3/2"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Names & Region */}
        <div className="min-w-0 flex-1 pr-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-foreground truncate group-hover:text-primary transition-colors">
              {country.name.common}
            </span>
            <Badge variant="secondary" size="sm" className="hidden sm:inline-flex text-[11px]">
              {country.region}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate hidden md:block">
            {country.name.official}
          </p>
        </div>

        {/* Capital */}
        <div className="hidden lg:block w-36 text-xs text-muted-foreground truncate">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70 block">
            Capital
          </span>
          <span className="text-foreground font-medium truncate block">{capitalDisplay}</span>
        </div>

        {/* Population */}
        <div className="w-24 sm:w-32 text-right text-xs">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70 block">
            Pop.
          </span>
          <span className="text-foreground font-medium font-mono truncate block">
            {formattedPopulation}
          </span>
        </div>

        {/* Area */}
        <div className="hidden md:block w-28 text-right text-xs">
          <span className="text-[10px] uppercase font-semibold text-muted-foreground/70 block">
            Area
          </span>
          <span className="text-foreground font-medium font-mono truncate block">
            {formattedArea}
          </span>
        </div>
      </Link>

      {/* Right Actions: Favorite & Arrow */}
      <div className="flex items-center gap-2 pl-3 ml-2 border-l border-border/40 shrink-0">
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={
            favorite
              ? `Remove ${country.name.common} from favorites`
              : `Add ${country.name.common} to favorites`
          }
          aria-pressed={favorite}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-transform active:scale-90",
            favorite
              ? "bg-rose-500/15 text-rose-500 hover:bg-rose-500/25"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-transform",
              favorite && "fill-current scale-110"
            )}
          />
        </button>

        <Link
          href={`/country/${country.cca3.toLowerCase()}`}
          aria-hidden="true"
          tabIndex={-1}
          className="text-muted-foreground group-hover:text-primary transition-colors hidden sm:flex"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
