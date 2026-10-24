"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import type { ThemeMode, MeasurementUnits } from "@/types";

export interface UseSettingsResult {
  theme: ThemeMode;
  sound: boolean;
  reducedMotion: boolean;
  units: MeasurementUnits;
  highContrast: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleSound: () => void;
  setSound: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setUnits: (units: MeasurementUnits) => void;
  toggleHighContrast: () => void;
  setHighContrast: (enabled: boolean) => void;
  resetSettings: () => void;
}

/**
 * Public convenience hook for application user preferences.
 */
export function useSettings(): UseSettingsResult {
  const theme = useSettingsStore((state) => state.theme);
  const sound = useSettingsStore((state) => state.sound);
  const reducedMotion = useSettingsStore((state) => state.reducedMotion);
  const units = useSettingsStore((state) => state.units);
  const highContrast = useSettingsStore((state) => state.highContrast);

  const setTheme = useSettingsStore((state) => state.setTheme);
  const toggleSound = useSettingsStore((state) => state.toggleSound);
  const setSound = useSettingsStore((state) => state.setSound);
  const setReducedMotion = useSettingsStore((state) => state.setReducedMotion);
  const setUnits = useSettingsStore((state) => state.setUnits);
  const toggleHighContrast = useSettingsStore((state) => state.toggleHighContrast);
  const setHighContrast = useSettingsStore((state) => state.setHighContrast);
  const resetSettings = useSettingsStore((state) => state.resetSettings);

  return {
    theme,
    sound,
    reducedMotion,
    units,
    highContrast,
    setTheme,
    toggleSound,
    setSound,
    setReducedMotion,
    setUnits,
    toggleHighContrast,
    setHighContrast,
    resetSettings,
  };
}
