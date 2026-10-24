"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCountry } from "@/hooks/useCountry";
import { useCountries } from "@/hooks/useCountries";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/ui/error-state";
import { CountryDetailSkeleton } from "./country-detail-skeleton";
import { CountryDetailHero } from "./country-detail-hero";
import { CountryContextStats } from "./country-context-stats";
import { CountryKeyFacts } from "./country-key-facts";
import { CountryBorders } from "./country-borders";
import { CountryWikipediaCard } from "./country-wikipedia-card";
import { CountryWeatherCard } from "./country-weather-card";
import { CountryMapCard } from "./country-map-card";

export interface CountryDetailViewProps {
  code: string;
}

export function CountryDetailView({ code }: CountryDetailViewProps) {
  const { country, borders, isLoading, isError, error, refetch } = useCountry(code);
  const { countries: allCountries } = useCountries();

  if (isLoading) {
    return <CountryDetailSkeleton />;
  }

  if (isError || !country) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <ErrorState
          title="Country Not Found"
          message={`We could not locate data for the territory code "${code.toUpperCase()}". It may be an unrecognized code or data is temporarily unreachable.`}
          details={error?.message}
          onRetry={refetch}
        />
        <div className="mt-6 flex justify-center">
          <Button asChild variant="default" size="md" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            <Link href="/explore">Return to World Explorer</Link>
          </Button>
        </div>
      </div>
    );
  }

  const capitalName = country.capital?.length > 0 ? country.capital[0] : country.name.common;
  const weatherCoords = country.capitalInfo?.latlng || country.latlng;
  const [lat, lng] = weatherCoords || [0, 0];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8 animate-in fade-in-50 duration-300">
      {/* Hero Section */}
      <CountryDetailHero country={country} />

      {/* Population & Area Context Comparisons */}
      <CountryContextStats country={country} allCountries={allCountries} />

      {/* Key Facts Grid */}
      <CountryKeyFacts country={country} />

      {/* Bordering Countries */}
      <CountryBorders borders={borders} countryName={country.name.common} />

      {/* Wikipedia Summary & Capital Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CountryWikipediaCard countryName={country.name.common} />
        <CountryWeatherCard
          capitalName={capitalName}
          lat={lat}
          lng={lng}
        />
      </div>

      {/* Visual Geographic Map & OpenStreetMap Integration */}
      <CountryMapCard
        countryName={country.name.common}
        latlng={country.latlng}
      />
    </div>
  );
}
