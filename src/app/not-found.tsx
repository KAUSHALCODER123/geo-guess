import * as React from "react";
import Link from "next/link";
import { Compass, Globe, ArrowLeft, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      role="main"
      aria-labelledby="not-found-heading"
      className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 text-primary shadow-2xl">
        <Compass
          className="h-16 w-16 animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
        <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-background border border-border text-muted-foreground shadow-md">
          <Globe className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        <span>Coordinate Missing</span>
        <span aria-hidden="true">•</span>
        <span>404 Error</span>
      </div>

      <h1
        id="not-found-heading"
        className="text-3xl font-extrabold tracking-tight sm:text-5xl font-display mb-3"
      >
        Territory Uncharted
      </h1>

      <p className="max-w-md text-base sm:text-lg text-muted-foreground mb-8">
        We couldn&apos;t pinpoint this nation, territory, or page on our global atlas. The borders may have shifted or the URL was mistyped.
      </p>

      {/* Navigation Quick Links */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md mb-10">
        <Button asChild size="lg" className="w-full sm:w-auto gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return to Atlas</span>
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
          <Link href="/explore">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span>Browse Countries</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/play">
            <Trophy className="h-4 w-4" aria-hidden="true" />
            <span>Play Quiz Arena</span>
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/60 bg-card/40 p-4 max-w-sm w-full text-xs text-muted-foreground">
        <p>
          Tip: Press <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">Ctrl + K</kbd> or <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-semibold text-foreground">⌘ + K</kbd> anywhere to quickly search all 250+ countries.
        </p>
      </div>
    </div>
  );
}
