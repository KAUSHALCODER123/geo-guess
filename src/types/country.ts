/**
 * Normalized domain model for Country across FlagForge.
 */
export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CountryCurrency {
  name: string;
  symbol: string;
}

export interface CapitalInfo {
  latlng?: [number, number];
}

export interface Country {
  /** 3-letter ISO 3166-1 alpha-3 code (e.g. "FRA") */
  cca3: string;
  /** 2-letter ISO 3166-1 alpha-2 code (e.g. "FR") */
  cca2: string;
  /** Country name variations */
  name: CountryName;
  /** Array of capital cities */
  capital: string[];
  /** UN Region (e.g. "Europe", "Africa", "Americas", "Asia", "Oceania") */
  region: string;
  /** UN Subregion (e.g. "Western Europe", "Northern Africa") */
  subregion: string;
  /** Languages keyed by ISO code: { fra: "French" } */
  languages: Record<string, string>;
  /** Currencies keyed by code: { EUR: { name: "Euro", symbol: "€" } } */
  currencies: Record<string, CountryCurrency>;
  /** Array of bordering country cca3 codes */
  borders: string[];
  /** Estimated population */
  population: number;
  /** Land/water area in km² */
  area: number;
  /** Flags in PNG and SVG formats with optional accessibility alt text */
  flags: CountryFlags;
  /** Geographic coordinates [latitude, longitude] */
  latlng: [number, number];
  /** Optional capital coordinates */
  capitalInfo?: CapitalInfo;
  /** Timezone strings (e.g. "UTC+01:00") */
  timezones: string[];
  /** Continents */
  continents: string[];
  /** Whether the country is landlocked */
  landlocked: boolean;
  /** United Nations membership status */
  unMember: boolean;
  /** International calling codes (e.g. ["+33"]) */
  callingCodes: string[];
  /** Driving side ("right" or "left") */
  carSide?: "right" | "left";
}

/**
 * Lightweight summary used for list views, search results, and bordering country cards.
 */
export interface CountrySummary {
  cca3: string;
  cca2: string;
  name: CountryName;
  flags: CountryFlags;
  region: string;
  capital: string[];
  population: number;
}

/**
 * Resolved bordering country item with basic identification and flag.
 */
export interface BorderCountry {
  cca3: string;
  cca2: string;
  name: {
    common: string;
    official: string;
  };
  flags: CountryFlags;
}
