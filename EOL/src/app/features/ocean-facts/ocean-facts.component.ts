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
                  onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBmaWxsPSIjYmZkYmZlIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI1MCI+8J+MjwvdGV4dD48L3N2Zz4='">
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
        </div>

        <!-- Start Quiz Button -->
        <div class="mt-8">
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
                image: ocean.oceanimage // Reuse ocean image or have specific fact images if available
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
        this.slideIndex.update(i => (i + 1) % this.slides().length);
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
