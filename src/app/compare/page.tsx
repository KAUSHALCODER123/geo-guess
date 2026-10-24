import { Suspense } from "react";
import type { Metadata } from "next";
import { CompareView } from "@/components/features/compare";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Compare Nations",
  description:
    "Compare up to 3 countries side-by-side with demographic metrics, geography facts, radar charts, and winner highlighting.",
};

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      }
    >
      <CompareView />
    </Suspense>
  );
}
