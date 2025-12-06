import { Component, inject, signal, effect, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { ImageFallbackDirective } from '../../shared/directives/image-fallback.directive';

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
        <div class="quiz__card">

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

          <div class="quiz__progress-container">
            <div class="quiz__progress-fill" [style.width.%]="store.progress()"></div>
          </div>

          @if (store.masterMode() && !selectedOption()) {
            <div class="quiz__timer"
                 [class.quiz__timer--critical]="timeLeft() <= 2">
              {{ timeLeft() }}s
            </div>
          }

          @if (showFeedback()) {
            <div class="quiz__feedback"
                 [class.quiz__feedback--correct]="isCorrect()"
                 [class.quiz__feedback--wrong]="!isCorrect()">
              <h3 class="quiz__feedback-title"
                  [class.quiz__feedback-title--correct]="isCorrect()"
                  [class.quiz__feedback-title--wrong]="!isCorrect()">
                {{ isCorrect() ? 'Richtig! 🎉' : 'Leider falsch...' }}
              </h3>
              <p class="quiz__feedback-text">{{ question.trivia }}</p>
            </div>
          }
        </div>
      }
    </div>
  `
})
export class QuizComponent implements OnInit, OnDestroy {
  store = inject(QuizStore);
  private router = inject(Router);

  selectedOption = signal<string | null>(null);
  isCorrect = signal<boolean | null>(null);
  showFeedback = signal(false);

  timeLeft = signal(5);
  timerInterval: ReturnType<typeof setInterval> | undefined;

  constructor() {
    effect(() => {
      if (this.store.isQuizFinished()) {
        this.router.navigate(['/result']);
      }
    });

    effect(() => {
      this.store.currentQuestionIndex(); // Dependency tracking
      if (this.store.masterMode() && !this.store.isQuizFinished()) {
        this.startTimer();
      }
    });
  }

  ngOnInit() {
    if (!this.store.currentOcean()) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

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

  handleTimeout() {
    this.stopTimer();
    this.selectOption('__TIMEOUT__');
  }

  /**
   * Gibt die passende BEM Modifier-Klasse zurück.
   * Kapselt die UI-Logik sauber.
   */
  getOptionClass(option: string): string {
    const selected = this.selectedOption();
    if (!selected) return ''; // Standard State

    const currentQuestion = this.store.currentQuestion();
    if (!currentQuestion) return '';

    // Fall 1: Dies ist die korrekte Antwort
    if (option === currentQuestion.answer) {
      return 'quiz__option-btn--correct';
    }

    // Fall 2: Der Nutzer hat diese (falsche) Antwort gewählt
    if (option === selected) {
      return 'quiz__option-btn--wrong';
    }

    // Fall 3: Weder gewählt noch korrekt (ausgrauen)
    return 'quiz__option-btn--muted';
  }

  selectOption(option: string) {
    if (this.selectedOption()) return;

    this.stopTimer();
    this.selectedOption.set(option);

    const currentQuestion = this.store.currentQuestion();
    if (currentQuestion) {
      const correct = option === currentQuestion.answer;
      this.isCorrect.set(correct);
      this.store.answerQuestion(option);
      this.showFeedback.set(true);

      setTimeout(() => {
        this.nextQuestion();
      }, 1500);
    }
  }

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
