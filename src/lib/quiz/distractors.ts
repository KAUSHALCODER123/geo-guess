import type { Country } from "@/types/country";
import { shuffle } from "./rng";

export interface DistractorOptions {
  targetCountry: Country;
  pool: Country[];
  count: number;
  rng?: () => number;
  excludeCca3?: Set<string>;
  filterFn?: (country: Country) => boolean;
}

/**
 * Selects plausible distractors for a given target country.
 * Priority:
 * 1. Countries in the exact same subregion (e.g. Western Europe)
 * 2. Countries in the same UN region (e.g. Europe)
 * 3. Countries globally (fallback)
 *
 * Guarantees `count` unique distractors whenever pool size allows.
 */
export function selectPlausibleDistractors(options: DistractorOptions): Country[] {
  const {
    targetCountry,
    pool,
    count,
    rng = Math.random,
    excludeCca3 = new Set<string>(),
    filterFn,
  } = options;

  const blocked = new Set<string>(excludeCca3);
  blocked.add(targetCountry.cca3);

  // Eligible candidates
  const eligible = pool.filter((c) => !blocked.has(c.cca3) && (!filterFn || filterFn(c)));

  // Partition into priority tiers
  const tier1SameSubregion: Country[] = [];
  const tier2SameRegion: Country[] = [];
  const tier3Global: Country[] = [];

  for (const c of eligible) {
    if (targetCountry.subregion && c.subregion === targetCountry.subregion) {
      tier1SameSubregion.push(c);
    } else if (targetCountry.region && c.region === targetCountry.region) {
      tier2SameRegion.push(c);
    } else {
      tier3Global.push(c);
    }
  }

  const selected: Country[] = [];
  const chosenCca3 = new Set<string>();

  const pickFromList = (list: Country[]) => {
    const shuffled = shuffle(list, rng);
    for (const item of shuffled) {
      if (selected.length >= count) break;
      if (!chosenCca3.has(item.cca3)) {
        chosenCca3.add(item.cca3);
        selected.push(item);
      }
    }
  };

  // Step 1: Same subregion
  pickFromList(tier1SameSubregion);

  // Step 2: Same region
  if (selected.length < count) {
    pickFromList(tier2SameRegion);
  }

  // Step 3: Global fallback
  if (selected.length < count) {
    pickFromList(tier3Global);
  }

  return selected;
}
