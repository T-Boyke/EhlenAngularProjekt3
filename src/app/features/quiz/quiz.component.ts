import { Component, inject, signal, effect, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

/**
 * Die Haupt-Komponente für das Quiz-Spiel.
 *
 * Verantwortlichkeit:
 * - Darstellung der aktuellen Frage und Antwortmöglichkeiten.
 * - Visuelles Feedback (Animationen, Farben) für richtig/falsch.
 * - Timer-Logik im "Master-Modus".
 * - Steuerung des Spielablaufs via QuizStore.
 *
 * Features:
 * - Eingebauter Countdown (5 Sekunden) im Master-Modus.
 * - Angular Animations für weiche Übergänge (@fadeIn, @slideUp).
 */
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ImageFallbackDirective],
  styleUrl: './quiz.component.css',
  template: `
    <div class="quiz">

      <button (click)="exitQuiz()" class="quiz__exit-btn">
        ⬅ Beenden
      </button>

      @if (store.currentQuestion(); as question) {
        <div class="quiz__card" @fadeIn>

          <div class="quiz__image-wrapper">
             <img [src]="question.quizimage"
                  [alt]="'Bild zur Frage: ' + question.question"
                  class="quiz__image"
                  fetchpriority="high"
                  loading="eager"
                  appImageFallback>
          </div>

          <h2 class="quiz__question">{{ question.question }}</h2>

          <div class="quiz__options-grid">
            @for (option of question.options; track $index) {
              <button (click)="selectOption(option)"
                      [disabled]="selectedOption() !== null"
                      class="quiz__option-btn"
                      [class]="getOptionClass(option)">
                {{ option }}
              </button>
            }
          </div>

          <!-- Fortschrittsanzeige innerhalb des Quizzes -->
          <div class="quiz__progress-container">
            <div class="quiz__progress-fill" [style.width.%]="store.progress()"></div>
          </div>

          <!-- Master-Modus Timer -->
          @if (store.masterMode() && !selectedOption()) {
            <div class="quiz__timer"
                 [class.quiz__timer--critical]="timeLeft() <= 2">
              {{ timeLeft() }}s
            </div>
          }

          <!-- Feedback-Overlay nach Antwort -->
          @if (showFeedback()) {
            <div class="quiz__feedback" @slideUp
                 [class.quiz__feedback--correct]="isCorrect()"
                 [class.quiz__feedback--wrong]="!isCorrect()">
              <h3 class="quiz__feedback-title"
                  [class.quiz__feedback-title--correct]="isCorrect()"
                  [class.quiz__feedback-title--wrong]="!isCorrect()">
                {{ isCorrect() ? 'Richtig! 🎉' : 'Leider falsch...' }}
              </h3>
              <!-- Trivia: Zusätzliche Lern-Info zur Auflösung -->
              <p class="quiz__feedback-text">{{ question.trivia }}</p>
            </div>
          }
        </div>
      }
    </div>
  `,
  animations: [
    // Definiert Einblend-Animationen für das UX
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ]),
    trigger('slideUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class QuizComponent implements OnInit, OnDestroy {
  store = inject(QuizStore);
  private router = inject(Router);

  // Lokaler UI-State (nicht im globalen Store, da nur für Anzeige relevant)
  selectedOption = signal<string | null>(null);
  isCorrect = signal<boolean | null>(null);
  showFeedback = signal(false);

  // Timer State
  timeLeft = signal(5);
  timerInterval: ReturnType<typeof setInterval> | undefined;

  constructor() {
    // Effect: Überwacht das Spielende und navigiert zur Ergebnisseite
    effect(() => {
      if (this.store.isQuizFinished()) {
        this.router.navigate(['/result']);
      }
    });

    // Effect: Startet den Timer neu, wenn sich der Frage-Index ändert (im Master Modus)
    effect(() => {
      this.store.currentQuestionIndex(); // Registriere Abhängigkeit
      if (this.store.masterMode() && !this.store.isQuizFinished()) {
        this.startTimer();
      }
    });
  }

  ngOnInit() {
    // Sicherheitsprüfung: Wenn kein Ozean gewählt ist (z.B. Reload), zurück zum Start
    if (!this.store.currentOcean()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    // Wichtig: Timer aufräumen, um Memory Leaks zu vermeiden
    this.stopTimer();
  }

  // --- Timer Logik ---

  startTimer() {
    this.stopTimer();
    this.timeLeft.set(5);

    this.timerInterval = setInterval(() => {
      this.timeLeft.update(t => t - 1);
      if (this.timeLeft() <= 0) {
        this.handleTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = undefined;
    }
  }

  /**
   * Wird aufgerufen, wenn die Zeit abläuft.
   * Wertet dies als falsche Antwort (Timeout).
   */
  handleTimeout() {
    this.stopTimer();
    this.selectOption('__TIMEOUT__'); // Dummy-Wert, der garantiert falsch ist
  }

  /**
   * Gibt die passende BEM Modifier-Klasse zurück, um die Buttons einzufärben.
   * Kapselt die UI-Logik sauber.
   */
  getOptionClass(option: string): string {
    const selected = this.selectedOption();
    if (!selected) return ''; // Standard State (noch keine Wahl getroffen)

    const currentQuestion = this.store.currentQuestion();
    if (!currentQuestion) return '';

    // Fall 1: Dies ist die korrekte Antwort (immer grün anzeigen zur Auflösung)
    if (option === currentQuestion.answer) {
      return 'quiz__option-btn--correct';
    }

    // Fall 2: Der Nutzer hat diese Antwort gewählt, aber sie ist falsch
    if (option === selected) {
      return 'quiz__option-btn--wrong';
    }

    // Fall 3: Weder gewählt noch korrekt (ausgrauen)
    return 'quiz__option-btn--muted';
  }

  /**
   * Verarbeitet die Antwort-Auswahl des Nutzers.
   */
  selectOption(option: string) {
    // Verhindert Mehrfach-Klicks
    if (this.selectedOption()) return;

    this.stopTimer();
    this.selectedOption.set(option);

    const currentQuestion = this.store.currentQuestion();
    if (currentQuestion) {
      const correct = option === currentQuestion.answer;
      this.isCorrect.set(correct);

      // Zustand im Store aktualisieren (Score)
      this.store.answerQuestion(option);

      // Feedback anzeigen
      this.showFeedback.set(true);

      // Kurze Verzögerung, damit der Nutzer das Feedback lesen kann, bevor es weitergeht
      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    }
  }

  /**
   * Bereitet die UI auf die nächste Frage vor.
   */
  nextQuestion() {
    this.selectedOption.set(null);
    this.isCorrect.set(null);
    this.showFeedback.set(false);
    this.store.nextQuestion();
  }

  exitQuiz() {
    this.store.exitQuiz();
    this.router.navigate(['/selection']);
  }
}
