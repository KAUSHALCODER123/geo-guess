import type { Country } from "@/types/country";
import { shuffle, sample } from "./rng";
import { selectPlausibleDistractors } from "./distractors";
import type { Question, QuestionOption } from "./types";

const ALL_REGIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

/**
 * 1) Flag -> Country
 * Displays flag, 4 country name choices.
 */
export function generateFlagToCountry(
  target: Country,
  pool: Country[],
  rng: () => number
): Question {
  const distractors = selectPlausibleDistractors({
    targetCountry: target,
    pool,
    count: 3,
    rng,
  });

  const correctOption: QuestionOption = {
    id: target.cca3,
    label: target.name.common,
    isCorrect: true,
    flag: target.flags?.svg || target.flags?.png,
  };

  const distractorOptions: QuestionOption[] = distractors.map((d) => ({
    id: d.cca3,
    label: d.name.common,
    isCorrect: false,
    flag: d.flags?.svg || d.flags?.png,
  }));

  const options = shuffle([correctOption, ...distractorOptions], rng);

  const capital = target.capital?.[0] ? ` Capital: ${target.capital[0]}.` : "";
  const explanation = `This flag belongs to ${target.name.common} in ${target.region}.${capital}`;

  return {
    id: `flag_${target.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "flag_to_country",
    prompt: "Which country does this flag belong to?",
    targetCountry: target,
    options,
    explanation,
    imageUrl: target.flags?.svg || target.flags?.png,
  };
}

/**
 * 2) Country -> Capital
 * Displays country, 4 capital choices.
 */
export function generateCountryToCapital(
  target: Country,
  pool: Country[],
  rng: () => number
): Question {
  const targetCapital = target.capital?.[0] || "Unknown Capital";

  // Filter pool for countries with valid capitals not matching target capital
  const distractors = selectPlausibleDistractors({
    targetCountry: target,
    pool,
    count: 3,
    rng,
    filterFn: (c) =>
      Boolean(c.capital?.[0] && c.capital[0].trim().toLowerCase() !== targetCapital.trim().toLowerCase()),
  });

  const correctOption: QuestionOption = {
    id: target.cca3,
    label: targetCapital,
    isCorrect: true,
  };

  const usedCapitals = new Set<string>([targetCapital.toLowerCase()]);
  const distractorOptions: QuestionOption[] = [];

  for (const d of distractors) {
    const cap = d.capital[0];
    if (!usedCapitals.has(cap.toLowerCase())) {
      usedCapitals.add(cap.toLowerCase());
      distractorOptions.push({
        id: d.cca3,
        label: cap,
        isCorrect: false,
      });
    }
  }

  // If duplicate capitals were filtered, fill up to 3 from pool
  if (distractorOptions.length < 3) {
    const backupCapitals = pool
      .filter((c) => c.capital?.[0] && !usedCapitals.has(c.capital[0].toLowerCase()))
      .map((c) => ({ id: c.cca3, label: c.capital[0] }));
    const shuffledBackup = shuffle(backupCapitals, rng);
    for (const b of shuffledBackup) {
      if (distractorOptions.length >= 3) break;
      usedCapitals.add(b.label.toLowerCase());
      distractorOptions.push({
        id: b.id,
        label: b.label,
        isCorrect: false,
      });
    }
  }

  const options = shuffle([correctOption, ...distractorOptions], rng);

  return {
    id: `capital_${target.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "country_to_capital",
    prompt: `What is the capital of ${target.name.common}?`,
    targetCountry: target,
    options,
    explanation: `The capital of ${target.name.common} is ${targetCapital}.`,
    imageUrl: target.flags?.svg || target.flags?.png,
  };
}

/**
 * 3) Capital -> Country
 * Displays capital, 4 country choices.
 */
export function generateCapitalToCountry(
  target: Country,
  pool: Country[],
  rng: () => number
): Question {
  const targetCapital = target.capital?.[0] || "Unknown Capital";

  const distractors = selectPlausibleDistractors({
    targetCountry: target,
    pool,
    count: 3,
    rng,
  });

  const correctOption: QuestionOption = {
    id: target.cca3,
    label: target.name.common,
    isCorrect: true,
    flag: target.flags?.svg || target.flags?.png,
  };

  const distractorOptions: QuestionOption[] = distractors.map((d) => ({
    id: d.cca3,
    label: d.name.common,
    isCorrect: false,
    flag: d.flags?.svg || d.flags?.png,
  }));

  const options = shuffle([correctOption, ...distractorOptions], rng);

  return {
    id: `cap_country_${target.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "capital_to_country",
    prompt: `${targetCapital} is the capital of which country?`,
    targetCountry: target,
    options,
    explanation: `${targetCapital} is the capital city of ${target.name.common} (${target.region}).`,
    imageUrl: target.flags?.svg || target.flags?.png,
  };
}

/**
 * 4) Higher / Lower
 * Displays two countries, asks which has higher population or larger area.
 */
export function generateHigherLower(
  target: Country,
  pool: Country[],
  rng: () => number
): Question {
  const usePopulation = rng() > 0.5;
  const metric = usePopulation ? "population" : "area";

  // Pick a comparator with a distinct value
  const candidates = pool.filter(
    (c) =>
      c.cca3 !== target.cca3 &&
      (usePopulation ? c.population !== target.population : c.area !== target.area)
  );

  const comparator =
    selectPlausibleDistractors({
      targetCountry: target,
      pool: candidates,
      count: 1,
      rng,
    })[0] || candidates[0];

  const valTarget = usePopulation ? target.population : target.area;
  const valComp = usePopulation ? comparator.population : comparator.area;

  const prompt = usePopulation
    ? `Which country has a higher population?`
    : `Which country has a larger land area?`;

  const targetWins = valTarget > valComp;

  const optionA: QuestionOption = {
    id: target.cca3,
    label: target.name.common,
    isCorrect: targetWins,
    flag: target.flags?.svg || target.flags?.png,
    metadata: { value: valTarget },
  };

  const optionB: QuestionOption = {
    id: comparator.cca3,
    label: comparator.name.common,
    isCorrect: !targetWins,
    flag: comparator.flags?.svg || comparator.flags?.png,
    metadata: { value: valComp },
  };

  const options = shuffle([optionA, optionB], rng);

  const formatUnit = (val: number) =>
    usePopulation ? val.toLocaleString() + " people" : val.toLocaleString() + " km²";

  const explanation = `${target.name.common}: ${formatUnit(valTarget)} vs ${comparator.name.common}: ${formatUnit(valComp)}.`;

  return {
    id: `higher_lower_${target.cca3}_${comparator.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "higher_lower",
    prompt,
    targetCountry: target,
    comparisonCountry: comparator,
    options,
    explanation,
    metadata: {
      metric,
      targetValue: valTarget,
      comparisonValue: valComp,
    },
  };
}

/**
 * 5) Which borders X?
 * Asks which of the 4 countries shares a border with X (or which does NOT).
 */
export function generateWhichBorders(
  target: Country,
  pool: Country[],
  countryMap: Map<string, Country>,
  rng: () => number
): Question {
  const validBorders = (target.borders || [])
    .map((code) => countryMap.get(code))
    .filter((c): c is Country => Boolean(c));

  // Determine if we should ask positive ("shares a border") or negative ("does NOT share a border")
  const canDoNegative = validBorders.length >= 3 && rng() > 0.5;

  if (canDoNegative) {
    // Pick 3 real borders and 1 non-border distractor as the correct answer
    const bordersShuffled = shuffle(validBorders, rng).slice(0, 3);
    const nonBorderDistractors = selectPlausibleDistractors({
      targetCountry: target,
      pool,
      count: 1,
      rng,
      filterFn: (c) => !(target.borders || []).includes(c.cca3),
    });

    const correctNonBorder = nonBorderDistractors[0];

    const options: QuestionOption[] = [
      {
        id: correctNonBorder.cca3,
        label: correctNonBorder.name.common,
        isCorrect: true,
        flag: correctNonBorder.flags?.svg || correctNonBorder.flags?.png,
      },
      ...bordersShuffled.map((b) => ({
        id: b.cca3,
        label: b.name.common,
        isCorrect: false,
        flag: b.flags?.svg || b.flags?.png,
      })),
    ];

    const borderNames = validBorders.map((b) => b.name.common).join(", ");
    const explanation = `${correctNonBorder.name.common} does NOT share a land border with ${target.name.common}. Land neighbours include: ${borderNames}.`;

    return {
      id: `border_not_${target.cca3}_${Math.floor(rng() * 100000)}`,
      mode: "which_borders",
      prompt: `Which of these countries does NOT share a land border with ${target.name.common}?`,
      targetCountry: target,
      options: shuffle(options, rng),
      explanation,
      imageUrl: target.flags?.svg || target.flags?.png,
      metadata: {
        borderCountries: target.borders,
      },
    };
  }

  // Standard: 1 real border is the correct answer, 3 distractors that do NOT border target
  const correctBorder = sample(validBorders, rng) || validBorders[0];
  const distractors = selectPlausibleDistractors({
    targetCountry: target,
    pool,
    count: 3,
    rng,
    filterFn: (c) => !(target.borders || []).includes(c.cca3),
  });

  const correctOption: QuestionOption = {
    id: correctBorder.cca3,
    label: correctBorder.name.common,
    isCorrect: true,
    flag: correctBorder.flags?.svg || correctBorder.flags?.png,
  };

  const distractorOptions: QuestionOption[] = distractors.map((d) => ({
    id: d.cca3,
    label: d.name.common,
    isCorrect: false,
    flag: d.flags?.svg || d.flags?.png,
  }));

  const borderNames = validBorders.map((b) => b.name.common).join(", ");
  const explanation = `${target.name.common} shares a land border with ${correctBorder.name.common}. (Borders: ${borderNames}).`;

  return {
    id: `border_${target.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "which_borders",
    prompt: `Which of these countries shares a land border with ${target.name.common}?`,
    targetCountry: target,
    options: shuffle([correctOption, ...distractorOptions], rng),
    explanation,
    imageUrl: target.flags?.svg || target.flags?.png,
    metadata: {
      borderCountries: target.borders,
    },
  };
}

/**
 * 6) Region / Map Location
 * Asks which region/continent a country belongs to.
 */
export function generateMapLocation(
  target: Country,
  pool: Country[],
  rng: () => number
): Question {
  const targetRegion = target.region;
  const otherRegions = ALL_REGIONS.filter(
    (r) => r.toLowerCase() !== targetRegion.toLowerCase()
  );
  const distractorRegions = shuffle(otherRegions, rng).slice(0, 3);

  const correctOption: QuestionOption = {
    id: targetRegion,
    label: targetRegion,
    isCorrect: true,
  };

  const distractorOptions: QuestionOption[] = distractorRegions.map((r) => ({
    id: r,
    label: r,
    isCorrect: false,
  }));

  const options = shuffle([correctOption, ...distractorOptions], rng);
  const sub = target.subregion ? ` (${target.subregion})` : "";
  const explanation = `${target.name.common} is located in ${target.region}${sub}.`;

  return {
    id: `region_${target.cca3}_${Math.floor(rng() * 100000)}`,
    mode: "map_location",
    prompt: `In which world region is ${target.name.common} located?`,
    targetCountry: target,
    options,
    explanation,
    imageUrl: target.flags?.svg || target.flags?.png,
  };
}
