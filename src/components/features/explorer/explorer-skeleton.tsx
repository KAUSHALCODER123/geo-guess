import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ViewMode } from "./types";

export interface ExplorerSkeletonProps {
  viewMode?: ViewMode;
  count?: number;
}

export function ExplorerSkeleton({ viewMode = "grid", count = 12 }: ExplorerSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {items.map((i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-border bg-card p-3 sm:p-4 shadow-xs"
          >
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              <Skeleton className="h-10 w-14 sm:h-12 sm:w-16 rounded-md shrink-0" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48 hidden md:block" />
              </div>
              <Skeleton className="h-4 w-20 hidden lg:block" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-8 rounded-full ml-4 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((i) => (
        <div
          key={i}
          className="flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-xs"
        >
          <Skeleton className="aspect-[3/2] w-full" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <div className="pt-2 border-t border-border/40 flex justify-between gap-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
