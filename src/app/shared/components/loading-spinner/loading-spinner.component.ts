import { Component } from '@angular/core';

/**
 * Eine wiederverwendbare Lade-Animation (Spinner).
 *
 * Verwendungszweck:
 * - Signalisiert dem Nutzer, dass Daten geladen werden.
 * - Überbrückt die Wartezeit (z.B. API-Calls, Failover).
 *
 * Design:
 * - Glassmorphism-Stil passend zum Ozean-Thema.
 * - Zentriert im Container oder Viewport.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-container">
      <div class="spinner"></div>
      <p class="spinner-text">Lade Ozeane...</p>
    </div>
  `,
  styles: [
    `
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 1rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #ffffff;
        animation: spin 1s ease-in-out infinite;
        margin-bottom: 1rem;
      }

      .spinner-text {
        color: white;
        font-family: 'Fredoka', sans-serif;
        font-size: 1.2rem;
        letter-spacing: 1px;
        animation: pulse 2s infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }
    `,
  ],
})
export class LoadingSpinnerComponent {}
