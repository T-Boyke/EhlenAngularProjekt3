import { test, expect } from '@playwright/test';

/**
 * End-to-End Smoke Test.
 *
 * Ziel:
 * - Schnelle Überprüfung, ob die Anwendung grundsätzlich startet.
 * - Testet keine tiefgreifende Logik, sondern nur die Erreichbarkeit ("Rauchtest").
 */
test('has title', async ({ page }) => {
  // 1. Zur Startseite navigieren
  await page.goto('/');

  // 2. Erwartung prüfen: Der Titel der Seite muss korrekt sein.
  // RegEx /.../ erlaubt Teil-Matches.
  await expect(page).toHaveTitle(/Earth Ocean Learning/);
});
