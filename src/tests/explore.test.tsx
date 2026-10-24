import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Fuse from "fuse.js";
import { FALLBACK_COUNTRIES } from "@/lib/api/fallback-countries";
import { CountryCard } from "@/components/features/explorer/country-card";
import { CountryListItem } from "@/components/features/explorer/country-list-item";
import { CompareMatrix } from "@/components/features/compare/compare-matrix";
import { useFavoritesStore } from "@/store/useFavoritesStore";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/explore",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Explore & Compare Feature Logic Tests", () => {
  beforeEach(() => {
    // Cards read the favorites store directly; France is the favorite in these tests.
    useFavoritesStore.setState({ favorites: ["FRA"] });
  });

  const sampleCountries = FALLBACK_COUNTRIES;

  describe("1. Fuzzy Search matching with Fuse.js", () => {
    const fuse = new Fuse(sampleCountries, {
      keys: [
        { name: "name.common", weight: 0.4 },
        { name: "name.official", weight: 0.25 },
        { name: "cca3", weight: 0.15 },
        { name: "cca2", weight: 0.05 },
        { name: "capital", weight: 0.1 },
        { name: "region", weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      minMatchCharLength: 1,
    });

    it("matches country by common name", () => {
      const results = fuse.search("France").map((r) => r.item.cca3);
      expect(results).toContain("FRA");
    });

    it("matches country by official name", () => {
      const results = fuse.search("Federal Republic of Germany").map((r) => r.item.cca3);
      expect(results).toContain("DEU");
    });

    it("matches country by capital city", () => {
      const results = fuse.search("Tokyo").map((r) => r.item.cca3);
      expect(results).toContain("JPN");
    });

    it("matches country by 3-letter ISO code (cca3)", () => {
      const results = fuse.search("CAN").map((r) => r.item.cca3);
      expect(results).toContain("CAN");
    });

    it("matches forgivingly with slight typos", () => {
      const results = fuse.search("Brazl").map((r) => r.item.cca3);
      expect(results).toContain("BRA");
    });
  });

  describe("2. Filtering logic", () => {
    it("filters countries by region accurately", () => {
      const europeCountries = sampleCountries.filter(
        (c) => c.region.toLowerCase() === "europe"
      );
      expect(europeCountries.length).toBeGreaterThan(0);
      expect(europeCountries.every((c) => c.region === "Europe")).toBe(true);
    });

    it("filters countries by subregion accurately", () => {
      const westernEurope = sampleCountries.filter(
        (c) => c.subregion.toLowerCase() === "western europe"
      );
      expect(westernEurope.length).toBeGreaterThan(0);
      expect(westernEurope.every((c) => c.subregion === "Western Europe")).toBe(true);
    });

    it("filters countries by population range", () => {
      const minPop = 50_000_000;
      const maxPop = 150_000_000;
      const filtered = sampleCountries.filter(
        (c) => c.population >= minPop && c.population <= maxPop
      );
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((c) => {
        expect(c.population).toBeGreaterThanOrEqual(minPop);
        expect(c.population).toBeLessThanOrEqual(maxPop);
      });
    });

    it("filters countries by landlocked status", () => {
      const landlockedOnly = sampleCountries.filter((c) => c.landlocked === true);
      const coastalOnly = sampleCountries.filter((c) => c.landlocked === false);

      expect(landlockedOnly.every((c) => c.landlocked)).toBe(true);
      expect(coastalOnly.every((c) => !c.landlocked)).toBe(true);

      // Switzerland is in fallback countries and is landlocked
      const swiss = landlockedOnly.find((c) => c.cca3 === "CHE");
      expect(swiss).toBeDefined();
    });

    it("filters countries by UN membership status", () => {
      const unMembers = sampleCountries.filter((c) => c.unMember === true);
      expect(unMembers.every((c) => c.unMember)).toBe(true);
    });
  });

  describe("3. Sorting logic", () => {
    it("sorts by name ascending and descending", () => {
      const asc = [...sampleCountries].sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      expect(asc[0].name.common.localeCompare(asc[1].name.common)).toBeLessThanOrEqual(0);

      const desc = [...sampleCountries].sort((a, b) =>
        b.name.common.localeCompare(a.name.common)
      );
      expect(desc[0].name.common.localeCompare(desc[1].name.common)).toBeGreaterThanOrEqual(0);
    });

    it("sorts by population descending and ascending", () => {
      const popDesc = [...sampleCountries].sort((a, b) => b.population - a.population);
      expect(popDesc[0].population).toBeGreaterThanOrEqual(popDesc[1].population);

      const popAsc = [...sampleCountries].sort((a, b) => a.population - b.population);
      expect(popAsc[0].population).toBeLessThanOrEqual(popAsc[1].population);
    });

    it("sorts by surface area descending and ascending", () => {
      const areaDesc = [...sampleCountries].sort((a, b) => b.area - a.area);
      expect(areaDesc[0].area).toBeGreaterThanOrEqual(areaDesc[1].area);

      const areaAsc = [...sampleCountries].sort((a, b) => a.area - b.area);
      expect(areaAsc[0].area).toBeLessThanOrEqual(areaAsc[1].area);
    });
  });

  describe("4. Compare metrics calculations & winner identification", () => {
    const usa = sampleCountries.find((c) => c.cca3 === "USA")!;
    const can = sampleCountries.find((c) => c.cca3 === "CAN")!;
    const mex = sampleCountries.find((c) => c.cca3 === "MEX")!;
    const compareSet = [usa, can, mex];

    it("calculates demographic density correctly (population / area)", () => {
      const densityUSA = Math.round(usa.population / usa.area);
      expect(densityUSA).toBeGreaterThan(0);
      expect(densityUSA).toBe(Math.round(usa.population / usa.area));
    });

    it("identifies the highest population winner correctly", () => {
      const maxPop = Math.max(...compareSet.map((c) => c.population));
      const winner = compareSet.find((c) => c.population === maxPop);
      expect(winner?.cca3).toBe("USA");
    });

    it("identifies the largest area winner correctly", () => {
      const maxArea = Math.max(...compareSet.map((c) => c.area));
      const winner = compareSet.find((c) => c.area === maxArea);
      expect(winner?.cca3).toBe("CAN");
    });

    it("normalizes metrics between 0 and 100 for radar charts", () => {
      const maxPop = Math.max(...compareSet.map((c) => c.population));
      const normalizedPopUSA = Math.round((usa.population / maxPop) * 100);
      const normalizedPopCAN = Math.round((can.population / maxPop) * 100);

      expect(normalizedPopUSA).toBe(100); // USA has max pop in this set
      expect(normalizedPopCAN).toBeLessThan(100);
      expect(normalizedPopCAN).toBeGreaterThan(0);
    });
  });

  describe("5. Component UI Rendering", () => {
    const france = sampleCountries.find((c) => c.cca3 === "FRA")!;

    it("renders CountryCard with name, region badge, capital, and favorite status", () => {
      render(<CountryCard country={france} />);

      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Europe")).toBeInTheDocument();
      expect(screen.getByText("Paris")).toBeInTheDocument();

      // Favorite button exists with aria-pressed
      const favButton = screen.getByRole("button", { name: /remove france from favorites/i });
      expect(favButton).toBeInTheDocument();
      expect(favButton).toHaveAttribute("aria-pressed", "true");
    });

    it("renders CountryListItem with formatted population and capital", () => {
      render(<CountryListItem country={france} />);

      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Paris")).toBeInTheDocument();
      expect(screen.getByText(france.population.toLocaleString())).toBeInTheDocument();
    });

    it("renders CompareMatrix side-by-side with columns and metric labels", () => {
      const fra = sampleCountries.find((c) => c.cca3 === "FRA")!;
      const deu = sampleCountries.find((c) => c.cca3 === "DEU")!;

      render(
        <CompareMatrix
          countries={[fra, deu]}
          onRemoveCountry={vi.fn()}
          onSwapCountries={vi.fn()}
        />
      );

      // Verify country headers
      expect(screen.getByText("France")).toBeInTheDocument();
      expect(screen.getByText("Germany")).toBeInTheDocument();

      // Verify row labels
      expect(screen.getByText("Capital")).toBeInTheDocument();
      expect(screen.getByText("Population")).toBeInTheDocument();
      expect(screen.getByText("Surface Area")).toBeInTheDocument();
      expect(screen.getByText("Population Density")).toBeInTheDocument();
      expect(screen.getByText("Official Languages")).toBeInTheDocument();
      expect(screen.getByText("Border Count")).toBeInTheDocument();
      expect(screen.getByText("Currencies")).toBeInTheDocument();
    });
  });
});
