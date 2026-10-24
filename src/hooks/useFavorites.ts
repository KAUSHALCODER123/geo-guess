"use client";

import { useFavoritesStore } from "@/store/useFavoritesStore";

export interface UseFavoritesResult {
  favorites: string[];
  recentSearches: string[];
  toggleFavorite: (cca3: string) => void;
  isFavorite: (cca3: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

/**
 * Public convenience hook for managing bookmarked countries and search query history.
 */
export function useFavorites(): UseFavoritesResult {
  const favorites = useFavoritesStore((state) => state.favorites);
  const recentSearches = useFavoritesStore((state) => state.recentSearches);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const addRecentSearch = useFavoritesStore((state) => state.addRecentSearch);
  const clearRecentSearches = useFavoritesStore((state) => state.clearRecentSearches);

  return {
    favorites,
    recentSearches,
    toggleFavorite,
    isFavorite,
    addRecentSearch,
    clearRecentSearches,
  };
}
