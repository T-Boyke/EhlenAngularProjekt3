import { Component, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../store/quiz.store';
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

          <div class="ocean-facts__progress-bar-bg">
            <div class="ocean-facts__progress-bar"
                 [style.width.%]="((slideIndex() + 1) / slides().length) * 100">
            </div>
          </div>
        </div>

        <div class="ocean-facts__quiz-btn-wrapper"
             [class.ocean-facts__quiz-btn-wrapper--hidden]="!hasViewedAll()">
          <button (click)="startQuiz()" class="ocean-facts__quiz-btn">
            Quiz Starten 🎮
          </button>
        </div>
      }
    </div>
  `
})
export class OceanFactsComponent {
  store = inject(QuizService);
  private router = inject(Router);

  slideIndex = signal(0);
  hasViewedAll = signal(false);

  slides = computed(() => {
    const ocean = this.store.currentOcean();
    if (!ocean) return [];

    const slides = [];

    // General Ocean Fact
    slides.push({
      title: ocean.name,
      text: ocean.description,
      image: ocean.oceanimage
    });

    // Specific Facts
    ocean.facts.forEach((fact, index) => {
      slides.push({
        title: `Fakt #${index + 1}`,
        text: fact,
        image: ocean.oceanimage
      });
    });

    // Inhabitants
    ocean.inhabitants.forEach(animal => {
      slides.push({
        title: animal.name,
        text: animal.description,
        image: animal.image
      });
    });

    return slides;
  });

  currentSlide = computed(() => {
    const slides = this.slides();
    if (slides.length === 0) return { title: '', text: '', image: '' };
    return slides[this.slideIndex()];
  });

  nextSlide() {
    this.slideIndex.update(i => {
      const next = (i + 1) % this.slides().length;
      if (next === 0 && i === this.slides().length - 1) {
        this.hasViewedAll.set(true);
      }
      if (next === this.slides().length - 1) {
        this.hasViewedAll.set(true);
      }
      return next;
    });
  }

  prevSlide() {
    this.slideIndex.update(i => (i - 1 + this.slides().length) % this.slides().length);
  }

  goToSlide(index: number) {
    this.slideIndex.set(index);
    if (index === this.slides().length - 1) {
      this.hasViewedAll.set(true);
    }
  }

  goBack() {
    this.router.navigate(['/selection']);
  }

  startQuiz() {
    this.store.startQuiz();
    this.router.navigate(['/quiz']);
  }
}