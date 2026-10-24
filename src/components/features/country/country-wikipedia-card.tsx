"use client";

import * as React from "react";
import Image from "next/image";
import { BookOpen, ExternalLink } from "lucide-react";
import { useWikiSummary } from "@/hooks/useWikiSummary";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export interface CountryWikipediaCardProps {
  countryName: string;
}

export function CountryWikipediaCard({ countryName }: CountryWikipediaCardProps) {
  const { summary, isLoading, isError } = useWikiSummary(countryName);

  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Skeleton className="h-32 w-full sm:w-44 rounded-lg shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !summary || !summary.extract) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-3">
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Encyclopedia Overview
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Detailed encyclopedia extract currently unavailable for {countryName}.
        </p>
        <Button asChild variant="outline" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
          <a
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Search on Wikipedia
          </a>
        </Button>
      </div>
    );
  }

  const wikiUrl =
    summary.content_urls?.desktop?.page ||
    `https://en.wikipedia.org/wiki/${encodeURIComponent(countryName)}`;

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Wikipedia Overview
        </h2>
        <Button
          asChild
          variant="ghost"
          size="sm"
          rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
          className="text-xs text-primary"
        >
          <a href={wikiUrl} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {summary.thumbnail?.source && (
          <div className="relative h-32 w-full sm:w-44 overflow-hidden rounded-lg border border-border/70 shrink-0 bg-muted/40">
            <Image
              src={summary.thumbnail.source}
              alt={summary.title}
              width={summary.thumbnail.width || 200}
              height={summary.thumbnail.height || 150}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="space-y-3 flex-1 text-sm text-muted-foreground leading-relaxed">
          <p>{summary.extract}</p>
        </div>
      </div>
    </div>
  );
}
