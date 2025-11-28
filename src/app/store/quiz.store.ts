import { Injectable, computed, inject, signal, effect, Signal } from '@angular/core';
import { OceanDataService } from '../services/ocean.data.service';
import { Ocean } from '../models/ocean.model';

const MASTER_OCEAN_TEMPLATE: Partial<Ocean> = {
  id: 'master',
  name: 'Ultimatives Quiz',
  oceanimage: '/assets/images/master.webp',
  description: 'Das ultimative Quiz gegen die Zeit! 🏆',
  facts: [],
  inhabitants: []
};

@Injectable({
  providedIn: 'root'
})
export class QuizStore {
  private readonly oceanDataService = inject(OceanDataService);
  private readonly STORAGE_KEY = 'eol_progress';

  // --- State ---
  private readonly _oceans = signal<Ocean[]>([]);
  private readonly _currentOceanId = signal<string | null>(null);
  private readonly _currentQuestionIndex = signal<number>(0);
  private readonly _score = signal<number>(0);
  private readonly _isQuizActive = signal<boolean>(false);
  private readonly _isQuizFinished = signal<boolean>(false);
  private readonly _completedOceans = signal<string[]>([]);
  private readonly _masterMode = signal<boolean>(false);

  // --- Public Readonly Signals ---
  readonly oceans: Signal<Ocean[]> = this._oceans.asReadonly();
  readonly currentOceanId: Signal<string | null> = this._currentOceanId.asReadonly();
  readonly currentQuestionIndex: Signal<number> = this._currentQuestionIndex.asReadonly();
  readonly score: Signal<number> = this._score.asReadonly();
  readonly isQuizActive: Signal<boolean> = this._isQuizActive.asReadonly();
  readonly isQuizFinished: Signal<boolean> = this._isQuizFinished.asReadonly();
  readonly completedOceans: Signal<string[]> = this._completedOceans.asReadonly();
  readonly masterMode: Signal<boolean> = this._masterMode.asReadonly();

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
    return total === 0 ? 0 : (this._currentQuestionIndex() / total) * 100;
  });

  readonly isMasterUnlocked = computed(() =>
    this._completedOceans().length >= 5
  );

  constructor() {
    this.loadProgressFromStorage();
    effect(() => {
      this.saveProgressToStorage(this._completedOceans());
    });
  }

  // --- Helper Methods ---
  private loadProgressFromStorage(): void {
    const savedProgress = localStorage.getItem(this.STORAGE_KEY);
    if (savedProgress) {
      try {
        this._completedOceans.set(JSON.parse(savedProgress));
      } catch (e) {
        console.warn('LocalStorage Fehler:', e);
      }
    }
  }

  private saveProgressToStorage(progress: string[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  // --- Public Logic ---
  isOceanCompleted(oceanId: string): boolean {
    return this._completedOceans().includes(oceanId);
  }

  loadOceans(): void {
    // UPDATE: Aufruf über neuen Variablennamen
    this.oceanDataService.getOceans().subscribe({
      next: (oceans) => {
        const shuffledOceans = oceans.map(ocean => ({
          ...ocean,
          quiz: ocean.quiz.map(q => ({
            ...q,
            options: [...q.options].sort(() => Math.random() - 0.5)
          }))
        }));
        this._oceans.set(shuffledOceans);
      },
      error: (err) => console.error(err)
    });
  }

  selectOcean(oceanId: string): void {
    this._currentOceanId.set(oceanId);
    this.resetQuizState();
  }

  startQuiz(): void {
    this.resetQuizState();
    this._isQuizActive.set(true);
  }

  startMasterQuiz(): void {
    const allQuestions = this._oceans()
      .filter(o => o.id !== 'master')
      .flatMap(o => o.quiz);

    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    const masterOcean: Ocean = {
      ...MASTER_OCEAN_TEMPLATE as Ocean,
      quiz: shuffledQuestions
    };

    this._oceans.update(oceans => {
      const others = oceans.filter(o => o.id !== 'master');
      return [...others, masterOcean];
    });

    this._currentOceanId.set('master');
    this.resetQuizState();
    this._isQuizActive.set(true);
    this._masterMode.set(true);
  }

  answerQuestion(answer: string): void {
    const question = this.currentQuestion();
    if (question && answer === question.answer) {
      this._score.update(s => s + 1);
    }
  }

  nextQuestion(): void {
    const nextIndex = this._currentQuestionIndex() + 1;
    if (nextIndex >= this.totalQuestions()) {
      this.finishQuiz();
    } else {
      this._currentQuestionIndex.set(nextIndex);
    }
  }

  restartQuiz(): void {
    this.resetQuizState();
    this._isQuizActive.set(true);
  }

  exitQuiz(): void {
    this.resetQuizState();
    this._currentOceanId.set(null);
  }

  private finishQuiz(): void {
    this._isQuizActive.set(false);
    this._isQuizFinished.set(true);
    if (!this._masterMode() && this._score() === this.totalQuestions()) {
      const currentId = this._currentOceanId();
      if (currentId && !this._completedOceans().includes(currentId)) {
        this._completedOceans.update(list => [...list, currentId]);
      }
    }
  }

  private resetQuizState(): void {
    this._currentQuestionIndex.set(0);
    this._score.set(0);
    this._isQuizActive.set(false);
    this._isQuizFinished.set(false);
    this._masterMode.set(false);
  }
}
