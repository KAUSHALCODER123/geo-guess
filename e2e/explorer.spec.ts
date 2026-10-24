import { test, expect } from "@playwright/test";

test.describe("World Atlas Explorer Journey", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/explore");
    await page.waitForLoadState("domcontentloaded");
    // Ensure country dataset has hydrated into the explorer view
    await expect(page.locator('a[href^="/country/"]').first()).toBeVisible({ timeout: 10000 });
  });

  test("renders explorer page header and search input", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "World Explorer" })).toBeVisible();
    const searchInput = page.locator('input[aria-label="Search countries"]');
    await expect(searchInput).toBeVisible();
  });

  test("filters countries by search query", async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search countries"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill("Canada");

    // Wait for filtered result
    const canadaHeading = page.getByRole("heading", { name: "Canada", exact: true });
    await expect(canadaHeading).toBeVisible({ timeout: 10000 });

    // Other countries like France shouldn't be visible in matched results
    const franceHeading = page.getByRole("heading", { name: "France", exact: true });
    await expect(franceHeading).not.toBeVisible({ timeout: 5000 });
  });

  test("filters countries by geographic region", async ({ page }) => {
    // Open region selector
    const regionTrigger = page.getByRole("combobox", { name: "Filter by Region" });
    await expect(regionTrigger).toBeVisible();
    await regionTrigger.click();

    // Select Europe from dropdown
    const europeOption = page.getByRole("option", { name: "Europe" });
    await expect(europeOption).toBeVisible({ timeout: 5000 });
    await europeOption.click();

    // Verify European country is visible
    await expect(page.getByRole("heading", { name: "France" }).first()).toBeVisible({
      timeout: 10000,
    });
  });

  test("toggles country favorite status", async ({ page }) => {
    const firstFavoriteBtn = page.locator('button[aria-label*="favorites"]').first();
    await expect(firstFavoriteBtn).toBeVisible({ timeout: 10000 });

    const initialPressed = await firstFavoriteBtn.getAttribute("aria-pressed");
    await firstFavoriteBtn.click();

    // Expect state toggled
    const nextPressed = await firstFavoriteBtn.getAttribute("aria-pressed");
    expect(nextPressed).not.toBe(initialPressed);
  });

  test("navigates to country detail page on card click", async ({ page }) => {
    const franceLink = page.getByRole("link", { name: "France", exact: true }).first();
    await expect(franceLink).toBeVisible({ timeout: 10000 });
    await franceLink.click();

    // URL should match /country/fra
    await page.waitForURL("**/country/fra");
    await expect(page.getByRole("heading", { name: "France" }).first()).toBeVisible({
      timeout: 10000,
    });
  });
});
