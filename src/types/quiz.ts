import type { Country } from "./country";

export type GameMode =
  | "flag_to_country"
  | "country_to_flag"
  | "capital"
  | "border"
  | "higher_lower_population"
  | "higher_lower_area"
  | "continent"
  | "daily_challenge";

export type QuizDifficulty = "easy" | "medium" | "hard";

export interface QuizOption {
  id: string;
  label: string;
  flagUrl?: string;
  countryCode?: string;
}

export interface QuizQuestion {
  id: string;
  mode: GameMode;
  targetCountry: Country;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation?: string;
}

export interface QuizAnswerRecord {
  questionId: string;
  countryCode: string;
  selectedOptionId: string;
  correctOptionId: string;
  isCorrect: boolean;
  timeSpentMs?: number;
}

export interface QuizResult {
  mode: GameMode;
  score: number;
  total: number;
  durationMs: number;
  accuracy: number;
  answers: QuizAnswerRecord[];
  timestamp: string;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "streak" | "games" | "accuracy" | "exploration";
  criteria: (stats: {
    streak: number;
    bestStreak: number;
    totalGames: number;
    totalAnswers: number;
    totalCorrect: number;
    overallAccuracy: number;
    uniqueCountriesAnswered: number;
    dailyChallengesCompleted: number;
  }) => boolean;
}
