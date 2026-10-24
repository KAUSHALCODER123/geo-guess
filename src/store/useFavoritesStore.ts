import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FavoritesStore, FavoritesState } from "@/types";

export const INITIAL_FAVORITES_STATE: FavoritesState = {
  favorites: [],
  recentSearches: [],
  _version: 1,
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_FAVORITES_STATE,

      toggleFavorite: (cca3: string) => {
        const upper = cca3.trim().toUpperCase();
        if (!upper) return;

        set((state) => {
          const exists = state.favorites.includes(upper);
          const next = exists
            ? state.favorites.filter((code) => code !== upper)
            : [...state.favorites, upper];
          return { favorites: next };
        });
      },

      isFavorite: (cca3: string): boolean => {
        const upper = cca3.trim().toUpperCase();
        return get().favorites.includes(upper);
      },

      addRecentSearch: (query: string) => {
        const clean = query.trim();
        if (!clean) return;

        set((state) => {
          // Prepend unique search term, max 10
          const filtered = state.recentSearches.filter(
            (item) => item.toLowerCase() !== clean.toLowerCase()
          );
          return {
            recentSearches: [clean, ...filtered].slice(0, 10),
          };
        });
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: "flagforge-favorites",
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: unknown) => {
        const raw = (persistedState && typeof persistedState === "object"
          ? persistedState
          : {}) as Record<string, unknown>;

        return {
          favorites: Array.isArray(raw.favorites) ? raw.favorites.map(String) : [],
          recentSearches: Array.isArray(raw.recentSearches)
            ? raw.recentSearches.map(String).slice(0, 10)
            : [],
          _version: 1,
        };
      },
    }
  )
);
