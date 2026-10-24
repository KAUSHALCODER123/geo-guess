import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SettingsStore, ThemeMode, MeasurementUnits } from "@/types";

export const INITIAL_SETTINGS_STATE = {
  theme: "system" as ThemeMode,
  sound: false,
  reducedMotion: false,
  units: "metric" as MeasurementUnits,
  highContrast: false,
  _version: 2,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...INITIAL_SETTINGS_STATE,

      setTheme: (theme: ThemeMode) => set({ theme }),

      toggleSound: () => set((state) => ({ sound: !state.sound })),

      setSound: (sound: boolean) => set({ sound }),

      setReducedMotion: (reducedMotion: boolean) => set({ reducedMotion }),

      setUnits: (units: MeasurementUnits) => set({ units }),

      toggleHighContrast: () => set((state) => ({ highContrast: !state.highContrast })),

      setHighContrast: (highContrast: boolean) => set({ highContrast }),

      resetSettings: () => set(INITIAL_SETTINGS_STATE),
    }),
    {
      name: "flagforge-settings",
      storage: createJSONStorage(() => localStorage),
      version: 2,
      migrate: (persistedState: unknown, version: number) => {
        const raw = (persistedState && typeof persistedState === "object" ? persistedState : {}) as Record<string, unknown>;

        if (version === 0 || version === 1) {
          // Migration from v1: ensure highContrast, reducedMotion, and valid units
          return {
            ...INITIAL_SETTINGS_STATE,
            theme: raw.theme === "dark" || raw.theme === "light" ? raw.theme : "system",
            sound: Boolean(raw.sound),
            reducedMotion: Boolean(raw.reducedMotion),
            units: raw.units === "imperial" ? "imperial" : "metric",
            highContrast: Boolean(raw.highContrast),
            _version: 2,
          };
        }

        return raw as unknown as SettingsStore;
      },
    }
  )
);
