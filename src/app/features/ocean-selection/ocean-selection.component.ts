import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../store/quiz.store';
import { OceanCardComponent } from '../../shared/components/ocean-card/ocean-card.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

/**
 * Ocean Selection Page
 * 
 * @description
 * Hauptseite zur Auswahl der Ozeane.
 * Zeigt eine Liste aller verfügbaren Ozeane als Karten an.
 * Ermöglicht den Start des Master-Quiz, wenn alle Ozeane erkundet wurden.
 */
@Component({
  selector: 'app-ocean-selection',
  standalone: true,
  imports: [OceanCardComponent, ProgressBarComponent],
  styleUrl: './ocean-selection.component.css',
  template: `
    <div class="ocean-selection">
      <h2 class="ocean-selection__title">Wähle einen Ozean</h2>
      
      <div class="ocean-selection__grid">
        @for (ocean of store.oceans(); track ocean.id) {
          <app-ocean-card 
            [ocean]="ocean"
            [isCompleted]="store.isOceanCompleted(ocean.id)"
            [priority]="$index < 4"
            (select)="selectOcean($event)"
            [style.animation-delay]="$index * 100 + 'ms'">
          </app-ocean-card>
        }
      </div>

      <div class="ocean-selection__actions">
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
            <span>🔒 Sammle alle 5 Sterne!</span>
          }
          
          @if (!store.isMasterUnlocked()) {
            <div class="absolute bottom-0 left-0 w-full">
               <app-progress-bar [progress]="(store.completedOceans().length / 5) * 100"></app-progress-bar>
            </div>
          }
        </button>
      </div>
    </div>
  `
})
export class OceanSelectionComponent implements OnInit {
  store = inject(QuizService);
  private router = inject(Router);

  /**
   * Initialisiert die Komponente.
   * Lädt die Ozeane, falls noch nicht vorhanden.
   */
  ngOnInit() {
    if (this.store.oceans().length === 0) {
      this.store.loadOceans();
    }
  }

  /**
   * Wählt einen Ozean aus und navigiert zur Fakten-Seite.
   * @param id Die ID des gewählten Ozeans.
   */
  selectOcean(id: string) {
    this.store.selectOcean(id);
    this.router.navigate(['/facts', id]);
  }

  /**
   * Startet das Master-Quiz, wenn freigeschaltet.
   */
  startMasterQuiz() {
    if (this.store.isMasterUnlocked()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    }
  }
}