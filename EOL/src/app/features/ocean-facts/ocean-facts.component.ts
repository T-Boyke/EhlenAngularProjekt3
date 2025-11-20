import { Component, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ocean-facts',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      <!-- Back Button -->
      <button (click)="goBack()" class="absolute top-6 left-6 glass-btn p-3 rounded-full z-10">
        ⬅ Zurück
      </button>

      @if (store.currentOcean(); as ocean) {
        <div class="glass-card w-full max-w-4xl flex flex-col md:flex-row gap-8 items-center min-h-[400px] animate-pop-in relative">
          
          <!-- Image Side -->
          <div class="w-full md:w-1/2 h-64 md:h-80 rounded-xl overflow-hidden bg-white/30 shadow-inner flex items-center justify-center">
             <img [src]="currentSlide().image" [alt]="currentSlide().title" class="w-full h-full object-cover"
                  onerror="this.src='assets/images/pacific.png'">
          </div>

          <!-- Content Side -->
          <div class="w-full md:w-1/2 flex flex-col justify-center">
            <h2 class="text-3xl font-bold text-blue-900 mb-4">{{ currentSlide().title }}</h2>
            <p class="text-lg text-slate-800 leading-relaxed">{{ currentSlide().text }}</p>
          </div>

          <!-- Navigation Buttons -->
          <div class="absolute bottom-4 right-4 flex gap-4">
             <button (click)="prevSlide()" class="glass-btn px-4 py-2">◀</button>
             <button (click)="nextSlide()" class="glass-btn px-4 py-2">▶</button>
          </div>

          <!-- Carousel Progress Bar -->
          <div class="absolute bottom-0 left-0 w-full h-2 bg-white/30">
            <div class="h-full bg-blue-500 transition-all duration-300"
                 [style.width.%]="((slideIndex() + 1) / slides().length) * 100">
            </div>
          </div>
        </div>

        <!-- Start Quiz Button -->
        <div class="mt-8 h-14 flex items-center justify-center transition-all duration-500"
             [class.opacity-0]="!hasViewedAll()"
             [class.invisible]="!hasViewedAll()">
          <button (click)="startQuiz()" class="glass-btn glass-btn-primary text-xl animate-wiggle">
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
      // Also mark as viewed if we reach the last slide
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
