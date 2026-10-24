"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { BarChart3, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsDashboard } from "@/components/features/stats";

function StatsPageContent() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <BarChart3 className="w-3.5 h-3.5" />
            Performance & Insights
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Player Statistics
          </h1>
          <p className="text-sm text-muted-foreground pt-1">
            Track your geographical accuracy, streaks, regional mastery, and unlocked achievements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button asChild size="sm" variant="outline">
            <Link href="/daily">
              <Calendar className="w-4 h-4 mr-1.5 text-purple-500" />
              Daily Challenge
            </Link>
          </Button>

          <Button asChild size="sm">
            <Link href="/play">
              <Play className="w-4 h-4 mr-1.5" />
              Play Quiz
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Stats Dashboard */}
      <StatsDashboard />
    </div>
  );
}

export default function StatsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <span className="text-muted-foreground">Loading Player Statistics...</span>
        </div>
      }
    >
      <StatsPageContent />
    </Suspense>
  );
}
