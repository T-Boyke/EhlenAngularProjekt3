import { Injectable, computed, inject, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { Ocean, QuizQuestion } from '../models/ocean.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService { // Umbenannt von QuizStore zu QuizService
  private dataService = inject(DataService);

  // --- State (Writable Signals) ---
  // Private, damit sie nur durch Methoden geändert werden können (Kapselung)
  private _oceans = signal<Ocean[]>([]);
  private _currentOceanId = signal<string | null>(null);
  private _currentQuestionIndex = signal<number>(0);
  private _score = signal<number>(0);
  private _isQuizActive = signal<boolean>(false);
  private _isQuizFinished = signal<boolean>(false);
  private _completedOceans = signal<string[]>([]);
  private _masterMode = signal<boolean>(false);

  // --- Computed Signals (Selectors) ---
  // Öffentlich lesbar
  readonly oceans = this._oceans.asReadonly();
  readonly currentOceanId = this._currentOceanId.asReadonly();
  readonly score = this._score.asReadonly();
  readonly isQuizActive = this._isQuizActive.asReadonly();
  readonly isQuizFinished = this._isQuizFinished.asReadonly();
  readonly completedOceans = this._completedOceans.asReadonly();
  readonly masterMode = this._masterMode.asReadonly();

  readonly currentOcean = computed(() => 
    this._oceans().find(o => o.id === this._currentOceanId())
  );

  readonly currentQuestion = computed(() => {
    const ocean = this.currentOcean();
    return ocean?.quiz[this._currentQuestionIndex()] || null;
  });

  readonly totalQuestions = computed(() => 
    this.currentOcean()?.quiz.length || 0
  );

  readonly progress = computed(() => {
    const total = this.totalQuestions();
    if (total === 0) return 0;
    return (this._currentQuestionIndex() / total) * 100;
  });

  readonly isMasterUnlocked = computed(() => 
    this._completedOceans().length >= 5
  );

  // Hilfsfunktion für Template-Checks (Factory-Funktion im Template)
  isOceanCompleted(oceanId: string): boolean {
    return this._completedOceans().includes(oceanId);
  }

  // --- Methoden (Actions / Updaters) ---

  loadOceans() {
    // RxMethod Ersatz: Einfaches Subscribe
    this.dataService.getOceans().subscribe((oceans) => {
      const shuffledOceans = oceans.map(ocean => ({
        ...ocean,
        quiz: ocean.quiz.map(q => ({
          ...q,
          options: [...q.options].sort(() => Math.random() - 0.5)
        }))
      }));
      this._oceans.set(shuffledOceans);
    });
  }

  selectOcean(oceanId: string) {
    this._currentOceanId.set(oceanId);
    this.resetQuizState();
  }

  startQuiz() {
    this._isQuizActive.set(true);
    this._score.set(0);
    this._currentQuestionIndex.set(0);
    this._isQuizFinished.set(false);
    this._masterMode.set(false);
  }

  answerQuestion(answer: string) {
    const question = this.currentQuestion();
    if (question && answer === question.answer) {
      this._score.update(s => s + 1);
    }
  }

  nextQuestion() {
    const nextIndex = this._currentQuestionIndex() + 1;
    const total = this.totalQuestions();

    if (nextIndex >= total) {
      this.finishQuiz();
    } else {
      this._currentQuestionIndex.set(nextIndex);
    }
  }

  private finishQuiz() {
    this._isQuizActive.set(false);
    this._isQuizFinished.set(true);

    // Wenn perfekter Score und kein Master-Modus -> Stern vergeben
    if (!this._masterMode() && this._score() === this.totalQuestions()) {
      const currentId = this._currentOceanId();
      if (currentId && !this._completedOceans().includes(currentId)) {
        this._completedOceans.update(list => [...list, currentId]);
      }
    }
  }

  restartQuiz() {
    this._score.set(0);
    this._currentQuestionIndex.set(0);
    this._isQuizActive.set(true);
    this._isQuizFinished.set(false);
  }

  exitQuiz() {
    this._isQuizActive.set(false);
    this._isQuizFinished.set(false);
    this._currentOceanId.set(null);
    this._masterMode.set(false);
  }

  private resetQuizState() {
    this._currentQuestionIndex.set(0);
    this._score.set(0);
    this._isQuizActive.set(false);
    this._isQuizFinished.set(false);
    this._masterMode.set(false);
  }
  
  // Master Quiz Logik hier analog einfügen...
  startMasterQuiz() {
    // 1. Alle Fragen aus allen Ozeanen sammeln
    const allQuestions = this._oceans()
      .filter(o => o.id !== 'master') // Verhindert Duplikate, falls Master schon existiert
      .flatMap(o => o.quiz);

    // 2. Fragen mischen (Shuffle)
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    // 3. Einen temporären "Master Ocean" erstellen
    // Das ist ein Trick, damit die bestehende Logik (currentOcean, currentQuestion)
    // weiter funktioniert, ohne dass wir alles umbauen müssen.
    const masterOcean: Ocean = {
      id: 'master',
      name: 'Ultimatives Quiz',
      color: 'bg-purple-600',
      oceanimage: '/assets/images/pacific.png', // Oder ein spezielles Master-Bild
      description: 'Das ultimative Quiz gegen die Zeit! 🏆',
      facts: [],
      inhabitants: [],
      quiz: shuffledQuestions // Hier sind jetzt ALLE Fragen drin
    };

    // 4. Den Master-Ocean in die Liste einfügen (oder updaten)
    this._oceans.update(oceans => {
      const others = oceans.filter(o => o.id !== 'master');
      return [...others, masterOcean];
    });

    // 5. State für den Start setzen
    this._currentOceanId.set('master');
    this._currentQuestionIndex.set(0);
    this._score.set(0);
    this._isQuizActive.set(true);
    this._isQuizFinished.set(false);
    this._masterMode.set(true); // Wichtig für den Timer im Frontend!
  }
}
