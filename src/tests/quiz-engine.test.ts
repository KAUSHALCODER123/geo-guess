import { describe, it, expect } from "vitest";
import type { Country } from "@/types/country";
import {
  mulberry32,
  stringToSeed,
  shuffle,
  generateQuiz,
  calculateScore,
  calculateStreakMultiplier,
  calculateQuizSummary,
  selectPlausibleDistractors,
  filterByDifficulty,
  getCountryDifficulty,
} from "@/lib/quiz";

// Realistic country test fixtures
const testCountries: Country[] = [
  {
    cca3: "FRA",
    cca2: "FR",
    name: { common: "France", official: "French Republic" },
    capital: ["Paris"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { fra: "French" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["DEU", "BEL", "ESP", "ITA", "CHE"],
    population: 67_000_000,
    area: 551695,
    flags: { png: "https://flagcdn.com/w320/fr.png", svg: "https://flagcdn.com/fr.svg" },
    latlng: [46, 2],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+33"],
  },
  {
    cca3: "DEU",
    cca2: "DE",
    name: { common: "Germany", official: "Federal Republic of Germany" },
    capital: ["Berlin"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { deu: "German" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["FRA", "BEL", "CHE", "AUT", "POL", "DNK", "NLD"],
    population: 83_000_000,
    area: 357022,
    flags: { png: "https://flagcdn.com/w320/de.png", svg: "https://flagcdn.com/de.svg" },
    latlng: [51, 9],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+49"],
  },
  {
    cca3: "BEL",
    cca2: "BE",
    name: { common: "Belgium", official: "Kingdom of Belgium" },
    capital: ["Brussels"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { nld: "Dutch", fra: "French", deu: "German" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["FRA", "DEU", "NLD"],
    population: 11_500_000,
    area: 30528,
    flags: { png: "https://flagcdn.com/w320/be.png", svg: "https://flagcdn.com/be.svg" },
    latlng: [50.8, 4.3],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+32"],
  },
  {
    cca3: "NLD",
    cca2: "NL",
    name: { common: "Netherlands", official: "Kingdom of the Netherlands" },
    capital: ["Amsterdam"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { nld: "Dutch" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["DEU", "BEL"],
    population: 17_500_000,
    area: 41850,
    flags: { png: "https://flagcdn.com/w320/nl.png", svg: "https://flagcdn.com/nl.svg" },
    latlng: [52.3, 4.9],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+31"],
  },
  {
    cca3: "ITA",
    cca2: "IT",
    name: { common: "Italy", official: "Italian Republic" },
    capital: ["Rome"],
    region: "Europe",
    subregion: "Southern Europe",
    languages: { ita: "Italian" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["FRA", "CHE", "AUT"],
    population: 59_000_000,
    area: 301340,
    flags: { png: "https://flagcdn.com/w320/it.png", svg: "https://flagcdn.com/it.svg" },
    latlng: [42.8, 12.5],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+39"],
  },
  {
    cca3: "ESP",
    cca2: "ES",
    name: { common: "Spain", official: "Kingdom of Spain" },
    capital: ["Madrid"],
    region: "Europe",
    subregion: "Southern Europe",
    languages: { spa: "Spanish" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    borders: ["FRA", "PRT"],
    population: 47_000_000,
    area: 505990,
    flags: { png: "https://flagcdn.com/w320/es.png", svg: "https://flagcdn.com/es.svg" },
    latlng: [40.4, -3.7],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+34"],
  },
  {
    cca3: "JPN",
    cca2: "JP",
    name: { common: "Japan", official: "Japan" },
    capital: ["Tokyo"],
    region: "Asia",
    subregion: "Eastern Asia",
    languages: { jpn: "Japanese" },
    currencies: { JPY: { name: "Japanese yen", symbol: "¥" } },
    borders: [],
    population: 125_000_000,
    area: 377975,
    flags: { png: "https://flagcdn.com/w320/jp.png", svg: "https://flagcdn.com/jp.svg" },
    latlng: [36, 138],
    timezones: ["UTC+09:00"],
    continents: ["Asia"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+81"],
  },
  {
    cca3: "KOR",
    cca2: "KR",
    name: { common: "South Korea", official: "Republic of Korea" },
    capital: ["Seoul"],
    region: "Asia",
    subregion: "Eastern Asia",
    languages: { kor: "Korean" },
    currencies: { KRW: { name: "South Korean won", symbol: "₩" } },
    borders: ["PRK"],
    population: 51_000_000,
    area: 100210,
    flags: { png: "https://flagcdn.com/w320/kr.png", svg: "https://flagcdn.com/kr.svg" },
    latlng: [37, 127.5],
    timezones: ["UTC+09:00"],
    continents: ["Asia"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+82"],
  },
  {
    cca3: "ISL",
    cca2: "IS",
    name: { common: "Iceland", official: "Iceland" },
    capital: ["Reykjavik"],
    region: "Europe",
    subregion: "Northern Europe",
    languages: { isl: "Icelandic" },
    currencies: { ISK: { name: "Icelandic króna", symbol: "kr" } },
    borders: [],
    population: 370_000,
    area: 103000,
    flags: { png: "https://flagcdn.com/w320/is.png", svg: "https://flagcdn.com/is.svg" },
    latlng: [65, -18],
    timezones: ["UTC+00:00"],
    continents: ["Europe"],
    landlocked: false,
    unMember: true,
    callingCodes: ["+354"],
  },
  {
    cca3: "CHE",
    cca2: "CH",
    name: { common: "Switzerland", official: "Swiss Confederation" },
    capital: ["Bern"],
    region: "Europe",
    subregion: "Western Europe",
    languages: { deu: "German", fra: "French", ita: "Italian" },
    currencies: { CHF: { name: "Swiss franc", symbol: "CHF" } },
    borders: ["FRA", "DEU", "ITA", "AUT"],
    population: 8_700_000,
    area: 41284,
    flags: { png: "https://flagcdn.com/w320/ch.png", svg: "https://flagcdn.com/ch.svg" },
    latlng: [47, 8],
    timezones: ["UTC+01:00"],
    continents: ["Europe"],
    landlocked: true,
    unMember: true,
    callingCodes: ["+41"],
  },
];

describe("RNG & Determinism", () => {
  it("mulberry32 generates deterministic float sequences for a seed", () => {
    const rng1 = mulberry32(42);
    const rng2 = mulberry32(42);

    const seq1 = [rng1(), rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2(), rng2()];

    expect(seq1).toEqual(seq2);
    expect(seq1[0]).toBeGreaterThanOrEqual(0);
    expect(seq1[0]).toBeLessThan(1);
  });

  it("stringToSeed maps identical strings to identical integers", () => {
    const s1 = stringToSeed("2026-10-24");
    const s2 = stringToSeed("2026-10-24");
    const s3 = stringToSeed("2026-10-25");

    expect(s1).toBe(s2);
    expect(s1).not.toBe(s3);
  });

  it("shuffle with seeded mulberry32 is reproducible", () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    const shuf1 = shuffle(arr, mulberry32(999));
    const shuf2 = shuffle(arr, mulberry32(999));

    expect(shuf1).toEqual(shuf2);
    expect(shuf1).toHaveLength(arr.length);
  });
});

describe("Plausible Distractor Selection", () => {
  it("prefers countries in the same subregion over global random", () => {
    const target = testCountries.find((c) => c.cca3 === "FRA")!; // Western Europe
    const distractors = selectPlausibleDistractors({
      targetCountry: target,
      pool: testCountries,
      count: 3,
      rng: mulberry32(123),
    });

    expect(distractors).toHaveLength(3);
    // Western Europe countries in test pool: DEU, BEL, NLD, CHE
    for (const d of distractors) {
      expect(d.cca3).not.toBe(target.cca3);
      expect(d.subregion).toBe("Western Europe");
    }
  });

  it("falls back to same region when subregion runs out", () => {
    const target = testCountries.find((c) => c.cca3 === "ISL")!; // Northern Europe (only 1 in pool)
    const distractors = selectPlausibleDistractors({
      targetCountry: target,
      pool: testCountries,
      count: 3,
      rng: mulberry32(555),
    });

    expect(distractors).toHaveLength(3);
    for (const d of distractors) {
      expect(d.cca3).not.toBe("ISL");
      expect(d.region).toBe("Europe");
    }
  });

  it("contains exactly 3 distinct distractors plus target in generated question", () => {
    const quiz = generateQuiz(testCountries, {
      mode: "flag_to_country",
      count: 5,
      difficulty: "all",
      seed: 42,
    });

    for (const q of quiz) {
      expect(q.options).toHaveLength(4);
      const correct = q.options.filter((o) => o.isCorrect);
      expect(correct).toHaveLength(1);
      const ids = new Set(q.options.map((o) => o.id));
      expect(ids.size).toBe(4);
    }
  });
});

describe("Quiz Engine Determinism & Uniqueness", () => {
  it("generates 100% identical questions given identical seed", () => {
    const quizA = generateQuiz(testCountries, {
      mode: "flag_to_country",
      count: 5,
      difficulty: "all",
      seed: 777,
    });

    const quizB = generateQuiz(testCountries, {
      mode: "flag_to_country",
      count: 5,
      difficulty: "all",
      seed: 777,
    });

    expect(quizA.length).toBe(quizB.length);
    for (let i = 0; i < quizA.length; i++) {
      expect(quizA[i].targetCountry.cca3).toBe(quizB[i].targetCountry.cca3);
      expect(quizA[i].prompt).toBe(quizB[i].prompt);
      expect(quizA[i].options.map((o) => o.id)).toEqual(
        quizB[i].options.map((o) => o.id)
      );
    }
  });

  it("ensures no duplicate target countries in a single quiz session", () => {
    const quiz = generateQuiz(testCountries, {
      mode: "country_to_capital",
      count: 8,
      difficulty: "all",
      seed: 1234,
    });

    const targets = quiz.map((q) => q.targetCountry.cca3);
    const uniqueTargets = new Set(targets);
    expect(uniqueTargets.size).toBe(targets.length);
  });

  it("supports all required quiz modes", () => {
    const modes = [
      "flag_to_country",
      "country_to_capital",
      "capital_to_country",
      "higher_lower",
      "which_borders",
      "map_location",
    ] as const;

    for (const mode of modes) {
      const quiz = generateQuiz(testCountries, {
        mode,
        count: 3,
        difficulty: "all",
        seed: 888,
      });

      expect(quiz.length).toBeGreaterThan(0);
      for (const q of quiz) {
        expect(q.mode).toBe(mode);
        expect(q.prompt).toBeTruthy();
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        const correctCount = q.options.filter((o) => o.isCorrect).length;
        expect(correctCount).toBe(1);
      }
    }
  });
});

describe("Difficulty Filtering", () => {
  it("classifies easy, medium, and hard correctly", () => {
    const fra = testCountries.find((c) => c.cca3 === "FRA")!; // pop 67M
    const bel = testCountries.find((c) => c.cca3 === "BEL")!; // pop 11.5M
    const isl = testCountries.find((c) => c.cca3 === "ISL")!; // pop 370k, island

    expect(getCountryDifficulty(fra)).toBe("easy");
    expect(getCountryDifficulty(bel)).toBe("medium");
    expect(getCountryDifficulty(isl)).toBe("hard");
  });

  it("filters country pool by difficulty", () => {
    const easyPool = filterByDifficulty(testCountries, "easy");
    for (const c of easyPool) {
      expect(c.population > 25_000_000 || c.cca3 === "FRA" || c.cca3 === "DEU").toBe(true);
    }
  });
});

describe("Scoring Engine", () => {
  it("gives 0 points and resets streak on incorrect answer", () => {
    const res = calculateScore({
      isCorrect: false,
      timeRemaining: 10,
      streak: 4,
    });

    expect(res.pointsEarned).toBe(0);
    expect(res.newStreak).toBe(0);
    expect(res.multiplier).toBe(1.0);
  });

  it("computes base points and speed bonus with streak multiplier", () => {
    // Answer at 10s remaining, streak goes from 0 to 1 -> multiplier 1.0
    const res1 = calculateScore({
      isCorrect: true,
      timeRemaining: 10,
      streak: 0,
    });
    // Base 100 + (10 * 10) = 200 * 1.0 = 200
    expect(res1.pointsEarned).toBe(200);
    expect(res1.newStreak).toBe(1);
    expect(res1.multiplier).toBe(1.0);

    // Answer at 5s remaining, streak goes from 4 to 5 -> multiplier 3.0 (cap)
    const res5 = calculateScore({
      isCorrect: true,
      timeRemaining: 5,
      streak: 4,
    });
    // Base 100 + (5 * 10) = 150 * 3.0 = 450
    expect(res5.pointsEarned).toBe(450);
    expect(res5.newStreak).toBe(5);
    expect(res5.multiplier).toBe(3.0);
  });

  it("streak multiplier caps at 3.0x", () => {
    expect(calculateStreakMultiplier(1)).toBe(1.0);
    expect(calculateStreakMultiplier(2)).toBe(1.5);
    expect(calculateStreakMultiplier(3)).toBe(2.0);
    expect(calculateStreakMultiplier(4)).toBe(2.5);
    expect(calculateStreakMultiplier(5)).toBe(3.0);
    expect(calculateStreakMultiplier(10)).toBe(3.0);
  });

  it("calculateQuizSummary computes accuracy and max streak", () => {
    const answers = [
      { isCorrect: true, pointsEarned: 100, timeRemaining: 5 },
      { isCorrect: true, pointsEarned: 150, timeRemaining: 6 },
      { isCorrect: false, pointsEarned: 0, timeRemaining: 0 },
      { isCorrect: true, pointsEarned: 100, timeRemaining: 4 },
      { isCorrect: true, pointsEarned: 150, timeRemaining: 5 },
      { isCorrect: true, pointsEarned: 200, timeRemaining: 6 },
    ];

    const summary = calculateQuizSummary(answers);
    expect(summary.total).toBe(6);
    expect(summary.correct).toBe(5);
    expect(summary.accuracy).toBe(83); // 5/6 = 83%
    expect(summary.maxStreak).toBe(3);
    expect(summary.totalScore).toBe(700);
  });
});
