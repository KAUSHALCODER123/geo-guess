"use client";

import React, { useMemo } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { QuestionHistoryItem } from "@/types/store";

export interface HeatmapCalendarProps {
  history: QuestionHistoryItem[];
  weeksToShow?: number;
}

export function HeatmapCalendar({ history, weeksToShow = 14 }: HeatmapCalendarProps) {
  // Aggregate history by date
  const countsByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of history) {
      if (item.date) {
        map.set(item.date, (map.get(item.date) || 0) + 1);
      }
    }
    return map;
  }, [history]);

  // Generate grid days for the last N weeks ending today
  const { weeks, totalDaysActive } = useMemo(() => {
    const today = new Date();
    const days: Array<{ dateStr: string; count: number; dayOfWeek: number }> = [];

    const totalDays = weeksToShow * 7;
    let activeDays = 0;

    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const count = countsByDate.get(dateStr) || 0;
      if (count > 0) activeDays++;

      days.push({
        dateStr,
        count,
        dayOfWeek: d.getDay(),
      });
    }

    // Partition into columns of 7 days (Sunday to Saturday)
    const weekCols: Array<typeof days> = [];
    for (let i = 0; i < days.length; i += 7) {
      weekCols.push(days.slice(i, i + 7));
    }

    return { weeks: weekCols, totalDaysActive: activeDays };
  }, [countsByDate, weeksToShow]);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-muted ring-1 ring-inset ring-border/60 hover:ring-primary/40";
    if (count < 5) return "bg-primary/25 hover:bg-primary/35";
    if (count < 10) return "bg-primary/50 hover:bg-primary/60";
    if (count < 20) return "bg-primary/75 hover:bg-primary/85";
    return "bg-primary hover:opacity-90";
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-bold">Activity Heatmap</CardTitle>
          <CardDescription>Daily quiz activity over the past {weeksToShow} weeks</CardDescription>
        </div>
        <span className="text-xs text-muted-foreground font-medium">
          {totalDaysActive} active days
        </span>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1.5 min-w-full">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5">
                {week.map((day) => (
                  <Tooltip key={day.dateStr}>
                    <TooltipTrigger asChild>
                      <span
                        role="img"
                        tabIndex={0}
                        className={`w-3.5 h-3.5 rounded-xs transition-colors cursor-pointer border-0 p-0 block ${getColorClass(
                          day.count
                        )}`}
                        aria-label={`${day.dateStr}: ${day.count} questions`}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-xs">
                      <p className="font-semibold">{day.dateStr}</p>
                      <p className="text-muted-foreground">
                        {day.count} {day.count === 1 ? "question" : "questions"} answered
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </div>
      </TooltipProvider>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground pt-1">
        <span>Less</span>
        <div className="w-3 h-3 rounded-xs bg-muted ring-1 ring-inset ring-border/60" />
        <div className="w-3 h-3 rounded-xs bg-primary/25" />
        <div className="w-3 h-3 rounded-xs bg-primary/50" />
        <div className="w-3 h-3 rounded-xs bg-primary/75" />
        <div className="w-3 h-3 rounded-xs bg-primary" />
        <span>More</span>
      </div>
    </Card>
  );
}
