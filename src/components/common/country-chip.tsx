import * as React from "react";
import Link from "next/link";
import { FlagImage } from "./flag-image";
import { cn } from "@/lib/utils";

export interface CountryChipProps {
  name: string;
  cca2?: string;
  cca3: string;
  flagSrc?: string;
  region?: string;
  asLink?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function CountryChip({
  name,
  cca2,
  cca3,
  flagSrc,
  region,
  asLink = true,
  size = "md",
  className,
}: CountryChipProps) {
  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs transition-all duration-150 hover:border-primary/50 hover:bg-muted/60 select-none",
        size === "sm" && "px-2 py-0.5 text-[11px]",
        className
      )}
    >
      {/* Mini Flag */}
      <div className="relative h-3.5 w-5 shrink-0 overflow-hidden rounded-xs border border-border/40">
        <FlagImage
          src={flagSrc}
          countryCode={cca2 || cca3.slice(0, 2)}
          countryName={name}
          width={40}
          height={28}
          aspectRatio="3/2"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Country Name */}
      <span className="truncate max-w-[140px] font-medium">{name}</span>

      {/* Region Badge (optional) */}
      {region && <span className="text-[10px] text-muted-foreground/80 font-mono">{region}</span>}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={`/country/${cca3.toUpperCase()}`}
        className="inline-flex focus-visible:outline-2 focus-visible:outline-[var(--ring)] rounded-full"
      >
        {content}
      </Link>
    );
  }

  return content;
}
