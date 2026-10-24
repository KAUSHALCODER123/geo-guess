"use client";

import React from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimerBarProps {
  timeRemaining: number; // in seconds (can be fractional)
  totalTime: number;     // in seconds
  isPaused?: boolean;
}

export function TimerBar({ timeRemaining, totalTime, isPaused = false }: TimerBarProps) {
  if (totalTime <= 0) return null;

  const percentage = Math.max(0, Math.min(100, (timeRemaining / totalTime) * 100));
  const isUrgent = timeRemaining <= 3 && timeRemaining > 0;
  const isWarning = timeRemaining > 3 && timeRemaining <= totalTime * 0.4;

  let barColor = "bg-primary";
  let textColor = "text-foreground";

  if (isUrgent) {
    barColor = "bg-rose-500";
    textColor = "text-rose-500 font-bold animate-pulse";
  } else if (isWarning) {
    barColor = "bg-amber-500";
    textColor = "text-amber-500 font-medium";
  }

  return (
    <div className="w-full space-y-1.5" role="timer" aria-live="polite">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Timer className={cn("w-3.5 h-3.5", isUrgent && "text-rose-500 animate-spin")} />
          <span>Time Remaining</span>
          {isPaused && (
            <span className="font-semibold text-amber-500 uppercase tracking-wider text-[10px] ml-1">
              (Paused)
            </span>
          )}
        </div>
        <span className={cn("font-mono font-semibold tabular-nums", textColor)}>
          {Math.ceil(timeRemaining)}s
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted/60">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-200 ease-linear",
            barColor,
            isUrgent && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
