"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Target,
  Flame,
  Clock,
  RotateCcw,
  Home,
  BarChart3,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { playVictorySound } from "@/lib/sound";
import type { Answer, Question } from "@/lib/quiz/types";

export interface GameOverReviewProps {
  score: number;
  questions: Question[];
  answers: Answer[];
  durationSeconds: number;
  onPlayAgain: () => void;
  onRetryMissed?: (missedQuestions: Question[]) => void;
}

export function GameOverReview({
  score,
  questions,
  answers,
  durationSeconds,
  onPlayAgain,
  onRetryMissed,
}: GameOverReviewProps) {
  const total = questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  // Compute max streak
  let currentStreak = 0;
  let maxStreak = 0;
  for (const a of answers) {
    if (a.isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) maxStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  // Identify missed questions
  const missedQuestions = questions.filter((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    return !answer || !answer.isCorrect;
  });

  // Confetti on celebration (accuracy >= 80% or 100%)
  useEffect(() => {
    if (accuracy >= 70) {
      playVictorySound();
      try {
        void import("canvas-confetti").then(({ default: confetti }) =>
          confetti({
            particleCount: accuracy === 100 ? 120 : 60,
            spread: 80,
            origin: { y: 0.6 },
          })
        );
      } catch {
        // Safe fallback
      }
    }
  }, [accuracy]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 py-6">
      {/* Hero Completion Card */}
      <Card className="p-8 text-center space-y-6 border-border bg-gradient-to-b from-card to-muted/20 shadow-md">
        <div className="inline-flex p-4 rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5 mx-auto">
          {accuracy === 100 ? (
            <Sparkles className="w-12 h-12 text-amber-500 animate-pulse" />
          ) : (
            <Trophy className="w-12 h-12 text-primary" />
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            {accuracy === 100
              ? "Flawless Victory!"
              : accuracy >= 80
              ? "Outstanding Performance!"
              : accuracy >= 50
              ? "Good Effort!"
              : "Keep Practicing!"}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            You completed the quiz with <span className="font-semibold text-foreground">{accuracy}% accuracy</span>.
          </p>
        </div>

        {/* 4 Stat Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-xs flex flex-col items-center">
            <Trophy className="w-5 h-5 text-amber-500 mb-1.5" />
            <span className="text-2xl font-black font-mono text-foreground">{score.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Score</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-xs flex flex-col items-center">
            <Target className="w-5 h-5 text-emerald-500 mb-1.5" />
            <span className="text-2xl font-black font-mono text-foreground">{accuracy}%</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Accuracy</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-xs flex flex-col items-center">
            <Flame className="w-5 h-5 text-orange-500 mb-1.5" />
            <span className="text-2xl font-black font-mono text-foreground">{maxStreak}</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Max Streak</span>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card/60 backdrop-blur-xs flex flex-col items-center">
            <Clock className="w-5 h-5 text-sky-500 mb-1.5" />
            <span className="text-2xl font-black font-mono text-foreground">{formatDuration(durationSeconds)}</span>
            <span className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Time Taken</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-border">
          <Button
            onClick={onPlayAgain}
            size="lg"
            variant="default"
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Play Again
          </Button>

          {missedQuestions.length > 0 && onRetryMissed && (
            <Button
              onClick={() => onRetryMissed(missedQuestions)}
              size="lg"
              variant="secondary"
              leftIcon={<RotateCcw className="w-4 h-4 text-rose-500" />}
            >
              Retry Missed Questions ({missedQuestions.length})
            </Button>
          )}

          <Button asChild size="lg" variant="outline">
            <Link href="/stats">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Statistics
            </Link>
          </Button>

          <Button asChild size="lg" variant="ghost">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Link>
          </Button>
        </div>
      </Card>

      {/* Comprehensive Question Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <span>Detailed Review</span>
            <Badge variant="outline" className="font-mono text-xs">
              {correctCount} / {total} Correct
            </Badge>
          </h2>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Correct
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Missed
            </span>
          </div>
        </div>

        <div className="grid gap-3">
          {questions.map((q, idx) => {
            const ans = answers.find((a) => a.questionId === q.id);
            const isCorrect = ans?.isCorrect ?? false;
            const selectedOpt = q.options.find((o) => o.id === ans?.selectedOptionId);
            const correctOpt = q.options.find((o) => o.isCorrect);

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-500" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-muted-foreground">
                          #{idx + 1}
                        </span>
                        {q.imageUrl && (
                          <div className="relative w-6 h-4 rounded overflow-hidden border border-border shrink-0">
                            <Image
                              src={q.imageUrl}
                              alt=""
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}
                        <span className="font-semibold text-sm text-foreground">
                          {q.prompt}
                        </span>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-0.5 pt-1">
                        {!isCorrect && (
                          <p>
                            <span className="font-medium text-rose-600 dark:text-rose-400">Your Answer: </span>
                            {selectedOpt?.label || "Timed Out"}
                          </p>
                        )}
                        <p>
                          <span className="font-medium text-emerald-600 dark:text-emerald-400">Correct Answer: </span>
                          <span className="font-semibold text-foreground">{correctOpt?.label}</span>
                        </p>
                        <p className="text-muted-foreground italic pt-0.5">{q.explanation}</p>
                      </div>
                    </div>
                  </div>

                  {ans && (
                    <div className="sm:text-right shrink-0 font-mono text-xs text-muted-foreground self-end sm:self-auto">
                      <span className="font-bold text-foreground">+{ans.pointsEarned} pts</span>
                      {ans.timeRemaining > 0 && (
                        <span className="block text-[11px] opacity-75">{ans.timeRemaining}s left</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
