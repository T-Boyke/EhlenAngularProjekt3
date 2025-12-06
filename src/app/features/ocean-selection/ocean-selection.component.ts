import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { OceanCardComponent } from '../../shared/components/ocean-card/ocean-card.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

/**
 * Komponente für die Auswahl eines Ozeans.
 *
 * Verantwortlichkeit:
 * - Listet alle verfügbaren Ozeane als interaktive Karten auf.
 * - Zeigt den Gesamtfortschritt beim Freischalten des "Master-Quiz" an.
 * - Ermöglicht den Start des Master-Quiz, sobald die Bedingung (5 Sterne) erfüllt ist.
 *
 * Abhängigkeiten:
 * - `QuizStore`: Zum Laden der Ozeane und Prüfen des Fortschritts.
 * - `OceanCardComponent`: Zur Darstellung der einzelnen Einträge.
 */
@Component({
  selector: 'app-ocean-selection',
  standalone: true,
  imports: [OceanCardComponent, ProgressBarComponent],
  styleUrl: './ocean-selection.component.css',
  template: `
    <div class="ocean-selection">
      <h2 class="ocean-selection__title">Wähle einen Ozean</h2>

      <!-- Grid-Layout für die Ozean-Karten -->
      <div class="ocean-selection__grid">
        <!-- @for Block (Angular Control Flow Syntax) -->
        @for (ocean of store.oceans(); track ocean.id) {
          <app-ocean-card
            [ocean]="ocean"
            [isCompleted]="store.isOceanCompleted(ocean.id)"
            [priority]="$index < 4"
            (oceanSelected)="selectOcean($event)"
            [style.animation-delay]="$index * 100 + 'ms'">
            <!-- Animation Delay sorgt für einen kaskadierenden Einblend-Effekt -->
          </app-ocean-card>
        }
      </div>

      <div class="ocean-selection__actions">
        <!--
            Button für das Master-Quiz.
            Ist deaktiviert (und visuell gesperrt), solange nicht alle Ozeane gemeistert wurden.
        -->
        <button (click)="startMasterQuiz()"
                [disabled]="!store.isMasterUnlocked()"
                class="master-quiz-btn group"
                [class.master-quiz-btn--unlocked]="store.isMasterUnlocked()"
                [class.master-quiz-btn--locked]="!store.isMasterUnlocked()">

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
               <app-progress-bar [progress]="(store.completedOceans().length / 5) * 100"></app-progress-bar>
            </div>
          }
        </button>
      </div>
    </div>
  `
})
export class OceanSelectionComponent implements OnInit {
  // Zugriff auf den globalen Store
  store = inject(QuizStore);
  private router = inject(Router);

  ngOnInit() {
    // Daten lazy laden: Nur abrufen, wenn noch keine Ozeane im Speicher sind.
    if (this.store.oceans().length === 0) {
      this.store.loadOceans();
    }
  }

  /**
   * Wird aufgerufen, wenn eine Ozean-Karte angeklickt wird.
   * Setzt den State im Store und navigiert zur Fakten-Seite.
   */
  selectOcean(id: string) {
    this.store.selectOcean(id);
    this.router.navigate(['/facts', id]);
  }

  /**
   * Startet das Master-Quiz, sofern freigeschaltet.
   */
  startMasterQuiz() {
    if (this.store.isMasterUnlocked()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    }
  }
}
