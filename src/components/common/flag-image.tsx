"use client";

import * as React from "react";
import Image from "next/image";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFlagSource } from "@/lib/flags";

export interface FlagImageProps {
  src?: string;
  countryCode?: string;
  countryName?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  aspectRatio?: "3/2" | "4/3" | "1/1" | "auto";
}

export function FlagImage({
  src,
  countryCode,
  countryName,
  alt,
  width = 300,
  height = 200,
  priority = false,
  className,
  aspectRatio = "3/2",
}: FlagImageProps) {
  // Real flag from /public/flags first, then the remote URL; falls back to a tile if both fail.
  const { src: resolvedSrc, failed: hasError, onError: advanceSource } = useFlagSource(
    src,
    countryCode
  );
  const [loadedSrc, setLoadedSrc] = React.useState<string | null>(null);
  const isLoading = loadedSrc !== resolvedSrc;

  const resolvedAlt =
    alt || (countryName ? `Flag of ${countryName}` : `National flag ${countryCode || ""}`);

  const ratioClass =
    aspectRatio === "3/2"
      ? "aspect-[3/2]"
      : aspectRatio === "4/3"
        ? "aspect-[4/3]"
        : aspectRatio === "1/1"
          ? "aspect-square"
          : "";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md border border-border/70 bg-muted/40 shadow-xs flex items-center justify-center select-none",
        ratioClass,
        className
      )}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-muted animate-pulse motion-reduce:animate-none z-10"
          aria-hidden="true"
        />
      )}

      {/* Flag Image */}
      {!hasError && resolvedSrc ? (
        <Image
          src={resolvedSrc}
          alt={resolvedAlt}
          width={width}
          height={height}
          priority={priority}
          onLoad={() => setLoadedSrc(resolvedSrc)}
          onError={advanceSource}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          unoptimized={resolvedSrc.endsWith(".svg")}
        />
      ) : (
        /* Fallback SVG when image fails or is unavailable */
        <div
          className="flex h-full w-full flex-col items-center justify-center bg-muted/70 p-2 text-center text-muted-foreground"
          role="img"
          aria-label={resolvedAlt}
        >
          <Compass className="h-6 w-6 text-primary/60 mb-1" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground">
            {countryCode || "ATLAS"}
          </span>
          {countryName && (
            <span className="text-[9px] text-muted-foreground truncate max-w-full px-1">
              {countryName}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Fill-style flag for small thumbnails inside a positioned parent (quiz answers, review list).
 * Tries the bundled flag first, then the remote URL; renders nothing if both fail.
 */
export function FlagFill({
  src,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "src" | "onError"> & { src?: string }) {
  const { src: resolved, failed, onError } = useFlagSource(src);
  if (failed || !resolved) return null;
  // eslint-disable-next-line jsx-a11y/alt-text -- alt is supplied by the caller via props
  return <Image {...props} src={resolved} unoptimized onError={onError} />;
}
