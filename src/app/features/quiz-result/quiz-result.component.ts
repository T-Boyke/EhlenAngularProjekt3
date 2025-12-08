import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { DatePipe } from '@angular/common';
import confetti from 'canvas-confetti';

/**
 * Die Komponente für die Ergebnisanzeige nach Abschluss eines Quizzes.
 *
 * Verwendungszweck:
 * - Präsentiert das Endergebnis (Score).
 * - Unterscheidet zwischen "Master-Modus" (Urkunde oder Game Over) und normalem Modus.
 * - Motiviert den Nutzer durch positives Feedback und Animationen (Konfetti).
 *
 * Funktionalität:
 * - Anzeige der erreichten Punktzahl im Verhältnis zur Gesamtanzahl.
 * - Generierung einer Urkunde bei bestandenem Master-Quiz.
 * - Navigationsoptionen (Neustart, Zurück zur Auswahl).
 */
@Component({
  selector: 'app-quiz-result',
  standalone: true,
  imports: [DatePipe], // DatePipe für Datum auf der Urkunde
  styleUrl: './quiz-result.component.css',
  template: `
    <div class="quiz-result">
      <div class="quiz-result__card">
        <!-- Unterscheidung: Master-Quiz vs. Normales Quiz -->
        @if (store.masterMode()) {
        <!-- Master Quiz Ergebnis / Urkunde -->
        @if (isSuccess()) {
        <div class="quiz-result__certificate">
          <div class="quiz-result__certificate-bg"></div>

          <h1 class="quiz-result__certificate-title">URKUNDE</h1>
          <p class="quiz-result__certificate-subtitle">Hiermit wird bestätigt, dass</p>

          <div class="quiz-result__certificate-rank">Meeresforscher</div>

          <p class="quiz-result__certificate-text">
            das <strong>Ultimative Ozean-Quiz</strong> erfolgreich bestanden hat!
          </p>

          <div class="quiz-result__certificate-icons">
            <span class="quiz-result__certificate-icon">⭐</span>
            <span class="quiz-result__certificate-icon">🐬</span>
            <span class="quiz-result__certificate-icon">⭐</span>
          </div>

          <div class="quiz-result__certificate-date">
            Earth Ocean Learning • {{ today | date : 'mediumDate' }}
          </div>
        </div>
        } @else {
        <!-- Misserfolg im Master-Quiz -->
        <h2 class="quiz-result__failure-title">Oh nein!</h2>
        <p class="quiz-result__failure-subtitle">Die Zeit war zu knapp oder eine Antwort falsch.</p>
        <p class="quiz-result__failure-score">
          Du hast {{ store.score() }} von {{ store.totalQuestions() }} Fragen richtig.
        </p>
        <p class="quiz-result__failure-text">Versuche es noch einmal!</p>
        } } @else {
        <!-- Normales Quiz Ergebnis -->
        <h2 class="quiz-result__title">Quiz Beendet!</h2>

        <div
          class="quiz-result__score"
          [class.quiz-result__score--success]="isSuccess()"
          [class.quiz-result__score--normal]="!isSuccess()"
        >
          {{ store.score() }} / {{ store.totalQuestions() }}
        </div>

        <p class="quiz-result__message">
          @if (isSuccess()) { Fantastisch! Du bist ein echter Experte! 🌟 } @else if (store.score()
          > store.totalQuestions() / 2) { Gut gemacht! Aber da geht noch mehr! 🐟 } @else { Übung
          macht den Meister! Probier es gleich nochmal. 🐙 }
        </p>
        }

        <div class="quiz-result__actions">
          <button (click)="restart()" class="quiz-result__restart-btn">Nochmal spielen 🔄</button>
          <button (click)="backToSelection()" class="quiz-result__back-btn">
            Zurück zur Auswahl 🗺️
          </button>
        </div>
      </div>
    </div>
  `,
})
export class QuizResultComponent implements OnInit {
  readonly store = inject(QuizStore);
  private readonly router = inject(Router);

  /** Das aktuelle Datum für die Urkunde. */
  today = new Date();

  /**
   * Initialisiert die Komponente.
   * Löst bei perfektem Ergebnis (Erfolg) die Konfetti-Animation aus.
   */
  ngOnInit() {
    if (this.isSuccess()) {
      this.triggerConfetti();
    }
  }

  /**
   * Prüft, ob das Quiz erfolgreich war.
   * Ein Quiz gilt als erfolgreich, wenn die erreichte Punktzahl der Gesamtanzahl der Fragen entspricht.
   *
   * @returns {boolean} True, wenn alle Fragen richtig beantwortet wurden.
   */
  isSuccess(): boolean {
    return this.store.score() === this.store.totalQuestions();
  }

  /**
   * Feuert eine Konfetti-Animation ab.
   * Nutzt die externe Bibliothek `canvas-confetti`.
   */
  triggerConfetti() {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#87CEEB', '#FFFFFF'],
    });
  }

  /**
   * Startet das Quiz neu.
   * Unterscheidet dabei zwischen Master-Quiz (Neustart Master-Modus) und normalem Quiz.
   */
  restart() {
    if (this.store.masterMode()) {
      this.store.startMasterQuiz();
      this.router.navigate(['/quiz']);
    } else {
      this.store.restartQuiz();
      this.router.navigate(['/quiz']);
    }
  }

  /**
   * Beendet das Quiz und kehrt zur Ozean-Auswahl zurück.
   */
  backToSelection() {
    this.store.exitQuiz();
    this.router.navigate(['/selection']);
  }
}
