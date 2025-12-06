import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Startseite der Anwendung.
 *
 * Funktion:
 * - Dient als Einstiegspunkt für den Nutzer.
 * - Zeigt den Titel der App und ein motivierendes Logo.
 * - Präsentiert einen zufälligen oder statischen Fakt ("Wusstest du schon?").
 * - Weist den Benutzer per Button zur Ozean-Auswahl.
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

        <button (click)="start()" class="start-page__button">
          Los geht's! 🚀
        </button>
      </div>
    </div>
  `
})
export class StartComponent {
    // Einfache Navigation via Router
    private router = inject(Router);

    /** Navigiert zur Auswahlseite der Ozeane. */
    start() {
        this.router.navigate(['/selection']);
    }
}
