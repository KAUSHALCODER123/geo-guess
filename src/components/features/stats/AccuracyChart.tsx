"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import type { QuestionHistoryItem } from "@/types/store";

export interface AccuracyChartProps {
  history: QuestionHistoryItem[];
}

export function AccuracyChart({ history }: AccuracyChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-6 h-80 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">Loading chart...</span>
      </Card>
    );
  }

  // Aggregate questions by date (chronological order)
  const dateMap = new Map<string, { date: string; total: number; correct: number }>();

  // Process history (history is latest first, reverse for chronological)
  const chronological = [...history].reverse();
  for (const item of chronological) {
    const d = item.date || "Unknown";
    const existing = dateMap.get(d) || { date: d, total: 0, correct: 0 };
    existing.total += 1;
    if (item.correct) existing.correct += 1;
    dateMap.set(d, existing);
  }

  const chartData = Array.from(dateMap.values())
    .slice(-14) // last 14 active days
    .map((item) => ({
      date: item.date.slice(5), // "MM-DD"
      fullDate: item.date,
      accuracy: Math.round((item.correct / item.total) * 100),
      total: item.total,
      correct: item.correct,
    }));

  if (chartData.length === 0) {
    return (
      <Card className="p-6 text-center space-y-2">
        <CardTitle className="text-lg">Accuracy Over Time</CardTitle>
        <p className="text-sm text-muted-foreground py-10">
          No quiz history recorded yet. Play games to see your accuracy trend!
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-4">
      <div>
        <CardTitle className="text-lg font-bold">Accuracy Trend</CardTitle>
        <CardDescription>Daily performance over your recent active quiz days</CardDescription>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary, #3b82f6)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--primary, #3b82f6)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="date" tickLine={false} tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tickLine={false} unit="%" tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-md text-xs space-y-1">
                      <p className="font-bold">{data.fullDate}</p>
                      <p className="text-primary font-semibold">
                        Accuracy: {data.accuracy}%
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
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="var(--primary, #3b82f6)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#accuracyGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
