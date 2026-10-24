import { z } from "zod";

// ==========================================
// REST COUNTRIES API SCHEMAS & TYPES
// ==========================================

export const RestCountryBatch1Schema = z.object({
  cca3: z.string(),
  cca2: z.string().default(""),
  name: z.object({
    common: z.string(),
    official: z.string(),
    nativeName: z
      .record(
        z.object({
          official: z.string().default(""),
          common: z.string().default(""),
        })
      )
      .optional(),
  }),
  capital: z.array(z.string()).default([]),
  region: z.string().default(""),
  subregion: z.string().default(""),
  flags: z.object({
    png: z.string().default(""),
    svg: z.string().default(""),
    alt: z.string().optional(),
  }),
  population: z.number().default(0),
  area: z.number().default(0),
});

export type RestCountryBatch1 = z.infer<typeof RestCountryBatch1Schema>;

export const RestCountryBatch2Schema = z.object({
  cca3: z.string(),
  languages: z.record(z.string()).default({}),
  currencies: z
    .record(
      z.object({
        name: z.string().default(""),
        symbol: z.string().default(""),
      })
    )
    .default({}),
  borders: z.array(z.string()).default([]),
  latlng: z.array(z.number()).default([0, 0]),
  capitalInfo: z
    .object({
      latlng: z.array(z.number()).optional(),
    })
    .optional(),
  timezones: z.array(z.string()).default([]),
  continents: z.array(z.string()).default([]),
  landlocked: z.boolean().default(false),
  unMember: z.boolean().default(false),
  idd: z
    .object({
      root: z.string().optional(),
      suffixes: z.array(z.string()).optional(),
    })
    .optional(),
  car: z
    .object({
      side: z.enum(["right", "left"]).optional(),
      signs: z.array(z.string()).optional(),
    })
    .optional(),
});

export type RestCountryBatch2 = z.infer<typeof RestCountryBatch2Schema>;

// Combined schema for single country alpha responses or merged results
export const RestCountrySchema = RestCountryBatch1Schema.merge(RestCountryBatch2Schema);
export type RestCountry = z.infer<typeof RestCountrySchema>;

// ==========================================
// WIKIPEDIA SUMMARY API SCHEMAS & TYPES
// ==========================================

export const WikiSummarySchema = z.object({
  title: z.string(),
  extract: z.string().default(""),
  description: z.string().optional(),
  thumbnail: z
    .object({
      source: z.string(),
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  content_urls: z
    .object({
      desktop: z
        .object({
          page: z.string(),
        })
        .optional(),
      mobile: z
        .object({
          page: z.string(),
        })
        .optional(),
    })
    .optional(),
});

export type WikiSummary = z.infer<typeof WikiSummarySchema>;

// ==========================================
// OPEN-METEO WEATHER API SCHEMAS & TYPES
// ==========================================

export const OpenMeteoResponseSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  current: z.object({
    temperature_2m: z.number(),
    relative_humidity_2m: z.number(),
    apparent_temperature: z.number(),
    precipitation: z.number().default(0),
    weather_code: z.number().default(0),
    wind_speed_10m: z.number().default(0),
    is_day: z.number().optional().default(1),
  }),
});

export type OpenMeteoResponse = z.infer<typeof OpenMeteoResponseSchema>;

export type WeatherIconKey =
  | "clear-day"
  | "clear-night"
  | "cloudy"
  | "fog"
  | "rain"
  | "snow"
  | "thunderstorm";

export interface WeatherData {
  temperature: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  condition: string;
  iconKey: WeatherIconKey;
  isDay: boolean;
}

// ==========================================
// TYPED APPLICATION ERROR
// ==========================================

export type ErrorCode =
  | "NETWORK_ERROR"
  | "TIMEOUT_ERROR"
  | "NOT_FOUND"
  | "PARSE_ERROR"
  | "RATE_LIMITED"
  | "SERVER_ERROR"
  | "OFFLINE_FALLBACK"
  | "UNKNOWN_ERROR";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly isNetwork: boolean;
  readonly isNotFound: boolean;
  readonly retryable: boolean;
  readonly cause?: unknown;

  constructor(params: {
    message: string;
    code: ErrorCode;
    status?: number;
    isNetwork?: boolean;
    isNotFound?: boolean;
    retryable?: boolean;
    cause?: unknown;
  }) {
    super(params.message);
    this.name = "AppError";
    this.code = params.code;
    this.status = params.status;
    this.isNetwork = params.isNetwork ?? (params.code === "NETWORK_ERROR" || params.code === "TIMEOUT_ERROR");
    this.isNotFound = params.isNotFound ?? params.code === "NOT_FOUND";
    this.retryable =
      params.retryable ??
      (params.code === "NETWORK_ERROR" ||
        params.code === "TIMEOUT_ERROR" ||
        params.code === "RATE_LIMITED" ||
        params.code === "SERVER_ERROR");
    this.cause = params.cause;

    // Restore prototype chain
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
