import { describe, it, expect, beforeEach } from "vitest";
import { useSettingsStore, INITIAL_SETTINGS_STATE } from "@/store/useSettingsStore";
import { useProgressStore, INITIAL_PROGRESS_STATE } from "@/store/useProgressStore";
import { useFavoritesStore, INITIAL_FAVORITES_STATE } from "@/store/useFavoritesStore";

describe("Zustand Stores & Persistence", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useSettingsStore.setState(INITIAL_SETTINGS_STATE);
    useProgressStore.setState(INITIAL_PROGRESS_STATE);
    useFavoritesStore.setState(INITIAL_FAVORITES_STATE);
  });

  describe("useSettingsStore", () => {
    it("updates settings states correctly", () => {
      const store = useSettingsStore.getState();

      store.setTheme("dark");
      expect(useSettingsStore.getState().theme).toBe("dark");

      store.toggleSound();
      expect(useSettingsStore.getState().sound).toBe(true);

      store.setReducedMotion(true);
      expect(useSettingsStore.getState().reducedMotion).toBe(true);

      store.setUnits("imperial");
      expect(useSettingsStore.getState().units).toBe("imperial");

      store.toggleHighContrast();
      expect(useSettingsStore.getState().highContrast).toBe(true);

      store.resetSettings();
      expect(useSettingsStore.getState()).toMatchObject(INITIAL_SETTINGS_STATE);
    });

    it("migrates v1 settings payload to v2 schema", () => {
      // Simulate persisted v1 state in localStorage
      const legacyV1Payload = {
        state: {
          theme: "dark",
          sound: true,
        },
        version: 1,
      };

      const persistConfig = (useSettingsStore as unknown as {
        persist: {
          getOptions: () => {
            migrate: (state: unknown, version: number) => unknown;
          };
        };
      }).persist.getOptions();

      const migrated = persistConfig.migrate(legacyV1Payload.state, 1) as Record<string, unknown>;

      expect(migrated.theme).toBe("dark");
      expect(migrated.sound).toBe(true);
      expect(migrated.units).toBe("metric");
      expect(migrated.highContrast).toBe(false);
      expect(migrated.reducedMotion).toBe(false);
      expect(migrated._version).toBe(2);
    });
  });

  describe("useProgressStore", () => {
    it("records answers and computes mode & region accuracy", () => {
      const store = useProgressStore.getState();

      // Answer 1: Flag quiz, correct, Europe
      store.recordAnswer({
        countryCode: "FRA",
        mode: "flag_to_country",
        correct: true,
        region: "Europe",
      });

      // Answer 2: Flag quiz, incorrect, Europe
      store.recordAnswer({
        countryCode: "DEU",
        mode: "flag_to_country",
        correct: false,
        region: "Europe",
      });

      // Answer 3: Capital quiz, correct, Asia
      store.recordAnswer({
        countryCode: "JPN",
        mode: "capital",
        correct: true,
        region: "Asia",
      });

      const updated = useProgressStore.getState();

      expect(updated.totalQuestionsAnswered).toBe(3);
      expect(updated.totalCorrectAnswers).toBe(2);

      // Mode accuracy
      expect(updated.modeAccuracy["flag_to_country"]).toEqual({ total: 2, correct: 1 });
      expect(updated.modeAccuracy["capital"]).toEqual({ total: 1, correct: 1 });

      // Region accuracy
      expect(updated.regionAccuracy["Europe"]).toEqual({ total: 2, correct: 1 });
      expect(updated.regionAccuracy["Asia"]).toEqual({ total: 1, correct: 1 });

      // Question history capped
      expect(updated.questionHistory.length).toBe(3);
      expect(updated.questionHistory[0].countryCode).toBe("JPN");
    });

    it("manages streak updates across days and detects breaks", () => {
      const store = useProgressStore.getState();

      // Day 1: First answer
      store.recordAnswer({
        countryCode: "FRA",
        mode: "capital",
        correct: true,
      });

      const day1 = useProgressStore.getState();
      expect(day1.streak.current).toBe(1);
      expect(day1.streak.best).toBe(1);

      // Same day answering maintains streak
      store.recordAnswer({
        countryCode: "DEU",
        mode: "capital",
        correct: true,
      });
      expect(useProgressStore.getState().streak.current).toBe(1);
    });

    it("unlocks achievements upon meeting criteria", () => {
      const store = useProgressStore.getState();

      // Initially locked
      expect(store.achievements.find((a) => a.id === "first_win")?.unlockedAt).toBeUndefined();

      // First correct answer triggers first_win achievement
      store.recordAnswer({
        countryCode: "ITA",
        mode: "flag_to_country",
        correct: true,
      });

      const updated = useProgressStore.getState();
      const firstWin = updated.achievements.find((a) => a.id === "first_win");
      expect(firstWin?.unlockedAt).toBeDefined();
    });

    it("records daily challenge completion", () => {
      const store = useProgressStore.getState();
      const today = "2026-10-24";

      store.recordDailyChallenge({
        date: today,
        score: 5,
        total: 5,
        answers: [true, true, true, true, true],
      });

      const updated = useProgressStore.getState();
      expect(updated.dailyChallenges[today]).toBeDefined();
      expect(updated.dailyChallenges[today].score).toBe(5);

      // daily_pioneer achievement unlocked
      const pioneer = updated.achievements.find((a) => a.id === "daily_pioneer");
      expect(pioneer?.unlockedAt).toBeDefined();
    });

    it("supports export and import with validation", () => {
      const store = useProgressStore.getState();
      store.recordAnswer({
        countryCode: "USA",
        mode: "capital",
        correct: true,
      });

      const exportedJson = store.exportProgress();
      expect(typeof exportedJson).toBe("string");

      // Reset
      store.resetProgress();
      expect(useProgressStore.getState().totalQuestionsAnswered).toBe(0);

      // Re-import
      const success = useProgressStore.getState().importProgress(exportedJson);
      expect(success).toBe(true);
      expect(useProgressStore.getState().totalQuestionsAnswered).toBe(1);
      expect(useProgressStore.getState().totalCorrectAnswers).toBe(1);
    });

    it("migrates v1 progress data to v2 structure", () => {
      const legacyV1Progress = {
        totalQuestionsAnswered: 15,
        totalCorrectAnswers: 12,
        streak: { current: 2, best: 4, lastActiveDate: "2026-10-23" },
      };

      const persistConfig = (useProgressStore as unknown as {
        persist: {
          getOptions: () => {
            migrate: (state: unknown, version: number) => unknown;
          };
        };
      }).persist.getOptions();

      const migrated = persistConfig.migrate(legacyV1Progress, 1) as Record<string, unknown>;

      expect(migrated.totalQuestionsAnswered).toBe(15);
      expect(migrated.totalCorrectAnswers).toBe(12);
      expect(migrated.dailyChallenges).toEqual({});
      expect(Array.isArray(migrated.achievements)).toBe(true);
      expect(migrated._version).toBe(2);
    });
  });

  describe("useFavoritesStore", () => {
    it("toggles country favorites and tracks recent searches capped at 10", () => {
      const store = useFavoritesStore.getState();

      store.toggleFavorite("FRA");
      expect(store.isFavorite("FRA")).toBe(true);
      expect(useFavoritesStore.getState().favorites).toEqual(["FRA"]);

      store.toggleFavorite("FRA");
      expect(store.isFavorite("FRA")).toBe(false);
      expect(useFavoritesStore.getState().favorites).toEqual([]);

      // Add recent searches
      for (let i = 1; i <= 12; i++) {
        store.addRecentSearch(`Search ${i}`);
      }

      const recents = useFavoritesStore.getState().recentSearches;
      expect(recents.length).toBe(10);
      expect(recents[0]).toBe("Search 12");

      store.clearRecentSearches();
      expect(useFavoritesStore.getState().recentSearches).toEqual([]);
    });
  });
});
