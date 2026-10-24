"use client";

import * as React from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Thermometer,
  Droplets,
  CloudFog,
} from "lucide-react";
import { useCapitalWeather } from "@/hooks/useCapitalWeather";
import { Skeleton } from "@/components/ui/skeleton";

export interface CountryWeatherCardProps {
  capitalName?: string;
  lat?: number;
  lng?: number;
}

export function CountryWeatherCard({ capitalName, lat, lng }: CountryWeatherCardProps) {
  const { weather, isLoading, isError } = useCapitalWeather(lat, lng);

  const capitalTitle = capitalName || "Capital City";

  const renderWeatherIcon = (iconKey?: string) => {
    switch (iconKey) {
      case "clear-day":
        return <Sun className="h-8 w-8 text-amber-500 animate-spin-slow" />;
      case "clear-night":
        return <Sun className="h-8 w-8 text-indigo-400" />;
      case "cloudy":
        return <Cloud className="h-8 w-8 text-sky-400" />;
      case "rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />;
      case "snow":
        return <CloudSnow className="h-8 w-8 text-sky-200" />;
      case "thunderstorm":
        return <CloudLightning className="h-8 w-8 text-amber-400" />;
      case "fog":
        return <CloudFog className="h-8 w-8 text-slate-400" />;
      default:
        return <Cloud className="h-8 w-8 text-primary" />;
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
        <Skeleton className="h-5 w-44" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (isError || !weather) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-2">
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Live Weather ({capitalTitle})
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Real-time weather station metrics currently unavailable for {capitalTitle}.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Live Weather in {capitalTitle}
        </h2>
        <span className="text-xs text-muted-foreground font-medium">
          Station Feed
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Temperature & Condition */}
        <div className="flex items-center gap-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 col-span-2 sm:col-span-1">
          <div className="shrink-0">{renderWeatherIcon(weather.iconKey)}</div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-foreground font-mono">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-xs text-muted-foreground font-medium truncate">
              {weather.condition}
            </div>
          </div>
        </div>

        {/* Feels Like */}
        <div className="flex flex-col justify-between rounded-lg border border-border/50 bg-muted/20 p-3.5">
          <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
            <Thermometer className="h-3.5 w-3.5 text-primary" />
            Feels Like
          </span>
          <div className="text-lg sm:text-xl font-bold text-foreground font-mono mt-1">
            {Math.round(weather.apparentTemp)}°C
          </div>
        </div>

        {/* Relative Humidity */}
        <div className="flex flex-col justify-between rounded-lg border border-border/50 bg-muted/20 p-3.5">
          <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
            <Droplets className="h-3.5 w-3.5 text-sky-500" />
            Humidity
          </span>
          <div className="text-lg sm:text-xl font-bold text-foreground font-mono mt-1">
            {weather.humidity}%
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col justify-between rounded-lg border border-border/50 bg-muted/20 p-3.5">
          <span className="text-[11px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
            <Wind className="h-3.5 w-3.5 text-teal-500" />
            Wind
          </span>
          <div className="text-lg sm:text-xl font-bold text-foreground font-mono mt-1">
            {Math.round(weather.windSpeed)} km/h
          </div>
        </div>
      </div>
    </div>
  );
}
