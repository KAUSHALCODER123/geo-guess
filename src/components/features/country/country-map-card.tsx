"use client";

import * as React from "react";
import { MapPin, ExternalLink, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CountryMapCardProps {
  countryName: string;
  latlng: [number, number];
}

export function CountryMapCard({ countryName, latlng }: CountryMapCardProps) {
  const [lat, lng] = latlng || [0, 0];

  const formatCoord = (val: number, type: "lat" | "lng") => {
    const dir = type === "lat" ? (val >= 0 ? "N" : "S") : val >= 0 ? "E" : "W";
    return `${Math.abs(val).toFixed(2)}° ${dir}`;
  };

  // Map coordinates onto an equirectangular SVG coordinate space [0, 400] x [0, 200]
  // lat is [-90, 90], lng is [-180, 180]
  const svgX = ((lng + 180) / 360) * 400;
  const svgY = ((90 - lat) / 180) * 200;

  const osmUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=6/${lat}/${lng}`;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Geographic Coordinates & Cartography
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latitude: {formatCoord(lat, "lat")} • Longitude: {formatCoord(lng, "lng")}
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
        >
          <a href={osmUrl} target="_blank" rel="noopener noreferrer">
            Open in OpenStreetMap
          </a>
        </Button>
      </div>

      {/* SVG World Projection Grid & Pin */}
      <div className="relative w-full aspect-[2/1] rounded-lg border border-border/70 bg-muted/20 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 400 200"
          className="w-full h-full stroke-muted-foreground/30 fill-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Latitude Lines */}
          <line x1="0" y1="50" x2="400" y2="50" strokeDasharray="3 3" />
          <line x1="0" y1="100" x2="400" y2="100" strokeWidth="1.2" className="stroke-primary/40" />
          <line x1="0" y1="150" x2="400" y2="150" strokeDasharray="3 3" />

          {/* Longitude Lines */}
          <line x1="100" y1="0" x2="100" y2="200" strokeDasharray="3 3" />
          <line x1="200" y1="0" x2="200" y2="200" strokeWidth="1.2" className="stroke-primary/40" />
          <line x1="300" y1="0" x2="300" y2="200" strokeDasharray="3 3" />

          {/* Simplified Continental Outlines */}
          <path
            d="M50,40 Q80,25 110,40 T150,70 L140,95 L110,85 Z"
            className="fill-muted/50 stroke-muted-foreground/40"
          />
          <path
            d="M90,110 Q110,110 120,130 T110,180 L95,160 Z"
            className="fill-muted/50 stroke-muted-foreground/40"
          />
          <path
            d="M190,30 Q220,20 250,35 T300,45 L320,80 L270,85 L220,70 Z"
            className="fill-muted/50 stroke-muted-foreground/40"
          />
          <path
            d="M180,75 Q210,75 230,100 T210,160 L180,110 Z"
            className="fill-muted/50 stroke-muted-foreground/40"
          />
          <path
            d="M310,120 Q350,110 360,140 T330,165 Z"
            className="fill-muted/50 stroke-muted-foreground/40"
          />

          {/* Pulsing Pin Marker */}
          <circle
            cx={svgX}
            cy={svgY}
            r="8"
            className="fill-primary/20 animate-ping"
          />
          <circle
            cx={svgX}
            cy={svgY}
            r="4.5"
            className="fill-primary stroke-background"
            strokeWidth="1.5"
          />
        </svg>

        {/* Floating Pin Label */}
        <div
          className="absolute z-10 pointer-events-none transform -translate-x-1/2 -translate-y-8 flex items-center gap-1 rounded-md bg-card/90 px-2 py-0.5 text-[10px] font-bold text-foreground shadow-xs border border-border/80 backdrop-blur-xs"
          style={{
            left: `${(svgX / 400) * 100}%`,
            top: `${(svgY / 200) * 100}%`,
          }}
        >
          <MapPin className="h-3 w-3 text-primary shrink-0" />
          <span>{countryName}</span>
        </div>
      </div>
    </div>
  );
}
