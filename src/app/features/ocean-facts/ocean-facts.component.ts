import { Component, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

@Component({
  selector: 'app-ocean-facts',
  standalone: true,
  imports: [ImageFallbackDirective],
  styleUrl: './ocean-facts.component.css',
  template: `
    <div class="ocean-facts">
      <button (click)="goBack()" class="ocean-facts__back-btn">
        ⬅ Zurück
      </button>

      @if (store.currentOcean(); as ocean) {
        <div class="ocean-facts__card">
          
          <div class="ocean-facts__image-wrapper">
             <img [src]="currentSlide().image" [alt]="currentSlide().title" class="ocean-facts__image" fetchpriority="high"
                  loading="eager" appImageFallback>
          </div>

          <div class="ocean-facts__content">
            <h2 class="ocean-facts__title">{{ currentSlide().title }}</h2>
            <p class="ocean-facts__text">{{ currentSlide().text }}</p>
          </div>

          <div class="ocean-facts__nav">
             <button (click)="prevSlide()" class="ocean-facts__nav-btn">◀</button>
             <button (click)="nextSlide()" class="ocean-facts__nav-btn">▶</button>
          </div>

          <div class="ocean-facts__progress-container">
            <div class="ocean-facts__progress-fill"
                 [style.width.%]="((slideIndex() + 1) / slides().length) * 100">
            </div>
          </div>
        </div>

        <div class="ocean-facts__quiz-wrapper"
             [class.ocean-facts__quiz-wrapper--hidden]="!hasViewedAll()">
          <button (click)="startQuiz()" class="ocean-facts__quiz-btn">
            Quiz Starten 🎮
          </button>
        </div>
      }
    </div>
  `
})
export class OceanFactsComponent {
  store = inject(QuizStore);
  private router = inject(Router);

  slideIndex = signal(0);
  hasViewedAll = signal(false);

  slides = computed(() => {
    const ocean = this.store.currentOcean();
    if (!ocean) return [];

    const slides = [
      {
        title: ocean.name,
        text: ocean.description,
        image: ocean.oceanimage
      },
      ...ocean.facts.map((fact, index) => ({
        title: `Fakt #${index + 1}`,
        text: fact,
        image: ocean.oceanimage
      })),
      ...ocean.inhabitants.map(animal => ({
        title: animal.name,
        text: animal.description,
        image: animal.image
      }))
    ];

    return slides;
  });

  currentSlide = computed(() => {
    const slides = this.slides();
    return slides[this.slideIndex()] || { title: '', text: '', image: '' };
  });

  nextSlide() {
    this.slideIndex.update(i => {
      const next = (i + 1) % this.slides().length;
      if (next === this.slides().length - 1 || (next === 0 && i === this.slides().length - 1)) {
        this.hasViewedAll.set(true);
      }
      return next;
    });
  }

  prevSlide() {
    this.slideIndex.update(i => (i - 1 + this.slides().length) % this.slides().length);
  }

  goBack() {
    this.router.navigate(['/selection']);
  }

  startQuiz() {
    this.store.startQuiz();
    this.router.navigate(['/quiz']);
  }
}