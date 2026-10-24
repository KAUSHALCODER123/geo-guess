"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, Dumbbell } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { QuestionHistoryItem } from "@/types/store";

export interface WeakestCountriesProps {
  history: QuestionHistoryItem[];
}

export function WeakestCountries({ history }: WeakestCountriesProps) {
  const weakList = useMemo(() => {
    const stats = new Map<string, { code: string; total: number; wrong: number }>();

    for (const item of history) {
      if (!item.countryCode) continue;
      const code = item.countryCode.toUpperCase();
      const curr = stats.get(code) || { code, total: 0, wrong: 0 };
      curr.total += 1;
      if (!item.correct) {
        curr.wrong += 1;
      }
      stats.set(code, curr);
    }

    // Filter to countries with at least 1 wrong answer, sorted by most wrong answers
    return Array.from(stats.values())
      .filter((s) => s.wrong > 0)
      .sort((a, b) => b.wrong - a.wrong || b.wrong / b.total - a.wrong / a.total)
      .slice(0, 6);
  }, [history]);

  return (
    <Card className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>Target Weak Spots</span>
          </CardTitle>
          <CardDescription>Countries you missed most often in recent quizzes</CardDescription>
        </div>

        {weakList.length > 0 && (
          <Button asChild size="sm" variant="accent">
            <Link href="/play?mode=flag_to_country&practice=weak">
              <Dumbbell className="w-4 h-4 mr-1.5" />
              Practice Weak Countries
            </Link>
          </Button>
        )}
      </div>

      {weakList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-border bg-muted/20 space-y-2">
          <ShieldCheck className="w-10 h-10 text-emerald-500" />
          <h4 className="font-semibold text-sm text-foreground">Zero Weak Spots Detected!</h4>
          <p className="text-xs text-muted-foreground max-w-sm">
            Either you haven&apos;t missed any countries yet or your quiz history is pristine. Keep testing your skills!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {weakList.map((item) => {
            const accuracy = Math.round(((item.total - item.wrong) / item.total) * 100);

            return (
              <div
                key={item.code}
                className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs"
              >
                <div className="space-y-1">
                  <span className="font-mono font-bold text-sm tracking-wider text-foreground">
                    {item.code}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    Missed {item.wrong} of {item.total} times
                  </p>
                </div>

                <Badge
                  variant={accuracy < 50 ? "destructive" : "secondary"}
                  className="font-mono text-xs font-semibold"
                >
                  {accuracy}% acc
                </Badge>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
