"use client";

import React, { useState, useEffect } from "react";
import { Share2, Clock, Check, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { DailyChallengeRecord } from "@/types/store";

export interface DailyModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: DailyChallengeRecord;
  dayNumber?: number;
}

/**
 * Calculates countdown time string until the next UTC midnight (00:00:00 UTC).
 */
export function getTimeUntilUtcMidnight(): string {
  const now = new Date();
  const nextMidnightUtc = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)
  );
  const diffMs = Math.max(0, nextMidnightUtc.getTime() - now.getTime());

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Formats a Wordle-style shareable result grid.
 */
export function generateShareText(record: DailyChallengeRecord, dayNumber = 1): string {
  const grid = record.answers.map((isCorrect) => (isCorrect ? "🟩" : "🟥")).join("");

  return [
    `FlagForge Daily #${dayNumber} 🌍`,
    `Score: ${record.score}/${record.total} ⭐`,
    grid,
    `https://flagforge.app/daily`,
  ].join("\n");
}

export function DailyModal({ isOpen, onClose, record, dayNumber = 1 }: DailyModalProps) {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(getTimeUntilUtcMidnight());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getTimeUntilUtcMidnight());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = async () => {
    const text = generateShareText(record, dayNumber);
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `FlagForge Daily #${dayNumber}`,
          text,
        });
        return;
      } catch {
        // Fall back to clipboard
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const grid = record.answers.map((isCorrect) => (isCorrect ? "🟩" : "🟥")).join("");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md text-center">
        <DialogHeader className="items-center text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-black">
            Daily Challenge Completed!
          </DialogTitle>
          <DialogDescription>
            You solved today&apos;s global FlagForge challenge.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-5">
          {/* Score overview */}
          <div className="p-4 rounded-xl border border-border bg-muted/40 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="text-3xl font-black font-mono text-foreground">
                {record.score}
              </span>
              <span className="text-xl text-muted-foreground font-mono">
                / {record.total}
              </span>
              <span className="text-xl">⭐</span>
            </div>

            {/* Emoji Grid */}
            <div className="text-2xl tracking-widest font-mono select-all">
              {grid}
            </div>
          </div>

          {/* Countdown to next reset */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>Next challenge in:</span>
            <span className="font-mono font-bold text-foreground tabular-nums">
              {countdown}
            </span>
          </div>

          {/* Share Action */}
          <Button
            onClick={handleShare}
            size="lg"
            className="w-full font-bold"
            leftIcon={copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
          >
            {copied ? "Copied to Clipboard!" : "Share Result"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
