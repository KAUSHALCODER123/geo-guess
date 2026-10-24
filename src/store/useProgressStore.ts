import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  ProgressStore,
  ProgressState,
  StreakData,
  AchievementItem,
  RecordAnswerParams,
  RecordGameEndParams,
  RecordDailyChallengeParams,
} from "@/types";

export const DEFAULT_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "first_win",
    name: "First Step",
    description: "Answer your first question correctly",
    icon: "🎯",
  },
  {
    id: "hot_streak_3",
    name: "On Fire",
    description: "Maintain a 3-day quiz streak",
    icon: "🔥",
  },
  {
    id: "hot_streak_7",
    name: "Unstoppable",
    description: "Maintain a 7-day quiz streak",
    icon: "⚡",
  },
  {
    id: "scholar_50",
    name: "Scholar",
    description: "Answer 50 questions across any mode",
    icon: "📚",
  },
  {
    id: "century_correct",
    name: "Century Club",
    description: "Answer 100 questions correctly",
    icon: "💯",
  },
  {
    id: "globe_trotter",
    name: "Globe Trotter",
    description: "Answer questions across 5 different world regions",
    icon: "🌍",
  },
  {
    id: "games_10",
    name: "Dedicated Explorer",
    description: "Complete 10 quiz games",
    icon: "🏆",
  },
  {
    id: "daily_pioneer",
    name: "Daily Pioneer",
    description: "Complete your first Daily Challenge",
    icon: "🌟",
  },
];

export const INITIAL_PROGRESS_STATE: ProgressState = {
  streak: {
    current: 0,
    best: 0,
    lastActiveDate: null,
  },
  totalGamesPlayed: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  regionAccuracy: {},
  modeAccuracy: {},
  questionHistory: [],
  dailyChallenges: {},
  achievements: DEFAULT_ACHIEVEMENTS,
  _version: 2,
};

function getTodayISODate(): string {
  return new Date().toISOString().split("T")[0];
}

function updateStreak(streak: StreakData, today: string): StreakData {
  if (!streak.lastActiveDate) {
    return {
      current: 1,
      best: Math.max(1, streak.best),
      lastActiveDate: today,
    };
  }

  if (streak.lastActiveDate === today) {
    return streak;
  }

  const lastDate = new Date(streak.lastActiveDate);
  const currentDate = new Date(today);
  const diffTime = currentDate.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    const nextCurrent = streak.current + 1;
    return {
      current: nextCurrent,
      best: Math.max(nextCurrent, streak.best),
      lastActiveDate: today,
    };
  }

  return {
    current: 1,
    best: streak.best,
    lastActiveDate: today,
  };
}

