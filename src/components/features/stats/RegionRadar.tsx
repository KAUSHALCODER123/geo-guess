"use client";

import React, { useState, useEffect } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { AccuracyStat } from "@/types/store";

export interface RegionRadarProps {
  regionAccuracy: Record<string, AccuracyStat>;
}

const WORLD_REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export function RegionRadar({ regionAccuracy }: RegionRadarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-6 h-80 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading region stats...</span>
      </Card>
    );
  }

  const radarData = WORLD_REGIONS.map((region) => {
    // Look up with case insensitivity
    const matchKey = Object.keys(regionAccuracy).find(
      (k) => k.toLowerCase() === region.toLowerCase()
    );
    const stat = matchKey ? regionAccuracy[matchKey] : null;

    const total = stat?.total || 0;
    const correct = stat?.correct || 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      region,
      accuracy,
      total,
      correct,
    };
  });

  const totalAnswered = Object.values(regionAccuracy).reduce((acc, c) => acc + c.total, 0);

  if (totalAnswered === 0) {
    return (
      <Card className="p-6 text-center space-y-2">
        <CardTitle className="text-lg">Regional Mastery</CardTitle>
        <p className="text-sm text-muted-foreground py-10">
          Answer questions across different continents to map your geographical mastery!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <CardTitle className="text-lg font-bold">Regional Mastery</CardTitle>
        <CardDescription>Accuracy percentage by continental region</CardDescription>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid opacity={0.2} />
            <PolarAngleAxis dataKey="region" tick={{ fontSize: 12, fill: "currentColor" }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} tickFormatter={(val) => `${val}%`} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-2.5 bg-popover text-popover-foreground border border-border rounded-lg shadow-md text-xs space-y-1">
                      <p className="font-bold">{data.region}</p>
                      <p className="text-primary font-semibold">
                        Mastery: {data.accuracy}%
                      </p>
                      <p className="text-muted-foreground">
                        {data.correct} / {data.total} correct
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Radar
              name="Mastery"
              dataKey="accuracy"
              stroke="var(--primary, #3b82f6)"
              fill="var(--primary, #3b82f6)"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
