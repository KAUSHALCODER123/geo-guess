/**
 * Mulberry32 seeded pseudo-random number generator.
 * Produces deterministic 32-bit PRNG values in the range [0, 1).
 */
export function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return function (): number {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Creates a numeric 32-bit integer seed from a string (e.g. UTC date string "2026-10-24").
 */
export function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

/**
 * Returns a new array shuffled deterministically using the Fisher-Yates algorithm.
 */
export function shuffle<T>(array: readonly T[], rng: () => number = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Picks a random item from an array using the provided RNG.
 */
export function sample<T>(array: readonly T[], rng: () => number = Math.random): T | undefined {
  if (array.length === 0) return undefined;
  const index = Math.floor(rng() * array.length);
  return array[index];
}

/**
 * Returns `count` unique random items from an array without replacement.
 */
export function sampleSize<T>(array: readonly T[], count: number, rng: () => number = Math.random): T[] {
  if (count <= 0) return [];
  if (count >= array.length) return shuffle(array, rng);
  const shuffled = shuffle(array, rng);
  return shuffled.slice(0, count);
}
