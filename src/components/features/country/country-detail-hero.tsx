"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, Scale, ArrowLeft } from "lucide-react";
import type { Country } from "@/types";
import { FlagImage } from "@/components/common/flag-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

export interface CountryDetailHeroProps {
  country: Country;
}

export function CountryDetailHero({ country }: CountryDetailHeroProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(country.cca3);

  // Extract unique native names
  const nativeNames = React.useMemo(() => {
    if (!country.name.nativeName) return [];
    const names = new Set<string>();
    Object.values(country.name.nativeName).forEach((n) => {
      if (n.common && n.common !== country.name.common) {
        names.add(n.common);
      }
    });
    return Array.from(names);
  }, [country.name]);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
      {/* Top Bar: Back to Explorer & Action Buttons */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Button
          asChild
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="text-muted-foreground hover:text-foreground"
        >
          <Link href="/explore">Back to Explorer</Link>
        </Button>

        <div className="flex items-center gap-3">
          {/* Compare Button */}
          <Button
            asChild
            variant="outline"
            size="sm"
            leftIcon={<Scale className="h-4 w-4" />}
          >
            <Link href={`/compare?c=${country.cca3}`}>Compare</Link>
          </Button>

          {/* Favorite Toggle Button */}
          <Button
            type="button"
            variant={favorite ? "destructive" : "secondary"}
            size="sm"
            onClick={() => toggleFavorite(country.cca3)}
            aria-pressed={favorite}
            aria-label={
              favorite
                ? `Remove ${country.name.common} from favorites`
                : `Add ${country.name.common} to favorites`
            }
            leftIcon={
              <Heart
                className={cn(
                  "h-4 w-4 transition-transform",
                  favorite && "fill-current scale-110"
                )}
              />
            }
          >
            {favorite ? "Favorited" : "Add Favorite"}
          </Button>
        </div>
      </div>

      {/* Hero Content: Large Flag & Country Titles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        {/* Large Flag Display */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-xl border border-border/80 shadow-md">
            <FlagImage
              src={country.flags.svg || country.flags.png}
              countryCode={country.cca2}
              countryName={country.name.common}
              alt={country.flags.alt || `National flag of ${country.name.common}`}
              priority
              width={640}
              height={420}
              aspectRatio="3/2"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Country Titles & Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default" size="md">
              {country.region}
            </Badge>
            {country.subregion && (
              <Badge variant="secondary" size="md">
                {country.subregion}
              </Badge>
            )}
            <Badge variant="outline" size="md" className="font-mono">
              {country.cca3} / {country.cca2}
            </Badge>
            {country.unMember && (
              <Badge variant="success" size="md">
                UN Member
              </Badge>
            )}
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
              {country.name.common}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mt-1">
              {country.name.official}
            </p>
          </div>

          {nativeNames.length > 0 && (
            <div className="text-xs sm:text-sm text-muted-foreground pt-1">
              <span className="font-semibold text-foreground/80">Native Names: </span>
              <span>{nativeNames.join(", ")}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
