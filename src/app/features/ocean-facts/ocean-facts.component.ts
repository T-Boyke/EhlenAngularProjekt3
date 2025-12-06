import { Component, inject, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

/**
 * Komponente für den Lern-Modus ("Fakten").
 *
 * Verantwortlichkeit:
 * - Zeigt Informationen zum gewählten Ozean an.
 * - Präsentiert Inhalte als Slideshow (Einleitung -> Fakten -> Bewohner).
 * - Dient als Vorbereitung für das anschließende Quiz.
 * - Button zum Quiz-Start erscheint erst, wenn alle Slides angesehen wurden ("Lernzwang" 😉).
 */
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

      <!-- Angular Control Flow: Wenn ein Ozean geladen ist... -->
      @if (store.currentOcean(); as ocean) {
        <div class="ocean-facts__card">

          <div class="ocean-facts__image-wrapper">
             <!-- fetchpriority="high" für schnelleres Laden des Hauptbildes (LCP) -->
             <img [src]="currentSlide().image" [alt]="currentSlide().title" class="ocean-facts__image" fetchpriority="high"
                  loading="eager" appImageFallback>
          </div>

          <div class="ocean-facts__content">
            <h2 class="ocean-facts__title">{{ currentSlide().title }}</h2>
            <p class="ocean-facts__text">{{ currentSlide().text }}</p>
          </div>

          <!-- Navigation für die Slides -->
          <div class="ocean-facts__nav">
             <button (click)="prevSlide()" class="ocean-facts__nav-btn">◀</button>
             <button (click)="nextSlide()" class="ocean-facts__nav-btn">▶</button>
          </div>

          <!-- Fortschrittsbalken für die Slideshow -->
          <div class="ocean-facts__progress-container">
            <div class="ocean-facts__progress-fill"
                 [style.width.%]="((slideIndex() + 1) / slides().length) * 100">
            </div>
          </div>
        </div>

        <!--
           Quiz-Start Button.
           Wird initial versteckt/deaktiviert und erscheint erst,
           wenn der Nutzer alle Folien durchgeklickt hat (hasViewedAll).
        -->
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

  // State für die Slideshow
  slideIndex = signal(0);
  // Merkt sich, ob der Nutzer am Ende der Slideshow war (Freischaltbedingung)
  hasViewedAll = signal(false);

  /**
   * Berechnet die Liste der anzuzeigenden Slides dynamisch.
   * Ein Slide besteht aus Titel, Text und Bild.
   * Zusammensetzung: [Intro-Slide] + [Fakten-Slides] + [Bewohner-Slides]
   */
  slides = computed(() => {
    const ocean = this.store.currentOcean();
    if (!ocean) return [];

    const slides = [
      // 1. Das Intro (Beschreibung des Ozeans)
      {
        title: ocean.name,
        text: ocean.description,
        image: ocean.oceanimage
      },
      // 2. Alle allgemeinen Fakten
      ...ocean.facts.map((fact, index) => ({
        title: `Fakt #${index + 1}`,
        text: fact,
        image: ocean.oceanimage // Nutzt vorerst das Hauptbild
      })),
      // 3. Alle Bewohner
      ...ocean.inhabitants.map(animal => ({
        title: animal.name,
        text: animal.description,
        image: animal.image
      }))
    ];

    return slides;
  });

  /** Gibt den aktuell sichtbaren Slide zurück. */
  currentSlide = computed(() => {
    const slides = this.slides();
    return slides[this.slideIndex()] || { title: '', text: '', image: '' };
  });

  /** Blättert vorwärts. Markiert "Alles gesehen", wenn das Ende erreicht wird. */
  nextSlide() {
    this.slideIndex.update(i => {
      const next = (i + 1) % this.slides().length;
      // Prüfung: Sind wir am Ende oder laufen wir gerade vom Ende zum Start über?
      if (next === this.slides().length - 1 || (next === 0 && i === this.slides().length - 1)) {
        this.hasViewedAll.set(true);
      }
      return next;
    });
  }

  /** Blättert rückwärts (Endlos-Schleife). */
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
