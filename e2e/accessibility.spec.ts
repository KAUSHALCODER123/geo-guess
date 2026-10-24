import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const AUDIT_ROUTES = [
  { path: "/", name: "Homepage" },
  { path: "/explore", name: "Explorer" },
  { path: "/play", name: "Quiz Arena" },
  { path: "/stats", name: "Stats Dashboard" },
  { path: "/country/usa", name: "Country Profile (USA)" },
];

test.describe("Accessibility Compliance (WCAG 2.2 AA)", () => {
  for (const route of AUDIT_ROUTES) {
    test(`zero accessibility violations on ${route.name} (${route.path})`, async ({
      page,
    }) => {
      await page.goto(route.path);
      await page.waitForLoadState("domcontentloaded");
      await page.locator("main").waitFor({ state: "visible" });
      await page.waitForTimeout(600);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .exclude("nextjs-portal")
        .analyze();

      if (accessibilityScanResults.violations.length > 0) {
        console.error(
          `[Axe Audit Failures on ${route.path}]:`,
          JSON.stringify(accessibilityScanResults.violations, null, 2)
        );
      }

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});
