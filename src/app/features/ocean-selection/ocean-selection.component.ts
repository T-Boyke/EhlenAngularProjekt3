import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { OceanCardComponent } from '../../shared/components/ocean-card/ocean-card.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

/**
 * Die Komponente für die Auswahl eines Ozeans.
 *
 * Verwendungszweck:
 * - Dient als Hauptmenü der Anwendung.
 * - Präsentiert alle verfügbaren Ozeane in einem Grid.
 * - Visualisiert den Fortschritt zum "Master-Quiz".
 *
 * Funktionalität:
 * - Lazy Loading der Ozean-Daten beim Initialisieren.
 * - Navigation zur Detailansicht (Fakten) bei Klick auf einen Ozean.
 * - Start des Master-Quiz, wenn alle Ozeane abgeschlossen sind.
 *
 * Abhängigkeiten:
 * - {@link QuizStore}: Globaler State Manager für Quiz- und Ozean-Daten.
 */
@Component({
  selector: 'app-ocean-selection',
  standalone: true,
  imports: [OceanCardComponent, ProgressBarComponent, LoadingSpinnerComponent],
  styleUrl: './ocean-selection.component.css',
  template: `
    <div class="ocean-selection">
      <h2 class="ocean-selection__title">Wähle einen Ozean</h2>

      <!-- Grid-Layout für die Ozean-Karten -->
      <div class="ocean-selection__grid">
        @if (store.isLoading()) {
        <div class="ocean-selection__loading">
          <app-loading-spinner></app-loading-spinner>
        </div>
        } @else {
        <!-- @for Block (Angular Control Flow Syntax) -->
        @for (ocean of store.oceans(); track ocean.id) {
        <app-ocean-card
          [ocean]="ocean"
          [isCompleted]="store.isOceanCompleted(ocean.id)"
          [priority]="$index < 5"
          (oceanSelected)="selectOcean($event)"
          [style.animation-delay]="$index * 100 + 'ms'"
        >
          <!-- Animation Delay sorgt für einen kaskadierenden Einblend-Effekt -->
        </app-ocean-card>
        } }
      </div>

      <div class="ocean-selection__actions">
        <!--
            Button für das Master-Quiz.
            Ist deaktiviert (und visuell gesperrt), solange nicht alle Ozeane gemeistert wurden.
        -->
        <button
          (click)="startMasterQuiz()"
          [disabled]="!store.isMasterUnlocked()"
          class="master-quiz-btn group"
          [class.master-quiz-btn--unlocked]="store.isMasterUnlocked()"
          [class.master-quiz-btn--locked]="!store.isMasterUnlocked()"
        >
          @if (store.isMasterUnlocked()) {
          <span class="master-quiz-btn__icon">🏆</span>
          <span>ULTIMATIVES QUIZ STARTEN</span>
          <span class="master-quiz-btn__icon">🏆</span>
          } @else {
          <span class="master-quiz-btn__lock-text">🔒 Sammle alle 5 Sterne!</span>
          }

          <!-- Fortschrittsbalken, nur sichtbar wenn noch gesperrt -->
          @if (!store.isMasterUnlocked()) {
          <div class="master-quiz-btn__progress-wrapper">
            <app-progress-bar
              [progress]="(store.completedOceans().length / 5) * 100"
            ></app-progress-bar>
          </div>
          }
        </button>
      </div>
    </div>
  `,
})
export class OceanSelectionComponent implements OnInit {
  // Zugriff auf den globalen Store
  readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  /**
   * Initialisiert die Komponente.
   * Prüft, ob Ozean-Daten bereits geladen sind, und fordert diese ggf. an.
   */
  ngOnInit(): void {
    if (this.store.oceans().length === 0) {
      this.store.loadOceans();
    }
  }

  /**
   * Behandelt die Auswahl eines Ozeans durch den Nutzer.
   * Setzt den ausgewählten Ozean im Store und navigiert zur Fakten-Ansicht.
   *
   * @param {string} id - Die eindeutige ID des ausgewählten Ozeans.
   * @returns {void}
   */
  selectOcean(id: string): void {
    this.store.selectOcean(id);
    this.router.navigate(['/facts', id]);
  }

  /**
   * Startet das Master-Quiz, sofern die Voraussetzungen (Unlock) erfüllt sind.
   * Navigiert zur Quiz-Ansicht.
   *
   * @returns {void}
   */
  startMasterQuiz(): void {
    if (this.store.isMasterUnlocked()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    }
  }
}
