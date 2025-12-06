import { test, expect } from '@playwright/test';

test('quiz flow: select ocean, answer question, see feedback', async ({ page }) => {
  // 1. Start at Home
  await page.goto('/');

  // 2. Select an Ocean (e.g., the first one)
  const firstCard = page.locator('.ocean-card').first();
  await expect(firstCard).toBeVisible();
  await firstCard.click();

  // 3. Verify Navigation to Quiz
  await expect(page).toHaveURL(/.*quiz/);

  // 4. Check for Question
  const question = page.locator('.quiz__question');
  await expect(question).toBeVisible();

  // 5. Select an Answer Option
  const firstOption = page.locator('.quiz__option-btn').first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();

  // 6. Verify Feedback appears
  const feedback = page.locator('.quiz__feedback');
  await expect(feedback).toBeVisible();

  // Optional: Check if feedback text is correct or incorrect
  // await expect(feedback).toContainText(/Richtig|Leider falsch/);
});
