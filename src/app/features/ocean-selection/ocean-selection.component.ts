import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../store/quiz.store';

@Component({
  selector: 'app-ocean-selection',
  standalone: true,
  imports: [],
  styleUrl: './ocean-selection.component.css',
  template: `
    <div class="ocean-selection">
      <h2 class="ocean-selection__title">Wähle einen Ozean</h2>
      
      <div class="ocean-selection__grid">
        @for (ocean of store.oceans(); track ocean.id) {
          <div (click)="selectOcean(ocean.id)" 
               class="ocean-card group"
               [style.animation-delay]="$index * 100 + 'ms'">
            
            <div class="ocean-card__image-wrapper">
               <img [src]="ocean.oceanimage" [alt]="ocean.name" class="ocean-card__image" 
                    (error)="handleMissingImage($event)">
            </div>
            
            <h3 class="ocean-card__title">{{ ocean.name }}</h3>

            <div class="ocean-card__star"
                 [class.ocean-card__star--active]="store.isOceanCompleted(ocean.id)"
                 [class.ocean-card__star--inactive]="!store.isOceanCompleted(ocean.id)">
              ★
            </div>
          </div>
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
            <div class="master-quiz-btn__progress-bar"
                 [style.width.%]="(store.completedOceans().length / 5) * 100"></div>
          }
        </button>
      </div>
    </div>
  `
})
export class OceanSelectionComponent implements OnInit {
  store = inject(QuizService);
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

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/images/pacific.png';
  }
}