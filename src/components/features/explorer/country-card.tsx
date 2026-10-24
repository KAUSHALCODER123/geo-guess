"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Users, MapPin } from "lucide-react";
import type { Country } from "@/types";
import { FlagImage } from "@/components/common/flag-image";
import { Badge } from "@/components/ui/badge";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(country.cca3);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(country.cca3);
  };

  const formattedPopulation = country.population.toLocaleString();
  const capitalDisplay = country.capital?.length > 0 ? country.capital.join(", ") : "None";

  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md overflow-hidden">
      {/* Top Image Container */}
      <Link
        href={`/country/${country.cca3.toLowerCase()}`}
        className="block relative aspect-[3/2] w-full overflow-hidden bg-muted/30"
        tabIndex={-1}
        aria-hidden="true"
      >
        <FlagImage
          src={country.flags.svg || country.flags.png}
          countryCode={country.cca2}
          countryName={country.name.common}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          aspectRatio="3/2"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Region Badge Overlay */}
        <div className="absolute bottom-2 left-2 z-20">
          <Badge
            variant="secondary"
            size="sm"
            className="backdrop-blur-md bg-card/85 shadow-xs font-medium text-[11px]"
          >
            {country.region}
          </Badge>
        </div>
      </Link>

      {/* Favorite Button */}
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
          "absolute top-2.5 right-2.5 z-30 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md shadow-xs transition-transform duration-150 active:scale-90",
          favorite
            ? "bg-rose-500/90 text-white hover:bg-rose-600"
            : "bg-card/80 text-muted-foreground hover:text-foreground hover:bg-card"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-transform",
            favorite && "fill-current scale-110"
          )}
        />
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-4 justify-between">
        <div>
          <h2 className="text-base font-bold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            <Link href={`/country/${country.cca3.toLowerCase()}`}>
              {country.name.common}
            </Link>
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5" title={country.name.official}>
            {country.name.official}
          </p>
        </div>

        {/* Quick Facts */}
        <div className="mt-4 pt-3 border-t border-border/40 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground truncate" title={`Capital: ${capitalDisplay}`}>
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span className="truncate font-medium text-foreground">{capitalDisplay}</span>
          </div>

          <div className="flex items-center gap-1.5 text-muted-foreground truncate" title={`Population: ${formattedPopulation}`}>
            <Users className="h-3.5 w-3.5 shrink-0 text-primary/70" />
            <span className="truncate font-medium text-foreground font-mono">{formattedPopulation}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
