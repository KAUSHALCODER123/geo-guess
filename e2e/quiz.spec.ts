import { test, expect } from "@playwright/test";

test.describe("Quiz Arena & Daily Challenge Journeys", () => {
  test("configures and plays a quiz with keyboard (1-4) controls", async ({ page }) => {
    await page.goto("/play");
    await page.waitForLoadState("domcontentloaded");

    // Start quiz
    const startButton = page.getByRole("button", { name: /start quiz/i });
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();

    // Verify game starts and first question renders
    await expect(page.getByText(/question 1\s*(\/|of)\s*10/i)).toBeVisible({ timeout: 10000 });

    // Answer first question using keyboard shortcut '1'
    await page.keyboard.press("Digit1");

    // Verify option got answered (Next button appears or review feedback)
    const nextButton = page.getByRole("button", { name: /next question|view results/i });
    await expect(nextButton).toBeVisible({ timeout: 5000 });

    // Advance to next question via Spacebar shortcut
    await page.keyboard.press("Space");

    // Either question 2 renders or game over if lives ran out
    await expect(
      page.getByText(/question 2\s*(\/|of)\s*10/i).or(page.getByRole("button", { name: /play again/i }))
    ).toBeVisible({ timeout: 10000 });
  });

  test("completes quiz session to view game over screen", async ({ page }) => {
    await page.goto("/play");
    await page.waitForLoadState("domcontentloaded");

    // Switch to casual unlimited lives mode so all questions can be played
    const livesToggle = page.locator("button:has-text('Lives')");
    if (await livesToggle.isVisible()) {
      await livesToggle.click();
    }

    const startButton = page.getByRole("button", { name: /start quiz/i });
    await expect(startButton).toBeVisible({ timeout: 10000 });
    await startButton.click();

    // Answer questions until game over screen is reached
    for (let i = 1; i <= 10; i++) {
      const isGameOver = await page.getByRole("button", { name: /play again/i }).isVisible();
      if (isGameOver) break;

      // Wait for question
      const questionText = page.getByText(new RegExp(`question ${i}\\s*(\\/|of)\\s*10`, "i"));
      if (await questionText.isVisible({ timeout: 5000 })) {
        // Press 1 to answer
        await page.keyboard.press("Digit1");
        await page.waitForTimeout(300);

        const nextOrFinishBtn = page.getByRole("button", { name: /next question|view results/i });
        if (await nextOrFinishBtn.isVisible({ timeout: 5000 })) {
          await nextOrFinishBtn.click();
        }
      }
    }

    // Verify game over review screen
    await expect(page.getByRole("button", { name: /play again/i })).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText(/score/i).first()).toBeVisible();
  });

  test("launches and plays daily challenge", async ({ page }) => {
    await page.goto("/daily");
    await page.waitForLoadState("domcontentloaded");

    // Verify daily challenge heading
    await expect(
      page.getByRole("heading", { name: /today's global challenge|daily challenge/i })
    ).toBeVisible({ timeout: 10000 });

    const startDailyBtn = page.getByRole("button", {
      name: /begin today's challenge|start daily challenge/i,
    });
    await expect(startDailyBtn).toBeVisible({ timeout: 10000 });
    await startDailyBtn.click();

    // Check first question loads
    await expect(page.getByText(/daily challenge/i).first()).toBeVisible({ timeout: 10000 });

    // Answer with key 1
    await page.keyboard.press("Digit1");

    const nextBtn = page.getByRole("button", { name: /next question|view results/i });
    await expect(nextBtn).toBeVisible({ timeout: 5000 });
  });
});
