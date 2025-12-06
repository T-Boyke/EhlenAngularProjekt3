import { test, expect } from '@playwright/test';

/**
 * Komplexer End-to-End Test: Quiz-Ablauf ("User Journey").
 *
 * Ziel:
 * - Simulation eines vollständigen Nutzer-Durchlaufs.
 * - Startseite -> Auswahl -> Fakten ansehen -> Quiz starten -> Frage beantworten -> Feedback.
 * - Validiert die Übergänge und die Sichtbarkeit von Schlüsselelementen.
 */
test('quiz flow: select ocean, answer question, see feedback', async ({ page }) => {
  // 1. Start auf der Homepage
  await page.goto('/');
  await page.waitForLoadState('networkidle'); // Warten, bis alle Netzwerkanfragen fertig sind
  await page.waitForTimeout(2000); // Zusätzlicher Puffer für Initialisierungs-Animationen

  // 2. Einen Ozean auswählen
  // Wir nehmen die erste verfügbare Karte mit der Klasse .ocean-card
  const firstCard = page.locator('.ocean-card').first();
  await firstCard.waitFor({ state: 'visible', timeout: 10000 });
  await firstCard.click();

  // 3. Navigation zur Fakten-Seite prüfen
  // URL sollte etwas wie /facts/pacific enthalten
  await expect(page).toHaveURL(/.*facts/);

  // 4. Durch die Slides klicken, um das Quiz freizuschalten
  const nextBtn = page.locator('.ocean-facts__nav-btn').nth(1); // Der zweite Button ist "Weiter"
  const quizBtn = page.locator('.ocean-facts__quiz-btn');

  // Schleife: Klickt "Weiter", bis der Quiz-Button sichtbar wird
  // (Sicherheitsnetz: maximal 20 Klicks)
  for (let i = 0; i < 20; i++) {
    if (await quizBtn.isVisible()) break;
    await nextBtn.click();
    await page.waitForTimeout(300); // Kurze Pause für Slide-Animation
  }

  // Erwartung: Quiz-Button muss jetzt klickbar sein
  await expect(quizBtn).toBeVisible();
  await quizBtn.click();

  // 5. Navigation zum Quiz prüfen
  await expect(page).toHaveURL(/.*quiz/);

  // 6. Prüfen, ob eine Frage angezeigt wird
  const question = page.locator('.quiz__question');
  await expect(question).toBeVisible();

  // 7. Eine Antwort-Option auswählen
  const firstOption = page.locator('.quiz__option-btn').first();
  await expect(firstOption).toBeVisible();
  await firstOption.click();

  // 8. Prüfen, ob das Feedback-Overlay erscheint (Richtig/Falsch)
  const feedback = page.locator('.quiz__feedback');
  await expect(feedback).toBeVisible();
});
