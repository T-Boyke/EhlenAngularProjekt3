import { Component, inject, signal, effect, computed, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../store/quiz.store';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [], 
  styleUrl: './quiz.component.css',
  template: `
    <div class="quiz">
      
      <button (click)="exitQuiz()" class="quiz__exit-btn">
        ⬅ Beenden
      </button>

      @if (store.currentQuestion(); as question) {
        <div class="quiz__card">
          
          <div class="quiz__image-wrapper">
             <img [src]="question.quizimage" class="quiz__image"
                  fetchpriority="high" 
                  loading="eager"
                  (error)="handleMissingImage($event)">
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

          <div class="quiz__progress-bg">
            <div class="quiz__progress-bar" [style.width.%]="store.progress()"></div>
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
  store = inject(QuizService);
  private router = inject(Router);

  selectedOption = signal<string | null>(null);
  isCorrect = signal<boolean | null>(null);
  showFeedback = signal(false);

  // Timer for Master Mode
  timeLeft = signal(5);
  timerInterval: ReturnType<typeof setInterval> | undefined;

  constructor() {
    effect(() => {
      if (this.store.isQuizFinished()) {
        this.router.navigate(['/result']);
      }
    });

    // Effect to reset timer when question changes
    effect(() => {
      // Abhängigkeit herstellen
      const idx = this.store.currentQuestionIndex(); 
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
    // Timeout wird wie eine falsche Antwort behandelt
    this.selectOption('__TIMEOUT__');
  }

  getOptionClass(option: string): string {
    if (!this.selectedOption()) return 'hover:bg-white/60';

    const currentQuestion = this.store.currentQuestion();
    if (!currentQuestion) return '';

    if (option === currentQuestion.answer) {
      return '!bg-green-500 !border-green-600 text-white scale-105 shadow-xl';
    }

    if (option === this.selectedOption()) {
      return '!bg-red-500 !border-red-600 text-white';
    }

    return '!bg-gray-300/50 !text-gray-500 !border-transparent opacity-50 grayscale';
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

  // NEU: Methode hinzugefügt
  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/images/pacific.png';
  }
}