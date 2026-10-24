"use client";

import React from "react";
import { Check, Lock } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AchievementItem } from "@/types/store";

export interface AchievementListProps {
  achievements: AchievementItem[];
}

export function AchievementList({ achievements }: AchievementListProps) {
  const unlockedCount = achievements.filter((a) => Boolean(a.unlockedAt)).length;
  const totalCount = achievements.length;
  const percentUnlocked = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  return (
    <Card className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <span>Achievements</span>
            <Badge variant="secondary" className="font-mono text-xs font-bold">
              {unlockedCount} / {totalCount} ({percentUnlocked}%)
            </Badge>
          </CardTitle>
          <CardDescription>Badges earned from milestones and quiz feats</CardDescription>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map((ach) => {
          const isUnlocked = Boolean(ach.unlockedAt);
          const dateStr = ach.unlockedAt
            ? new Date(ach.unlockedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : null;

          return (
            <div
              key={ach.id}
              className={`flex items-start gap-3.5 p-4 rounded-xl border transition-all ${
                isUnlocked
                  ? "border-amber-500/30 bg-amber-500/5 shadow-xs"
                  : "border-border/60 bg-muted/20"
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl text-2xl shrink-0 ${
                  isUnlocked
                    ? "bg-amber-500/15 shadow-inner ring-1 ring-amber-500/30"
                    : "bg-muted text-muted-foreground grayscale"
                }`}
              >
                {ach.icon || "🏆"}
              </div>

              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm truncate text-foreground flex items-center gap-1.5">
                    <span>{ach.name}</span>
                    {isUnlocked ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
                    )}
                  </h4>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {ach.description}
                </p>

                {isUnlocked && dateStr && (
                  <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 pt-0.5">
                    Unlocked on {dateStr}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
