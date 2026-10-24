import { Suspense } from "react";
import type { Metadata } from "next";
import { ExplorerView, ExplorerSkeleton } from "@/components/features/explorer";

export const metadata: Metadata = {
  title: "Explore Nations",
  description:
    "Filter, search, and explore all 250 sovereign nations and territories with demographic facts, capitals, and flags.",
};

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
          <div className="h-10 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-20 w-full bg-muted animate-pulse rounded-xl" />
          <ExplorerSkeleton count={12} />
        </div>
      }
    >
      <ExplorerView />
    </Suspense>
  );
}
