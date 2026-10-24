"use client";

import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChoiceButtonProps {
  index: number;
  label: string;
  flag?: string;
  isSelected: boolean;
  isCorrectAnswer?: boolean;
  isAnswered: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export function ChoiceButton({
  index,
  label,
  flag,
  isSelected,
  isCorrectAnswer,
  isAnswered,
  disabled = false,
  onClick,
}: ChoiceButtonProps) {
  const shortcutKey = index + 1;

  let stateClasses = "border-border bg-card hover:border-primary/50 hover:bg-muted/50 text-foreground";
  let icon = null;

  if (isAnswered) {
    if (isCorrectAnswer) {
      stateClasses = "border-emerald-500 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 font-semibold shadow-sm shadow-emerald-500/20";
      icon = <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
    } else if (isSelected && !isCorrectAnswer) {
      stateClasses = "border-rose-500 bg-rose-500/15 text-rose-950 dark:text-rose-100 shadow-sm shadow-rose-500/20";
      icon = <X className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
    } else {
      stateClasses = "border-border/60 bg-muted/20 opacity-60 text-muted-foreground";
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isAnswered}
      aria-label={`Option ${shortcutKey}: ${label}`}
      className={cn(
        "group relative flex items-center justify-between gap-3 w-full p-4 rounded-xl border text-left font-medium transition-all duration-150 select-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:scale-[0.99]",
        disabled && !isAnswered && "opacity-50 cursor-not-allowed",
        stateClasses
      )}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <span
          className={cn(
            "flex items-center justify-center w-7 h-7 rounded-lg text-xs font-mono font-bold shrink-0 transition-colors",
            isAnswered && isCorrectAnswer
              ? "bg-emerald-500 text-white"
              : isAnswered && isSelected
              ? "bg-rose-500 text-white"
              : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          )}
        >
          {shortcutKey}
        </span>

        {flag && (
          <div className="relative w-7 h-5 shrink-0 overflow-hidden rounded shadow-xs border border-border/40">
            <Image
              src={flag}
              alt=""
              fill
              className="object-cover"
              sizes="30px"
              unoptimized
            />
          </div>
        )}

        <span className="truncate text-base leading-snug">{label}</span>
      </div>

      <div className="flex items-center shrink-0 ml-2">
        {icon}
      </div>
    </button>
  );
}
