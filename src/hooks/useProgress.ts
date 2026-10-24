"use client";

import { useMemo } from "react";
import { useProgressStore } from "@/store/useProgressStore";
import type {
  StreakData,
  AccuracyStat,
  QuestionHistoryItem,
  DailyChallengeRecord,
  AchievementItem,
  RecordAnswerParams,
  RecordGameEndParams,
  RecordDailyChallengeParams,
} from "@/types";

export interface UseProgressResult {
  streak: StreakData;
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  overallAccuracy: number;
  regionAccuracy: Record<string, AccuracyStat>;
  modeAccuracy: Record<string, AccuracyStat>;
  questionHistory: QuestionHistoryItem[];
  dailyChallenges: Record<string, DailyChallengeRecord>;
  achievements: AchievementItem[];
  unlockedAchievementsCount: number;
  recordAnswer: (params: RecordAnswerParams) => void;
  recordGameEnd: (params: RecordGameEndParams) => void;
  recordDailyChallenge: (params: RecordDailyChallengeParams) => void;
  checkAchievements: () => void;
  resetProgress: () => void;
  importProgress: (json: string) => boolean;
  exportProgress: () => string;
}

/**
 * Public convenience hook providing reactive progress metrics and action dispatchers.
 */
export function useProgress(): UseProgressResult {
  const streak = useProgressStore((state) => state.streak);
  const totalGamesPlayed = useProgressStore((state) => state.totalGamesPlayed);
  const totalQuestionsAnswered = useProgressStore((state) => state.totalQuestionsAnswered);
  const totalCorrectAnswers = useProgressStore((state) => state.totalCorrectAnswers);
  const regionAccuracy = useProgressStore((state) => state.regionAccuracy);
  const modeAccuracy = useProgressStore((state) => state.modeAccuracy);
  const questionHistory = useProgressStore((state) => state.questionHistory);
  const dailyChallenges = useProgressStore((state) => state.dailyChallenges);
  const achievements = useProgressStore((state) => state.achievements);

  const recordAnswer = useProgressStore((state) => state.recordAnswer);
  const recordGameEnd = useProgressStore((state) => state.recordGameEnd);
  const recordDailyChallenge = useProgressStore((state) => state.recordDailyChallenge);
  const checkAchievements = useProgressStore((state) => state.checkAchievements);
  const resetProgress = useProgressStore((state) => state.resetProgress);
  const importProgress = useProgressStore((state) => state.importProgress);
  const exportProgress = useProgressStore((state) => state.exportProgress);

  const overallAccuracy = useMemo(() => {
    if (totalQuestionsAnswered === 0) return 0;
    return Math.round((totalCorrectAnswers / totalQuestionsAnswered) * 1000) / 10;
  }, [totalCorrectAnswers, totalQuestionsAnswered]);

  const unlockedAchievementsCount = useMemo(() => {
    return achievements.filter((a) => Boolean(a.unlockedAt)).length;
  }, [achievements]);

  return {
    streak,
    totalGamesPlayed,
    totalQuestionsAnswered,
    totalCorrectAnswers,
    overallAccuracy,
    regionAccuracy,
    modeAccuracy,
    questionHistory,
    dailyChallenges,
    achievements,
    unlockedAchievementsCount,
    recordAnswer,
    recordGameEnd,
    recordDailyChallenge,
    checkAchievements,
    resetProgress,
    importProgress,
    exportProgress,
  };
}
