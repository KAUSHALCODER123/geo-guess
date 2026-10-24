"use client";

import * as React from "react";
import confetti from "canvas-confetti";

export interface ConfettiBurstOptions {
  particleCount?: number;
  spread?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}

/**
 * Programmatic confetti burst that respects user's motion preferences.
 */
export function fireConfetti(options?: ConfettiBurstOptions) {
  if (typeof window === "undefined") return;

  // Respect reduced motion preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    // Suppress heavy canvas particle animation
    return;
  }

  // Oceanic indigo, sky blue, terracotta, and amber celebration palette
  const defaultColors = ["#0284c7", "#38bdf8", "#ea580c", "#f59e0b", "#10b981"];

  confetti({
    particleCount: options?.particleCount ?? 80,
    spread: options?.spread ?? 70,
    origin: options?.origin ?? { y: 0.6 },
    colors: options?.colors ?? defaultColors,
    disableForReducedMotion: true,
  });
}

/**
 * Declarative component that fires confetti on mount (or when `trigger` changes).
 */
export function ConfettiBurst({
  trigger = true,
  options,
}: {
  trigger?: boolean;
  options?: ConfettiBurstOptions;
}) {
  React.useEffect(() => {
    if (trigger) {
      fireConfetti(options);
    }
  }, [trigger, options]);

  return null;
}
