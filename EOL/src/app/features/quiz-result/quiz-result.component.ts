import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { NgClass, DatePipe } from '@angular/common';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [NgClass, DatePipe],
  template: `
    <div class="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div class="glass-card w-full max-w-2xl flex flex-col items-center gap-8 animate-pop-in text-center p-8">
        
        @if (store.masterMode()) {
           <!-- Master Quiz Result / Certificate -->
           @if (isSuccess()) {
             <div class="border-8 border-double border-yellow-400 p-8 rounded-xl bg-white/90 shadow-2xl relative overflow-hidden w-full">
               <div class="absolute top-0 left-0 w-full h-full bg-[url('/assets/images/pacific.png')] opacity-10 bg-cover"></div>
               
               <h1 class="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-4 relative z-10">URKUNDE</h1>
               <p class="text-xl text-blue-700 mb-6 relative z-10">Hiermit wird bestätigt, dass</p>
               
               <div class="text-3xl font-bold text-blue-900 border-b-2 border-blue-900 inline-block px-8 py-2 mb-6 relative z-10">
                 Meeresforscher
               </div>
               
               <p class="text-lg text-blue-800 mb-8 relative z-10">
                 das <strong>Ultimative Ozean-Quiz</strong> erfolgreich bestanden hat!
               </p>
               
               <div class="flex justify-center gap-4 relative z-10 mb-6">
                 <span class="text-4xl">⭐</span>
                 <span class="text-4xl">🐬</span>
                 <span class="text-4xl">⭐</span>
               </div>
               
               <div class="mt-4 text-sm text-blue-600 relative z-10">
                 Earth Ocean Learning • {{ today | date:'mediumDate' }}
               </div>
             </div>
           } @else {
             <h2 class="text-3xl font-bold text-red-600">Oh nein!</h2>
             <p class="text-xl text-blue-800">Die Zeit war zu knapp oder eine Antwort falsch.</p>
             <p class="text-lg text-blue-600 mt-4">Du hast {{ store.score() }} von {{ store.totalQuestions() }} Fragen richtig.</p>
             <p class="text-lg text-blue-600">Versuche es noch einmal!</p>
           }

        } @else {
          <!-- Normal Quiz Result -->
          <h2 class="text-4xl font-bold text-blue-900">Quiz Beendet!</h2>
          
          <div class="text-6xl font-bold" [ngClass]="isSuccess() ? 'text-green-500' : 'text-blue-500'">
            {{ store.score() }} / {{ store.totalQuestions() }}
          </div>
          
          <p class="text-xl text-blue-800">
            @if (isSuccess()) {
              Fantastisch! Du bist ein echter Experte! 🌟
            } @else if (store.score() > store.totalQuestions() / 2) {
              Gut gemacht! Aber da geht noch mehr! 🐟
            } @else {
              Übung macht den Meister! Probier es gleich nochmal. 🐙
            }
          </p>
        }

        <div class="flex gap-4 mt-8 w-full justify-center">
          <button (click)="restart()" class="glass-btn bg-blue-500 text-white hover:bg-blue-600">
            Nochmal spielen 🔄
          </button>
          <button (click)="backToSelection()" class="glass-btn">
            Zurück zur Auswahl 🗺️
          </button>
        </div>
      </div>
    </div>
  `
})
export class QuizResultComponent implements OnInit {
  store = inject(QuizStore);
  private router = inject(Router);
  today = new Date();

  ngOnInit() {
    if (this.isSuccess()) {
      this.triggerConfetti();
    }
  }

  isSuccess() {
    return this.store.score() === this.store.totalQuestions();
  }

  triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#87CEEB', '#FFFFFF']
    });
  }

  restart() {
    if (this.store.masterMode()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    } else {
      this.store.restartQuiz();
      this.router.navigate(['/quiz']);
    }
  }

  backToSelection() {
    this.store.exitQuiz();
    this.router.navigate(['/selection']);
  }
}
