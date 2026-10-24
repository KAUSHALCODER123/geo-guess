import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import {
  getAllCountries,
  getCountryByCode,
  getBorders,
  searchCountries,
  clearCountryCache,
  BATCH_1_FIELDS,
  BATCH_2_FIELDS,
} from "@/lib/api/restcountries";
import { fetchWikiSummary, clearWikiCache } from "@/lib/api/wikipedia";
import { fetchCapitalWeather, clearWeatherCache, interpretWeatherCode } from "@/lib/api/weather";
import { AppError } from "@/types";
import { FALLBACK_COUNTRIES } from "@/lib/api/fallback-countries";

describe("Data Layer & API Clients", () => {
  beforeEach(() => {
    clearCountryCache();
    clearWikiCache();
    clearWeatherCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("REST Countries Field Limit Compliance", () => {
    it("ensures BATCH_1_FIELDS has 10 or fewer fields per request", () => {
      expect(BATCH_1_FIELDS.length).toBeLessThanOrEqual(10);
      expect(BATCH_1_FIELDS).toContain("cca3");
    });

    it("ensures BATCH_2_FIELDS has 10 or fewer fields per request", () => {
      expect(BATCH_2_FIELDS.length).toBeLessThanOrEqual(10);
      expect(BATCH_2_FIELDS).toContain("cca3");
    });
  });

  describe("getAllCountries", () => {
    it("fetches in batches adhering to <= 10 fields and correctly merges on cca3", async () => {
      const mockBatch1 = [
        {
          cca3: "FRA",
          cca2: "FR",
          name: { common: "France", official: "French Republic" },
          capital: ["Paris"],
          region: "Europe",
          subregion: "Western Europe",
          flags: { png: "https://flagcdn.com/w320/fr.png", svg: "https://flagcdn.com/fr.svg" },
          population: 67391582,
          area: 551695,
        },
      ];

      const mockBatch2 = [
        {
          cca3: "FRA",
          languages: { fra: "French" },
          currencies: { EUR: { name: "Euro", symbol: "€" } },
          borders: ["ESP", "DEU", "ITA"],
          latlng: [46, 2],
          timezones: ["UTC+01:00"],
          continents: ["Europe"],
          landlocked: false,
          unMember: true,
          car: { side: "right" },
        },
      ];

      const fetchMock = vi.fn().mockImplementation((url: string) => {
        const urlStr = url.toString();
        // Verify fields query parameter limit
        const fields = new URL(urlStr).searchParams.get("fields")?.split(",");
        expect(fields).toBeDefined();
        expect(fields!.length).toBeLessThanOrEqual(10);

        if (urlStr.includes("population")) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => mockBatch1,
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockBatch2,
        });
      });

      vi.stubGlobal("fetch", fetchMock);

      const countries = await getAllCountries();

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(countries.length).toBe(1);

      const france = countries[0];
      expect(france.cca3).toBe("FRA");
      expect(france.cca2).toBe("FR");
      expect(france.name.common).toBe("France");
      expect(france.capital).toEqual(["Paris"]);
      expect(france.languages).toEqual({ fra: "French" });
      expect(france.currencies.EUR.name).toBe("Euro");
      expect(france.borders).toEqual(["ESP", "DEU", "ITA"]);
      expect(france.carSide).toBe("right");
    });

    it("gracefully falls back to embedded dataset on network failure", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("Network connection dropped"))
      );

      const countries = await getAllCountries();

      expect(countries).toBeDefined();
      expect(countries.length).toBeGreaterThanOrEqual(10);
      expect(countries).toEqual(FALLBACK_COUNTRIES);
      expect(countries.some((c) => c.cca3 === "FRA")).toBe(true);
    });
  });

  describe("getCountryByCode", () => {
    it("returns country by alpha-3 code from cache or API", async () => {
      const mockBatch1 = {
        cca3: "JPN",
        cca2: "JP",
        name: { common: "Japan", official: "Japan" },
        capital: ["Tokyo"],
        region: "Asia",
        subregion: "Eastern Asia",
        flags: { png: "https://flagcdn.com/w320/jp.png", svg: "https://flagcdn.com/jp.svg" },
        population: 125836021,
        area: 377930,
      };

      const mockBatch2 = {
        cca3: "JPN",
        languages: { jpn: "Japanese" },
        currencies: { JPY: { name: "Japanese yen", symbol: "¥" } },
        borders: [],
        latlng: [36, 138],
        timezones: ["UTC+09:00"],
        continents: ["Asia"],
        landlocked: false,
        unMember: true,
        car: { side: "left" },
      };

      const fetchMock = vi.fn().mockImplementation((url: string) => {
        const urlStr = url.toString();
        if (urlStr.includes("population")) {
          return Promise.resolve({
            ok: true,
            status: 200,
            json: async () => mockBatch1,
          });
        }
        return Promise.resolve({
          ok: true,
          status: 200,
          json: async () => mockBatch2,
        });
      });

      vi.stubGlobal("fetch", fetchMock);

      const japan = await getCountryByCode("JPN");
      expect(japan.cca3).toBe("JPN");
      expect(japan.name.common).toBe("Japan");
      expect(japan.capital).toEqual(["Tokyo"]);
      expect(japan.carSide).toBe("left");
    });

    it("falls back to embedded dataset when offline or single country fetch fails", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Offline")));

      const country = await getCountryByCode("FRA");
      expect(country.cca3).toBe("FRA");
      expect(country.name.common).toBe("France");
    });

    it("throws AppError with NOT_FOUND code for non-existent country code", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      );

      await expect(getCountryByCode("XYZ")).rejects.toThrow(AppError);
    });
  });

  describe("getBorders", () => {
    it("resolves border summaries correctly", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("Use fallback"))
      );

      const borders = await getBorders(["DEU", "ITA"]);
      expect(borders.length).toBe(2);
      expect(borders.map((b) => b.cca3)).toContain("DEU");
      expect(borders.map((b) => b.cca3)).toContain("ITA");
      expect(borders[0].flags.png).toBeDefined();
    });

    it("returns empty array for empty border input", async () => {
      const borders = await getBorders([]);
      expect(borders).toEqual([]);
    });
  });

  describe("searchCountries", () => {
    it("filters countries by common name and capital", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("Use fallback"))
      );

      const byName = await searchCountries("germany");
      expect(byName.length).toBeGreaterThan(0);
      expect(byName[0].cca3).toBe("DEU");

      const byCapital = await searchCountries("tokyo");
      expect(byCapital.length).toBeGreaterThan(0);
      expect(byCapital[0].cca3).toBe("JPN");
    });
  });

  describe("Wikipedia API Client", () => {
    it("fetches and validates Wikipedia summary data", async () => {
      const mockWikiResponse = {
        title: "France",
        extract: "France, officially the French Republic, is a country in Western Europe.",
        description: "Country in Western Europe",
        thumbnail: {
          source: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/320px-Flag_of_France.svg.png",
          width: 320,
          height: 213,
        },
        content_urls: {
          desktop: {
            page: "https://en.wikipedia.org/wiki/France",
          },
        },
      };

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => mockWikiResponse,
        })
      );

      const summary = await fetchWikiSummary("France");
      expect(summary.title).toBe("France");
      expect(summary.extract).toContain("French Republic");
      expect(summary.thumbnail?.width).toBe(320);
      expect(summary.content_urls?.desktop?.page).toBe("https://en.wikipedia.org/wiki/France");
    });

    it("throws AppError with isNotFound when Wikipedia page does not exist", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 404,
        })
      );

      await expect(fetchWikiSummary("NonExistentCountry12345")).rejects.toMatchObject({
        code: "NOT_FOUND",
        isNotFound: true,
      });
    });
  });

  describe("Open-Meteo Weather API Client", () => {
    it("fetches and transforms capital weather data", async () => {
      const mockMeteoResponse = {
        latitude: 48.85,
        longitude: 2.35,
        current: {
          temperature_2m: 19.4,
          relative_humidity_2m: 55,
          apparent_temperature: 18.9,
          precipitation: 0.1,
          weather_code: 1,
          wind_speed_10m: 14.2,
          is_day: 1,
        },
      };

      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: true,
          status: 200,
          json: async () => mockMeteoResponse,
        })
      );

      const weather = await fetchCapitalWeather(48.85, 2.35);

      expect(weather.temperature).toBe(19.4);
      expect(weather.humidity).toBe(55);
      expect(weather.apparentTemp).toBe(18.9);
      expect(weather.windSpeed).toBe(14.2);
      expect(weather.precipitation).toBe(0.1);
      expect(weather.condition).toBe("Mainly clear");
      expect(weather.iconKey).toBe("clear-day");
      expect(weather.isDay).toBe(true);
    });

    it("correctly maps various WMO weather codes", () => {
      expect(interpretWeatherCode(0, true)).toEqual({
        condition: "Clear sky",
        iconKey: "clear-day",
      });
      expect(interpretWeatherCode(0, false)).toEqual({
        condition: "Clear sky",
        iconKey: "clear-night",
      });
      expect(interpretWeatherCode(61, true)).toEqual({
        condition: "Slight rain",
        iconKey: "rain",
      });
      expect(interpretWeatherCode(71, true)).toEqual({
        condition: "Snowfall",
        iconKey: "snow",
      });
      expect(interpretWeatherCode(95, true)).toEqual({
        condition: "Thunderstorm",
        iconKey: "thunderstorm",
      });
    });
  });
});
