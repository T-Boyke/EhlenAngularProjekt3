import { Component, inject, signal, effect, computed } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      <!-- Back Button -->
      <button (click)="exitQuiz()" class="absolute top-6 left-6 glass-btn p-3 rounded-full z-10">
        ⬅ Beenden
      </button>

      @if (store.currentQuestion(); as question) {
        <div class="glass-card w-full max-w-3xl flex flex-col items-center gap-6 animate-pop-in relative">
          
          <!-- Image -->
          <div class="w-full h-48 md:h-64 rounded-xl overflow-hidden bg-white/30 shadow-inner flex items-center justify-center">
             <img [src]="question.quizimage" class="w-full h-full object-cover"
                  onerror="this.src='assets/images/pacific.png'">
          </div>

          <!-- Question -->
          <h2 class="text-2xl font-bold text-blue-900 text-center">{{ question.question }}</h2>

          <!-- Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            @for (option of question.options; track option) {
              <button (click)="selectOption(option)" 
                      [disabled]="hasAnswered()"
                      class="glass-btn text-lg w-full transition-all duration-300"
                      [ngClass]="getOptionClass(option)">
                {{ option }}
              </button>
            }
          </div>

          <!-- Trivia Card (Feedback) -->
          @if (hasAnswered()) {
            <div class="w-full p-4 rounded-xl bg-white/40 mt-4 border-l-4 transition-all duration-300"
                 [ngClass]="isCorrect() ? 'border-green-500' : 'border-red-500'">
              <h3 class="font-bold text-lg mb-2" [ngClass]="isCorrect() ? 'text-green-800' : 'text-red-800'">
                {{ isCorrect() ? 'Richtig! 🎉' : 'Leider falsch...' }}
              </h3>
              <p class="text-slate-800">{{ question.trivia }}</p>
            </div>
          }

          <!-- Progress -->
          <div class="w-full h-2 bg-white/30 rounded-full overflow-hidden mt-4">
            <div class="h-full bg-blue-500 transition-all duration-500" [style.width.%]="store.progress()"></div>
          </div>
        </div>
      }
    </div>
  `
})
export class QuizComponent {
  store = inject(QuizStore);
  private router = inject(Router);

  hasAnswered = signal(false);
  selectedOption = signal<string | null>(null);
  isCorrect = computed(() => {
    const question = this.store.currentQuestion();
    return question ? this.selectedOption() === question.answer : false;
  });

  constructor() {
    effect(() => {
      if (this.store.isQuizFinished()) {
        this.router.navigate(['/result']);
      }
    });
  }

  selectOption(option: string) {
    if (this.hasAnswered()) return;

    this.selectedOption.set(option);
    this.hasAnswered.set(true);
    this.store.answerQuestion(option);

    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      this.nextQuestion();
    }, 1500);
  }

  getOptionClass(option: string) {
    if (!this.hasAnswered()) return 'hover:bg-white/60';

    const question = this.store.currentQuestion();
    if (!question) return '';

    if (option === question.answer) {
      return '!bg-green-500 !border-green-600 text-white scale-105 shadow-xl'; // Correct answer always green
    }

    if (option === this.selectedOption() && option !== question.answer) {
      return '!bg-red-500 !border-red-600 text-white'; // Wrong selection red
    }

    return '!bg-gray-300/50 !text-gray-500 !border-transparent opacity-50 grayscale'; // Others grayed out
  }

  nextQuestion() {
    this.hasAnswered.set(false);
    this.selectedOption.set(null);
    this.store.nextQuestion();
  }

  exitQuiz() {
    this.store.exitQuiz();
    this.router.navigate(['/selection']);
  }
}
