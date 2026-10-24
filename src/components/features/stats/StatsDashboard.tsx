"use client";

import React, { useState } from "react";
import {
  Target,
  Flame,
  CalendarCheck,
  Download,
  Upload,
  Trash2,
  HelpCircle,
  Gamepad2,
  FileJson,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useProgressStore } from "@/store/useProgressStore";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Recharts is heavy: load it only when the dashboard renders, not in the route's first bundle.
const chartFallback = () => <Skeleton className="h-80 w-full rounded-xl" />;
const AccuracyChart = dynamic(() => import("./AccuracyChart").then((m) => m.AccuracyChart), {
  ssr: false,
  loading: chartFallback,
});
const RegionRadar = dynamic(() => import("./RegionRadar").then((m) => m.RegionRadar), {
  ssr: false,
  loading: chartFallback,
});
import { HeatmapCalendar } from "./HeatmapCalendar";
import { AchievementList } from "./AchievementList";
import { WeakestCountries } from "./WeakestCountries";

export function StatsDashboard() {
  const store = useProgressStore();

  const [isResetOpen, setIsResetOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // Overall accuracy
  const overallAccuracy =
    store.totalQuestionsAnswered > 0
      ? Math.round((store.totalCorrectAnswers / store.totalQuestionsAnswered) * 100)
      : 0;

  const dailyCount = Object.keys(store.dailyChallenges || {}).length;

  // Handle Export
  const handleExport = () => {
    const jsonStr = store.exportProgress();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `flagforge-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Import
  const handleImportSubmit = () => {
    setImportError(null);
    if (!importJsonText.trim()) {
      setImportError("Please paste valid JSON text.");
      return;
    }
    const success = store.importProgress(importJsonText);
    if (success) {
      setImportSuccess(true);
      setTimeout(() => {
        setIsImportOpen(false);
        setImportSuccess(false);
        setImportJsonText("");
      }, 1200);
    } else {
      setImportError("Invalid FlagForge backup JSON format.");
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* 5 Overview Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <Card className="p-4 flex flex-col justify-between border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Games</span>
            <Gamepad2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-foreground">
              {store.totalGamesPlayed}
            </div>
            <p className="text-[11px] text-muted-foreground">Total games completed</p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Questions</span>
            <HelpCircle className="w-4 h-4 text-sky-500" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-foreground">
              {store.totalQuestionsAnswered}
            </div>
            <p className="text-[11px] text-muted-foreground">
              {store.totalCorrectAnswers} answered correctly
            </p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Accuracy</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-foreground">
              {overallAccuracy}%
            </div>
            <p className="text-[11px] text-muted-foreground">Lifetime accuracy rate</p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between border-border bg-card shadow-xs">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Streaks</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-foreground">
              {store.streak.current} <span className="text-xs text-muted-foreground font-normal">/ {store.streak.best}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Current / Best active days</p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col justify-between border-border bg-card shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Daily</span>
            <CalendarCheck className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-foreground">
              {dailyCount}
            </div>
            <p className="text-[11px] text-muted-foreground">Daily challenges beaten</p>
          </div>
        </Card>
      </div>

      {/* Accuracy Chart & Region Mastery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccuracyChart history={store.questionHistory} />
        <RegionRadar regionAccuracy={store.regionAccuracy} />
      </div>

      {/* Activity Heatmap */}
      <HeatmapCalendar history={store.questionHistory} />

      {/* Target Weak Spots */}
      <WeakestCountries history={store.questionHistory} />

      {/* Achievements Grid */}
      <AchievementList achievements={store.achievements} />

      {/* Progress Data Management Section */}
      <Card className="p-6 border-border bg-muted/20 space-y-4">
        <div>
          <h3 className="text-base font-bold text-foreground">Data Management</h3>
          <p className="text-xs text-muted-foreground">
            Export your statistics, import a previous backup, or reset all saved progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Button
            onClick={handleExport}
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Progress (JSON)
          </Button>

          <Button
            onClick={() => setIsImportOpen(true)}
            variant="outline"
            size="sm"
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Import Progress
          </Button>

          <Button
            onClick={() => setIsResetOpen(true)}
            variant="destructive"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            Reset All Progress
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Dialog */}
      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Reset All Progress?
            </DialogTitle>
            <DialogDescription>
              This will permanently delete all your quiz history, streaks, accuracy stats, and unlocked achievements. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Button variant="ghost" onClick={() => setIsResetOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                store.resetProgress();
                setIsResetOpen(false);
              }}
            >
              Confirm Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-primary" />
              Import Progress Backup
            </DialogTitle>
            <DialogDescription>
              Paste the JSON text from an exported FlagForge backup file.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <textarea
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"totalQuestionsAnswered": 42, ...}'
              rows={8}
              className="w-full p-3 font-mono text-xs rounded-lg border border-border bg-background focus-visible:outline-primary resize-none"
            />

            {importError && (
              <p className="text-xs font-semibold text-rose-500">{importError}</p>
            )}

            {importSuccess && (
              <p className="text-xs font-semibold text-emerald-500">
                Progress successfully imported!
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-border">
            <Button variant="ghost" onClick={() => setIsImportOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleImportSubmit} disabled={importSuccess}>
              Import Backup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
