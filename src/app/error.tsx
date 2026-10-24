"use client";

import * as React from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorBoundaryProps) {
  React.useEffect(() => {
    // Log exception to console for observability
    console.error("[FlagForge Global Error Boundary Caught]:", error);
  }, [error]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-16 text-center"
    >
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-destructive/10 border border-destructive/20 text-destructive shadow-xl">
        <AlertTriangle className="h-12 w-12" aria-hidden="true" />
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-destructive mb-4">
        <span>Application Exception</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-display mb-3">
        Something went wrong
      </h1>

      <p className="max-w-md text-base text-muted-foreground mb-6">
        An unexpected error interrupted this view. Don&apos;t worry — your quiz streaks and offline country data are preserved.
      </p>

      {error.digest && (
        <div className="mb-6 inline-block rounded-md bg-muted px-3 py-1 font-mono text-xs text-muted-foreground">
          Error Digest: <span className="text-foreground font-semibold">{error.digest}</span>
        </div>
      )}

      {/* Action CTA Group */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md mb-8">
        <Button size="lg" onClick={() => reset()} className="w-full sm:w-auto gap-2">
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          <span>Try Again</span>
        </Button>
        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto gap-2">
          <Link href="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            <span>Return to Atlas</span>
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto gap-2 text-muted-foreground hover:text-foreground">
          <Link href="/explore">
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span>Browse Offline Cache</span>
          </Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        If this problem persists after retrying, clear your browser cache or reload the page.
      </p>
    </div>
  );
}
