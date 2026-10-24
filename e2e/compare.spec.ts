import { test, expect } from "@playwright/test";

test.describe("Nation Comparison Journey", () => {
  test("loads comparison view with empty state when no countries selected", async ({ page }) => {
    await page.goto("/compare");
    await page.waitForLoadState("networkidle");

    await expect(page.getByRole("heading", { name: "Compare Nations" })).toBeVisible();
    await expect(
      page.getByText(/select 2 or 3 nations to begin comparison|select at least/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test("displays comparison matrix and charts when 2 or 3 countries are loaded", async ({
    page,
  }) => {
    // Navigate with query params for USA, FRA, and JPN
    await page.goto("/compare?c=USA,FRA,JPN");
    await page.waitForLoadState("networkidle");

    // Verify country names in matrix
    await expect(page.getByText("United States", { exact: false }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("France", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Japan", { exact: false }).first()).toBeVisible();

    // Verify comparison matrix metric rows
    await expect(page.getByText("Population", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Surface Area", { exact: false }).first()).toBeVisible();
    await expect(page.getByText("Region / Subregion", { exact: false }).first()).toBeVisible();

    // Verify Recharts responsive container or surfaces
    const chartsContainer = page.locator(".recharts-responsive-container");
    await expect(chartsContainer.first()).toBeVisible({ timeout: 10000 });
  });

  test("allows removing a country from the comparison", async ({ page }) => {
    await page.goto("/compare?c=USA,FRA");
    await page.waitForLoadState("networkidle");

    // Verify initial 2 countries
    await expect(page.getByText("United States", { exact: false }).first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText("France", { exact: false }).first()).toBeVisible();

    // Click remove button for France
    const removeBtn = page.getByRole("button", { name: "Remove France" });
    await expect(removeBtn).toBeVisible({ timeout: 5000 });
    await removeBtn.click();

    // Should now show empty/insufficient prompt since only 1 country remains
    await expect(
      page.getByText(/select at least 1 more nation to compare|select 2 or 3 nations/i)
    ).toBeVisible({ timeout: 10000 });
  });
});
