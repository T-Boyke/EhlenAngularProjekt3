import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Die Startseite der Anwendung.
 *
 * Verwendungszweck:
 * - Dient als Landing Page und erster Berührungspunkt für den Nutzer.
 * - Vermittelt den ersten Eindruck (Look & Feel) der Anwendung.
 *
 * Funktionalität:
 * - Zeigt den App-Titel und ein Logo.
 * - Präsentiert einen zufälligen Fakt ("Wusstest du schon?"), um Interesse zu wecken.
 * - Ermöglicht die Navigation zur Hauptanwendung (Ozean-Auswahl) via Button.
 */
@Component({
  selector: 'app-start',
  standalone: true,
  styleUrl: './start.component.css',
  template: `
    <div class="start-page">
      <div class="start-page__card">
        <!-- Logo Platzhalter: Ein einfaches Emoji repräsentiert das Thema -->
        <div class="start-page__logo-wrapper">
          <span class="start-page__logo">🌊</span>
        </div>

        <h1 class="start-page__title">Earth Ocean Learning</h1>

        <div class="start-page__fact-box">
          <p class="start-page__fact-label">Wusstest du, dass...</p>
          <p class="start-page__fact-text">...der Ozean mehr als 70% der Erdoberfläche bedeckt?</p>
        </div>

        <button (click)="start()" class="start-page__button">Los geht's! 🚀</button>
      </div>
    </div>
  `,
})
export class StartComponent {
  private router = inject(Router);

  /**
   * Startet die Anwendung und navigiert zur Ozean-Auswahl-Seite.
   * Wird aufgerufen, wenn der Nutzer den "Los geht's!"-Button klickt.
   *
   * @returns {void}
   */
  start(): void {
    this.router.navigate(['/selection']);
  }
}
