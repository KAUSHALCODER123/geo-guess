export type ThemeMode = "system" | "light" | "dark";
export type MeasurementUnits = "metric" | "imperial";

// ==========================================
// SETTINGS STORE
// ==========================================

export interface SettingsState {
  theme: ThemeMode;
  sound: boolean;
  reducedMotion: boolean;
  units: MeasurementUnits;
  highContrast: boolean;
  _version: number;
}

export interface SettingsActions {
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
  setSound: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setUnits: (units: MeasurementUnits) => void;
  toggleHighContrast: () => void;
  setHighContrast: (enabled: boolean) => void;
  resetSettings: () => void;
}

export type SettingsStore = SettingsState & SettingsActions;

// ==========================================
// PROGRESS STORE
// ==========================================

export interface StreakData {
  current: number;
  best: number;
  lastActiveDate: string | null;
}

export interface AccuracyStat {
  total: number;
  correct: number;
}

export interface QuestionHistoryItem {
  id: string;
  date: string;
  countryCode: string;
  mode: string;
  correct: boolean;
}

export interface DailyChallengeRecord {
  date: string;
  score: number;
  total: number;
  answers: boolean[];
  completedAt: string;
}

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  unlockedAt?: string;
  icon: string;
}

export interface ProgressState {
  streak: StreakData;
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  regionAccuracy: Record<string, AccuracyStat>;
  modeAccuracy: Record<string, AccuracyStat>;
  questionHistory: QuestionHistoryItem[];
  dailyChallenges: Record<string, DailyChallengeRecord>;
  achievements: AchievementItem[];
  _version: number;
}

export interface RecordAnswerParams {
  countryCode: string;
  mode: string;
  correct: boolean;
  region?: string;
}

export interface RecordGameEndParams {
  mode: string;
  score: number;
  total: number;
}

export interface RecordDailyChallengeParams {
  date: string;
  score: number;
  total: number;
  answers: boolean[];
}

export interface ProgressActions {
  recordAnswer: (params: RecordAnswerParams) => void;
  recordGameEnd: (params: RecordGameEndParams) => void;
  recordDailyChallenge: (params: RecordDailyChallengeParams) => void;
  checkAchievements: () => void;
  resetProgress: () => void;
  importProgress: (json: string) => boolean;
  exportProgress: () => string;
}

export type ProgressStore = ProgressState & ProgressActions;

// ==========================================
// FAVORITES STORE
// ==========================================

export interface FavoritesState {
  favorites: string[];
  recentSearches: string[];
  _version: number;
}

export interface FavoritesActions {
  toggleFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

export type FavoritesStore = FavoritesState & FavoritesActions;
