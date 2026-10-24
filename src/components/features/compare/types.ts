import type { Country } from "@/types";

export interface ComparisonCountryMetric {
  country: Country;
  density: number;
  languagesCount: number;
  bordersCount: number;
}

export interface MetricWinnerMap {
  population: string; // cca3 of highest
  area: string; // cca3 of highest
  density: string; // cca3 of highest
  languagesCount: string; // cca3 of highest
  bordersCount: string; // cca3 of highest
}
