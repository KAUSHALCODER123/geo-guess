import type { Country } from "@/types/country";
import type { Difficulty } from "./types";

/**
 * Iconic countries known worldwide regardless of population.
 */
export const ICONIC_CCA3 = new Set([
  "USA", "GBR", "FRA", "DEU", "ITA", "ESP", "JPN", "CAN", "AUS", "BRA",
  "IND", "CHN", "MEX", "EGY", "RUS",
]);

/**
 * Checks whether a country is an island nation (not landlocked and has no land borders).
 */
export function isIslandNation(country: Country): boolean {
  return !country.landlocked && (!country.borders || country.borders.length === 0);
}

/**
 * Categorizes country difficulty:
 * - Easy: Population > 25M or iconic country
 * - Medium: Population 5M - 25M (and not iconic)
 * - Hard: Population < 5M or island nations
 */
export function getCountryDifficulty(country: Country): "easy" | "medium" | "hard" {
  if (country.population > 25_000_000 || ICONIC_CCA3.has(country.cca3)) {
    return "easy";
  }
  if (country.population >= 5_000_000 && country.population <= 25_000_000) {
    return "medium";
  }
  return "hard";
}

/**
 * Filters a country list by difficulty with graceful fallback if the filtered set is too small.
 */
export function filterByDifficulty(countries: Country[], difficulty: Difficulty): Country[] {
  if (difficulty === "all") return countries;

  const filtered = countries.filter((c) => {
    const diff = getCountryDifficulty(c);
    return diff === difficulty;
  });

  // If filtered set is too small for meaningful questions (need at least 4), fallback to all
  return filtered.length >= 4 ? filtered : countries;
}
