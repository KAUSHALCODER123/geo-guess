import type { Country } from "@/types/country";
export type { Country };

export type QuizMode =
  | "flag_to_country"
  | "country_to_capital"
  | "capital_to_country"
  | "higher_lower"
  | "which_borders"
  | "map_location";

export type Difficulty = "all" | "easy" | "medium" | "hard";

export interface QuestionOption {
  id: string;
  label: string;
  isCorrect: boolean;
  flag?: string;
  metadata?: Record<string, unknown>;
}

export interface Question {
  id: string;
  mode: QuizMode;
  prompt: string;
  targetCountry: Country;
  options: QuestionOption[];
  explanation: string;
  comparisonCountry?: Country;
  imageUrl?: string;
  metadata?: {
    metric?: "population" | "area";
    targetValue?: number;
    comparisonValue?: number;
    subregion?: string;
    borderCountries?: string[];
    [key: string]: unknown;
  };
}

export interface Answer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeRemaining: number;
  pointsEarned: number;
}

export interface GameState {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
  score: number;
  streak: number;
  multiplier: number;
  livesRemaining: number | null;
  maxLives: number | null;
  isPaused: boolean;
  isFinished: boolean;
  startTime: number;
  timeRemaining: number;
}

export interface QuizConfig {
  mode: QuizMode;
  count: number;
  difficulty: Difficulty;
  region?: string;
  seed?: number;
  timerSeconds?: number;
  lives?: number | null;
}