function evaluateAchievements(
  state: ProgressState,
  nowIso = new Date().toISOString()
): AchievementItem[] {
  const currentAchievements = [...state.achievements];
  const regionCount = Object.keys(state.regionAccuracy).length;

  const unlockMap: Record<string, boolean> = {
    first_win: state.totalCorrectAnswers >= 1,
    hot_streak_3: state.streak.current >= 3 || state.streak.best >= 3,
    hot_streak_7: state.streak.current >= 7 || state.streak.best >= 7,
    scholar_50: state.totalQuestionsAnswered >= 50,
    century_correct: state.totalCorrectAnswers >= 100,
    globe_trotter: regionCount >= 5,
    games_10: state.totalGamesPlayed >= 10,
    daily_pioneer: Object.keys(state.dailyChallenges).length >= 1,
  };

  return currentAchievements.map((ach) => {
    if (!ach.unlockedAt && unlockMap[ach.id]) {
      return { ...ach, unlockedAt: nowIso };
    }
    return ach;
  });
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_PROGRESS_STATE,

      recordAnswer: (params: RecordAnswerParams) => {
        const today = getTodayISODate();
        const historyId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

        set((state) => {
          const nextStreak = updateStreak(state.streak, today);
          const nextTotalQuestions = state.totalQuestionsAnswered + 1;
          const nextTotalCorrect = state.totalCorrectAnswers + (params.correct ? 1 : 0);

          // Update mode accuracy
          const prevMode = state.modeAccuracy[params.mode] || { total: 0, correct: 0 };
          const nextModeAccuracy = {
            ...state.modeAccuracy,
            [params.mode]: {
              total: prevMode.total + 1,
              correct: prevMode.correct + (params.correct ? 1 : 0),
            },
          };

          // Update region accuracy if provided
          let nextRegionAccuracy = state.regionAccuracy;
          if (params.region) {
            const prevReg = state.regionAccuracy[params.region] || { total: 0, correct: 0 };
            nextRegionAccuracy = {
              ...state.regionAccuracy,
              [params.region]: {
                total: prevReg.total + 1,
                correct: prevReg.correct + (params.correct ? 1 : 0),
              },
            };
          }

          // Append to history capped to 200 items
          const newHistoryItem = {
            id: historyId,
            date: today,
            countryCode: params.countryCode,
            mode: params.mode,
            correct: params.correct,
          };
          const nextHistory = [newHistoryItem, ...state.questionHistory].slice(0, 200);

          const draftState: ProgressState = {
            ...state,
            streak: nextStreak,
            totalQuestionsAnswered: nextTotalQuestions,
            totalCorrectAnswers: nextTotalCorrect,
            modeAccuracy: nextModeAccuracy,
            regionAccuracy: nextRegionAccuracy,
            questionHistory: nextHistory,
          };

          const nextAchievements = evaluateAchievements(draftState);

          return {
            ...draftState,
            achievements: nextAchievements,
          };
        });
      },

      recordGameEnd: (_params: RecordGameEndParams) => {
        set((state) => {
          const nextState: ProgressState = {
            ...state,
            totalGamesPlayed: state.totalGamesPlayed + 1,
          };
          return {
            ...nextState,
            achievements: evaluateAchievements(nextState),
          };
        });
      },

      recordDailyChallenge: (params: RecordDailyChallengeParams) => {
        set((state) => {
          const completedAt = new Date().toISOString();
          const nextChallenges = {
            ...state.dailyChallenges,
            [params.date]: {
              date: params.date,
              score: params.score,
              total: params.total,
              answers: params.answers,
              completedAt,
            },
          };
          const nextState: ProgressState = {
            ...state,
            dailyChallenges: nextChallenges,
          };
          return {
            ...nextState,
            achievements: evaluateAchievements(nextState),
          };
        });
      },

      checkAchievements: () => {
        set((state) => ({
          achievements: evaluateAchievements(state),
        }));
      },

      resetProgress: () => {
        set(INITIAL_PROGRESS_STATE);
      },

      importProgress: (json: string): boolean => {
        try {
          const parsed = JSON.parse(json);
          if (
            typeof parsed !== "object" ||
            parsed === null ||
            typeof parsed.totalQuestionsAnswered !== "number" ||
            typeof parsed.totalCorrectAnswers !== "number"
          ) {
            return false;
          }

          set({
            streak: parsed.streak || INITIAL_PROGRESS_STATE.streak,
            totalGamesPlayed: Number(parsed.totalGamesPlayed) || 0,
            totalQuestionsAnswered: Number(parsed.totalQuestionsAnswered) || 0,
            totalCorrectAnswers: Number(parsed.totalCorrectAnswers) || 0,
            regionAccuracy: parsed.regionAccuracy || {},
            modeAccuracy: parsed.modeAccuracy || {},
            questionHistory: Array.isArray(parsed.questionHistory)
              ? parsed.questionHistory.slice(0, 200)
              : [],
            dailyChallenges: parsed.dailyChallenges || {},
            achievements: Array.isArray(parsed.achievements)
              ? parsed.achievements
              : DEFAULT_ACHIEVEMENTS,
            _version: 2,
          });

          return true;
        } catch {
          return false;
        }
      },

      exportProgress: (): string => {
        const state = get();
        const exportable: ProgressState = {
          streak: state.streak,
          totalGamesPlayed: state.totalGamesPlayed,
          totalQuestionsAnswered: state.totalQuestionsAnswered,
          totalCorrectAnswers: state.totalCorrectAnswers,
          regionAccuracy: state.regionAccuracy,
          modeAccuracy: state.modeAccuracy,
          questionHistory: state.questionHistory,
          dailyChallenges: state.dailyChallenges,
          achievements: state.achievements,
          _version: state._version,
        };
        return JSON.stringify(exportable, null, 2);
      },
    }),
    {
      name: "flagforge-progress",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const raw = (persistedState && typeof persistedState === "object"
          ? persistedState
          : {}) as Record<string, unknown>;

        if (version === 0 || version === 1) {
          // Migration from v1: normalize achievements and ensure dailyChallenges
          const legacyAchievements = Array.isArray(raw.achievements) ? raw.achievements : [];
          const mergedAchievements = DEFAULT_ACHIEVEMENTS.map((def) => {
            const match = legacyAchievements.find(
              (item: unknown) =>
                item && typeof item === "object" && (item as { id: string }).id === def.id
            );
            return match ? { ...def, ...(match as AchievementItem) } : def;
          });

          return {
            streak:
              raw.streak && typeof raw.streak === "object"
                ? (raw.streak as StreakData)
                : INITIAL_PROGRESS_STATE.streak,
            totalGamesPlayed: Number(raw.totalGamesPlayed) || 0,
            totalQuestionsAnswered: Number(raw.totalQuestionsAnswered) || 0,
            totalCorrectAnswers: Number(raw.totalCorrectAnswers) || 0,
            regionAccuracy: (raw.regionAccuracy as Record<string, { total: number; correct: number }>) || {},
            modeAccuracy: (raw.modeAccuracy as Record<string, { total: number; correct: number }>) || {},
            questionHistory: Array.isArray(raw.questionHistory)
              ? raw.questionHistory.slice(0, 200)
              : [],
            dailyChallenges: (raw.dailyChallenges as Record<string, unknown>) || {},
            achievements: mergedAchievements,
            _version: 2,
          };
        }

        return raw as unknown as ProgressStore;
      },
    }
  )
);
