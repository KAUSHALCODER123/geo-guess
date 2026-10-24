import type { Country } from "@/types/country";
import { mulberry32, shuffle } from "./rng";
import { filterByDifficulty } from "./difficulty";
import {
  generateFlagToCountry,
  generateCountryToCapital,
  generateCapitalToCountry,
  generateHigherLower,
  generateWhichBorders,
  generateMapLocation,
} from "./generator";
import type { Difficulty, Question, QuizMode } from "./types";

export interface GenerateQuizConfig {
  mode: QuizMode;
  count: number;
  difficulty: Difficulty;
  region?: string;
  seed?: number;
}

/**
 * Pure deterministic quiz engine.
 * Generates an array of non-repeating quiz questions given a country dataset and configuration.
 */
export function generateQuiz(
  countries: Country[],
  config: GenerateQuizConfig
): Question[] {
  if (!countries || countries.length === 0) {
    return [];
  }

  const { mode, count, difficulty, region, seed } = config;
  const rng = seed !== undefined ? mulberry32(seed) : Math.random;

  // Build index for border & cca3 lookup
  const countryMap = new Map<string, Country>();
  for (const c of countries) {
    countryMap.set(c.cca3, c);
  }

  // Filter pool by region if specified and not "all"
  let pool = countries;
  if (region && region.toLowerCase() !== "all") {
    const regionFiltered = pool.filter(
      (c) => c.region.toLowerCase() === region.toLowerCase()
    );
    if (regionFiltered.length >= 4) {
      pool = regionFiltered;
    }
  }

  // Filter candidate pool by difficulty
  let eligibleTargets = filterByDifficulty(pool, difficulty);

  // Mode-specific eligibility filters
  if (mode === "country_to_capital" || mode === "capital_to_country") {
    const withCapital = eligibleTargets.filter(
      (c) => c.capital && c.capital.length > 0 && c.capital[0].trim() !== ""
    );
    if (withCapital.length >= count) {
      eligibleTargets = withCapital;
    } else {
      eligibleTargets = pool.filter(
        (c) => c.capital && c.capital.length > 0 && c.capital[0].trim() !== ""
      );
    }
  } else if (mode === "which_borders") {
    const withBorders = eligibleTargets.filter(
      (c) =>
        c.borders &&
        c.borders.length > 0 &&
        c.borders.some((b) => countryMap.has(b))
    );
    if (withBorders.length >= count) {
      eligibleTargets = withBorders;
    } else {
      eligibleTargets = pool.filter(
        (c) =>
          c.borders &&
          c.borders.length > 0 &&
          c.borders.some((b) => countryMap.has(b))
      );
    }
  }

  // Fallback to all countries if eligibleTargets is empty
  if (eligibleTargets.length === 0) {
    eligibleTargets = pool;
  }

  // Shuffle targets deterministically to ensure NO REPEATS
  const shuffledTargets = shuffle(eligibleTargets, rng);
  const targetSelection = shuffledTargets.slice(0, Math.min(count, shuffledTargets.length));

  const questions: Question[] = [];

  for (const target of targetSelection) {
    let question: Question;

    switch (mode) {
      case "flag_to_country":
        question = generateFlagToCountry(target, pool, rng);
        break;

      case "country_to_capital":
        question = generateCountryToCapital(target, pool, rng);
        break;

      case "capital_to_country":
        question = generateCapitalToCountry(target, pool, rng);
        break;

      case "higher_lower":
        question = generateHigherLower(target, pool, rng);
        break;

      case "which_borders":
        question = generateWhichBorders(target, pool, countryMap, rng);
        break;

      case "map_location":
        question = generateMapLocation(target, pool, rng);
        break;

      default:
        question = generateFlagToCountry(target, pool, rng);
        break;
    }

    questions.push(question);
  }

  return questions;
}
