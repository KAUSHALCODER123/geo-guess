/**
 * Quiz scoring engine with streak multipliers and speed bonuses.
 */

export interface ScoreCalculationInput {
  isCorrect: boolean;
  timeRemaining: number; // in seconds, 0 if untimed
  streak: number;        // current streak before or during this answer
  basePoints?: number;   // default 100
}

export interface ScoreResult {
  pointsEarned: number;
  speedBonus: number;
  multiplier: number;
  newStreak: number;
}

/**
 * Calculates streak multiplier:
 * Starts at 1.0x, increases with consecutive correct answers up to 3.0x at 5 streak.
 */
export function calculateStreakMultiplier(streak: number): number {
  if (streak <= 1) return 1.0;
  if (streak === 2) return 1.5;
  if (streak === 3) return 2.0;
  if (streak === 4) return 2.5;
  return 3.0; // 5 or higher capped at 3.0x
}

/**
 * Computes points earned for a single answer:
 * Formula: (base points + remaining seconds * 10) * streakMultiplier
 * Incorrect answers yield 0 points and reset streak to 0.
 */
export function calculateScore(input: ScoreCalculationInput): ScoreResult {
  const { isCorrect, timeRemaining, streak, basePoints = 100 } = input;

  if (!isCorrect) {
    return {
      pointsEarned: 0,
      speedBonus: 0,
      multiplier: 1.0,
      newStreak: 0,
    };
  }

  const newStreak = streak + 1;
  const multiplier = calculateStreakMultiplier(newStreak);
  const remainingSeconds = Math.max(0, Math.floor(timeRemaining));
  const speedBonus = remainingSeconds * 10;
  const pointsEarned = Math.round((basePoints + speedBonus) * multiplier);

  return {
    pointsEarned,
    speedBonus,
    multiplier,
    newStreak,
  };
}

/**
 * Computes aggregate summary statistics for a completed quiz session.
 */
export function calculateQuizSummary(
  answers: Array<{ isCorrect: boolean; pointsEarned: number; timeRemaining: number }>
) {
  const total = answers.length;
  const correct = answers.filter((a) => a.isCorrect).length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const totalScore = answers.reduce((acc, curr) => acc + curr.pointsEarned, 0);

  let currentStreak = 0;
  let maxStreak = 0;
  for (const a of answers) {
    if (a.isCorrect) {
      currentStreak++;
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }
  }

  return {
    total,
    correct,
    accuracy,
    totalScore,
    maxStreak,
  };
}
