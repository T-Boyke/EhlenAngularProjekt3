import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-quiz-result',
    standalone: true,
    imports: [NgClass],
    template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      <!-- Confetti Container (Simple CSS) -->
      @if (isPerfectScore()) {
        <div class="absolute inset-0 pointer-events-none">
          @for (i of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]; track i) {
            <div class="confetti" [style.left.%]="getRandom(100)" [style.animation-delay]="getRandom(2) + 's'"></div>
          }
        </div>
      }

      <div class="glass-card w-full max-w-md text-center animate-pop-in flex flex-col items-center gap-6 z-10">
        <div class="w-24 h-24 rounded-full flex items-center justify-center text-5xl shadow-inner mb-2"
             [ngClass]="isPerfectScore() ? 'bg-yellow-200' : 'bg-blue-200'">
          {{ isPerfectScore() ? '🏆' : '⭐' }}
        </div>
        
        <h2 class="text-3xl font-bold text-blue-900">
          {{ isPerfectScore() ? 'Fantastisch!' : 'Gut gemacht!' }}
        </h2>
        
        <p class="text-xl text-slate-700">
          Du hast <span class="font-bold text-blue-600">{{ store.score() }}</span> von <span class="font-bold text-blue-600">{{ store.totalQuestions() }}</span> Fragen richtig beantwortet.
        </p>

        <p class="text-slate-600 italic">
          {{ isPerfectScore() ? 'Du bist ein echter Ozean-Experte!' : 'Übung macht den Meister. Versuch es gleich nochmal!' }}
        </p>

        <div class="flex flex-col w-full gap-3 mt-4">
          <button (click)="restartQuiz()" class="glass-btn glass-btn-primary w-full">
            Quiz Neustarten 🔄
          </button>
          <button (click)="backToSelection()" class="glass-btn w-full">
            Zurück zur Auswahl 🗺️
          </button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .confetti {
      position: absolute;
      top: -10px;
      width: 10px;
      height: 10px;
      background-color: #f00;
      animation: fall 3s linear infinite;
    }
    .confetti:nth-child(even) { background-color: #00f; }
    .confetti:nth-child(3n) { background-color: #0f0; }
    .confetti:nth-child(4n) { background-color: #ff0; }
    
    @keyframes fall {
      to { transform: translateY(100vh) rotate(720deg); }
    }
  `]
})
export class QuizResultComponent {
    store = inject(QuizStore);
    private router = inject(Router);

    isPerfectScore() {
        return this.store.score() === this.store.totalQuestions() && this.store.totalQuestions() > 0;
    }

    getRandom(max: number) {
        return Math.random() * max;
    }

    restartQuiz() {
        this.store.resetQuiz();
        this.router.navigate(['/quiz']);
    }

    backToSelection() {
        this.store.exitQuiz();
        this.router.navigate(['/selection']);
    }
}
