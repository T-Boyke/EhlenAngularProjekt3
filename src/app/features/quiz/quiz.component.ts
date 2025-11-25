import { Component, inject, signal, effect, computed, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../store/quiz.store';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [], 
  template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-start pt-20 md:pt-32 p-4 relative">
      
      <button (click)="exitQuiz()" class="absolute top-6 left-6 glass-btn p-3 rounded-full z-10">
        ⬅ Beenden
      </button>

      @if (store.currentQuestion(); as question) {
        <div class="glass-card w-full max-w-3xl flex flex-col items-center gap-6 animate-pop-in relative">
          
          <div class="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-white/30 shadow-inner flex items-center justify-center">
             <img [src]="question.quizimage" class="w-full h-full object-cover"
                  fetchpriority="high" 
                  loading="eager"
                  (error)="handleMissingImage($event)">
          </div>

          <h2 class="text-2xl font-bold text-blue-900 text-center">{{ question.question }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            @for (option of question.options; track $index) {
              <button (click)="selectOption(option)" 
                      [disabled]="selectedOption() !== null" 
                      class="glass-btn text-lg w-full transition-all duration-300"
                      [class]="getOptionClass(option)">
                {{ option }}
              </button>
            }
          </div>

          <div class="w-full h-2 bg-white/30 rounded-full overflow-hidden mt-4">
            <div class="h-full bg-blue-500 transition-all duration-500" [style.width.%]="store.progress()"></div>
          </div>

          @if (store.masterMode() && !selectedOption()) {
            <div class="absolute top-4 right-4 text-2xl font-bold text-blue-700 bg-white/70 px-4 py-2 rounded-lg shadow-md animate-pulse"
                 [class.text-red-600]="timeLeft() <= 2">
              {{ timeLeft() }}s
            </div>
          }

          @if (showFeedback()) {
            <div class="w-full p-4 rounded-xl bg-white/40 mt-4 border-l-4 transition-all duration-300 animate-slide-up"
                 [class]="isCorrect() ? 'border-green-500' : 'border-red-500'">
              <h3 class="font-bold text-lg mb-2" 
                  [class]="isCorrect() ? 'text-green-800' : 'text-red-800'">
                {{ isCorrect() ? 'Richtig! 🎉' : 'Leider falsch...' }}
              </h3>
              <p class="text-slate-800">{{ question.trivia }}</p>
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