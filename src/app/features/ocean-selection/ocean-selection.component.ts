import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { OceanCardComponent } from '../../shared/components/ocean-card/ocean-card.component';
import { ProgressBarComponent } from '../../shared/components/progress-bar/progress-bar.component';

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
            <span class="master-quiz-btn__lock-text">🔒 Sammle alle 5 Sterne!</span>
          }
          
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
  store = inject(QuizStore);
  private router = inject(Router);

  ngOnInit() {
    if (this.store.oceans().length === 0) {
      this.store.loadOceans();
    }
  }

  selectOcean(id: string) {
    this.store.selectOcean(id);
    this.router.navigate(['/facts', id]);
  }

  startMasterQuiz() {
    if (this.store.isMasterUnlocked()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    }
  }
}