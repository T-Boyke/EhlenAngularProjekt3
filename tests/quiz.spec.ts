import { test, expect } from '@playwright/test';

test('quiz flow: select ocean, answer question, see feedback', async ({ page }) => {
  // 1. Start at Home
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000); // Initial animation / hydration wait

  // 2. Select an Ocean
  const firstCard = page.locator('.ocean-card').first();
  await firstCard.waitFor({ state: 'visible', timeout: 10000 });
  await firstCard.click();

  // 3. Verify Navigation to Facts
  await expect(page).toHaveURL(/.*facts/);

  // 4. Click through slides to unlock quiz
  const nextBtn = page.locator('.ocean-facts__nav-btn').nth(1); // Second button is Next
  const quizBtn = page.locator('.ocean-facts__quiz-btn');

  // Click next a few times (max 20) until quiz button is visible
  for (let i = 0; i < 20; i++) {
    if (await quizBtn.isVisible()) break;
    await nextBtn.click();
    await page.waitForTimeout(300); // Wait for slide transition
  }

  await expect(quizBtn).toBeVisible();
  await quizBtn.click();

  // 5. Verify Navigation to Quiz
  await expect(page).toHaveURL(/.*quiz/);

  // 6. Check for Question
  const question = page.locator('.quiz__question');
  await expect(question).toBeVisible();

  // 7. Select an Answer Option
  const firstOption = page.locator('.quiz__option-btn').first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();

  // 8. Verify Feedback appears
  const feedback = page.locator('.quiz__feedback');
  await expect(feedback).toBeVisible();
});
