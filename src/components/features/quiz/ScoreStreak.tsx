"use client";

import React from "react";
import { Flame, Heart, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ScoreStreakProps {
  score: number;
  streak: number;
  multiplier: number;
  livesRemaining?: number | null;
  maxLives?: number | null;
  currentIndex: number;
  totalQuestions: number;
}

export function ScoreStreak({
  score,
  streak,
  multiplier,
  livesRemaining,
  maxLives,
  currentIndex,
  totalQuestions,
}: ScoreStreakProps) {
  const hasLives = livesRemaining !== null && livesRemaining !== undefined && maxLives;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-card/80 backdrop-blur-xs shadow-xs">
      {/* Progress & Lives */}
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold text-foreground">
          <span className="text-muted-foreground font-normal">Question </span>
          <span className="font-mono text-primary font-bold">{currentIndex + 1}</span>
          <span className="text-muted-foreground font-normal"> / {totalQuestions}</span>
        </div>

        {hasLives && (
          <div className="flex items-center gap-1 pl-2 border-l border-border" aria-label={`${livesRemaining} of ${maxLives} lives remaining`}>
            {Array.from({ length: maxLives }).map((_, i) => {
              const isAlive = i < (livesRemaining ?? 0);
              return (
                <Heart
                  key={i}
                  className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isAlive
                      ? "text-rose-500 fill-rose-500 scale-100"
                      : "text-muted-foreground/30 fill-muted-foreground/10 scale-90"
                  )}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Score & Streak */}
      <div className="flex items-center gap-4">
        {/* Streak indicator */}
        <div className="flex items-center gap-1.5" title={`Current Streak: ${streak}`}>
          <div
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all",
              streak >= 3
                ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 animate-pulse"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Flame
              className={cn(
                "w-3.5 h-3.5",
                streak >= 3 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
              )}
            />
            <span>{streak} Streak</span>
          </div>

          {multiplier > 1.0 && (
            <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-primary/15 text-primary border border-primary/20">
              <Zap className="w-3 h-3 fill-primary" />
              <span>{multiplier.toFixed(1)}x</span>
            </div>
          )}
        </div>

        {/* Score */}
        <div className="flex items-center gap-1.5 pl-3 border-l border-border">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span className="font-mono font-bold text-base text-foreground tabular-nums">
            {score.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
