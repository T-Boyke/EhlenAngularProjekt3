import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  // Replacing 'EOL' with whatever your actual app title is in index.html
  // or checking for an element
  await expect(page).toHaveTitle(/EOL/);
});
