"use client";

import React, { useEffect } from "react";
import { FlagFill } from "@/components/common/flag-image";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChoiceButton } from "./ChoiceButton";
import type { Question } from "@/lib/quiz/types";

export interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | null;
  isAnswered: boolean;
  onSelectOption: (optionId: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  selectedOptionId,
  isAnswered,
  onSelectOption,
  onNextQuestion,
  isLastQuestion,
}: QuestionCardProps) {
  // Keyboard navigation: 1-4 for options, Space for Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (!isAnswered) {
        const keyNumber = parseInt(e.key, 10);
        if (!isNaN(keyNumber) && keyNumber >= 1 && keyNumber <= question.options.length) {
          e.preventDefault();
          onSelectOption(question.options[keyNumber - 1].id);
        }
      } else {
        if (e.code === "Space" || e.key === "Enter") {
          e.preventDefault();
          onNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnswered, onSelectOption, onNextQuestion, question.options]);

  const selectedOption = question.options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    // CSS entrance animation (replaces framer-motion; disabled for reduced motion).
    <div
        key={question.id}
        className="w-full animate-ff-rise motion-reduce:animate-none"
      >
        <Card className="overflow-hidden border-border bg-card shadow-sm">
          <div className="p-6 md:p-8 space-y-6">
            {/* Visual media header if Flag or Higher/Lower */}
            {question.mode === "flag_to_country" && question.imageUrl && (
              <div className="flex justify-center">
                <div className="relative w-64 h-40 sm:w-72 sm:h-44 rounded-xl overflow-hidden shadow-md border border-border/80 bg-muted/40">
                  <FlagFill
                    src={question.imageUrl}
                    alt="Country Flag"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 256px, 288px"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            )}

            {question.mode === "higher_lower" && question.comparisonCountry && (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-muted/30">
                  <div className="relative w-28 h-18 rounded-md overflow-hidden shadow-xs border border-border">
                    <FlagFill
                      src={question.targetCountry.flags.svg || question.targetCountry.flags.png}
                      alt={question.targetCountry.name.common}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-semibold text-sm text-center">
                    {question.targetCountry.name.common}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-muted/30">
                  <div className="relative w-28 h-18 rounded-md overflow-hidden shadow-xs border border-border">
                    <FlagFill
                      src={
                        question.comparisonCountry.flags.svg ||
                        question.comparisonCountry.flags.png
                      }
                      alt={question.comparisonCountry.name.common}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <span className="font-semibold text-sm text-center">
                    {question.comparisonCountry.name.common}
                  </span>
                </div>
              </div>
            )}

            {/* Prompt text */}
            <div className="text-center space-y-1">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                {question.prompt}
              </h2>
              {!isAnswered && (
                <p className="text-xs text-muted-foreground">
                  Choose an answer using buttons or keys 1–{question.options.length}
                </p>
              )}
            </div>

            {/* Options Grid */}
            <div
              className={
                question.options.length === 2
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
                  : "grid grid-cols-1 sm:grid-cols-2 gap-3"
              }
              role="radiogroup"
              aria-label="Quiz Answer Choices"
            >
              {question.options.map((option, idx) => (
                <ChoiceButton
                  key={option.id}
                  index={idx}
                  label={option.label}
                  flag={option.flag}
                  isSelected={selectedOptionId === option.id}
                  isCorrectAnswer={option.isCorrect}
                  isAnswered={isAnswered}
                  onClick={() => onSelectOption(option.id)}
                />
              ))}
            </div>

            {/* Post-answer explanation feedback bar */}
            {isAnswered && (
              <div className="pt-2 border-t border-border space-y-4 animate-ff-fade motion-reduce:animate-none"
              >
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                    isCorrect
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-100"
                  }`}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p className="text-muted-foreground/90">{question.explanation}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono font-bold">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono font-bold">Enter</kbd> to proceed
                  </span>

                  <Button
                    onClick={onNextQuestion}
                    size="lg"
                    className="ml-auto w-full sm:w-auto"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isLastQuestion ? "View Results" : "Next Question"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
  );
}
