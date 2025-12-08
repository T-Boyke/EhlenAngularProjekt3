import { Injectable, computed, inject, signal, effect, Signal } from '@angular/core';
import { OceanDataService } from '@core/services/ocean-data.service';
import { Ocean } from '../models/ocean.model';
import { QuizQuestion } from '../models/quiz-question.model';

/**
 * Vorlage für das "Master-Quiz".
 * Dies ist ein spezieller Ozean-Eintrag, der generiert wird,
 * wenn der Nutzer alle 5 Sterne gesammelt hat.
 */
const MASTER_OCEAN_TEMPLATE: Partial<Ocean> = {
  id: 'master',
  name: 'Ultimatives Quiz',
  oceanimage: '/assets/images/master.webp',
  description: 'Das ultimative Quiz gegen die Zeit! 🏆',
  facts: [],
  inhabitants: [],
};

/**
 * Der zentrale Status-Speicher (Store) der Anwendung.
 * Implementiert mit Angular Signals für reaktives State-Management.
 *
 * Verantwortlichkeit:
 * - Hält den gesamten Zustand der App (geladene Ozeane, aktueller Fortschritt, Score).
 * - Enthält die Geschäftslogik für den Quiz-Ablauf (Start, Antwort, Ende).
 * - Verwaltet die Persistenz des Fortschritts im LocalStorage.
 *
 * Pattern: Store-Service (Datenhaltung + Logik in einer Klasse).
 */
@Injectable({
  providedIn: 'root',
})
export class QuizStore {
  private readonly oceanDataService = inject(OceanDataService);
  private readonly STORAGE_KEY = 'eol_progress';

  // --- Interner State (private signals) ---
  // Diese Signale sind privat und können nur innerhalb dieser Klasse verändert werden.

  /** Liste aller verfügbaren Ozeane (Katalog). */
  private readonly _oceans = signal<Ocean[]>([]);

  /**
   * Die Fragen für die aktuelle Quiz-Session.
   * Dies trennt den Katalog (_oceans) vom Session-State.
   */
  private readonly _activeQuestions = signal<QuizQuestion[]>([]);

  /** ID des aktuell ausgewählten Ozeans (oder null, wenn keiner gewählt). */
  private readonly _currentOceanId = signal<string | null>(null);
  /** Index der aktuellen Frage im Quiz-Array des gewählten Ozeans. */
  private readonly _currentQuestionIndex = signal<number>(0);
  /** Aktueller Punktestand im laufenden Quiz. */
  private readonly _score = signal<number>(0);
  /** Gibt an, ob der Nutzer sich gerade im Quiz-Modus befindet. */
  private readonly _isQuizActive = signal<boolean>(false);
  /** Gibt an, ob das aktuelle Quiz beendet wurde. */
  private readonly _isQuizFinished = signal<boolean>(false);
  /** Liste der IDs aller erfolgreich abgeschlossenen Ozeane (Fortschritt). */
  private readonly _completedOceans = signal<string[]>([]);
  /** Flag für das spezielle "Meister-Quiz". */
  private readonly _masterMode = signal<boolean>(false);

  /** Gibt an, ob Daten geladen werden. */
  private readonly _isLoading = signal<boolean>(false);

  // --- Öffentliche Readonly Signals ---

  readonly oceans: Signal<Ocean[]> = this._oceans.asReadonly();
  readonly currentOceanId: Signal<string | null> = this._currentOceanId.asReadonly();
  readonly currentQuestionIndex: Signal<number> = this._currentQuestionIndex.asReadonly();
  readonly score: Signal<number> = this._score.asReadonly();
  readonly isQuizActive: Signal<boolean> = this._isQuizActive.asReadonly();
  readonly isQuizFinished: Signal<boolean> = this._isQuizFinished.asReadonly();
  readonly completedOceans: Signal<string[]> = this._completedOceans.asReadonly();
  readonly masterMode: Signal<boolean> = this._masterMode.asReadonly();
  readonly isLoading: Signal<boolean> = this._isLoading.asReadonly();

  // --- Computed Signals (Abgeleiteter State) ---

  /**
   * Liefert das aktuelle Ozean-Objekt basierend auf der `currentOceanId`.
   * Im Master-Modus wird ein virtuelles Template zurückgegeben.
   */
  readonly currentOcean = computed(() => {
    if (this._masterMode()) {
      return MASTER_OCEAN_TEMPLATE as Ocean;
    }
    return this._oceans().find((o) => o.id === this._currentOceanId());
  });

  /**
   * Liefert das aktuelle Frage-Objekt aus der aktiven Session.
   */
  readonly currentQuestion = computed(() => {
    const questions = this._activeQuestions();
    return questions[this._currentQuestionIndex()] || null;
  });

  /**
   * Berechnet die Gesamtanzahl der Fragen für das aktuelle Quiz.
   */
  readonly totalQuestions = computed(() => this._activeQuestions().length);

  /**
   * Berechnet den Fortschritt des Quiz in Prozent (0-100).
   */
  readonly progress = computed(() => {
    const total = this.totalQuestions();
    return total === 0 ? 0 : (this._currentQuestionIndex() / total) * 100;
  });

  /**
   * Prüft, ob das "Ultimative Quiz" freigeschaltet ist.
   */
  readonly isMasterUnlocked = computed(() => this._completedOceans().length >= 5);

  constructor() {
    this.loadProgressFromStorage();

    effect(() => {
      this.saveProgressToStorage(this._completedOceans());
    });
  }

  // --- Helper Methods (Private) ---

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

  // --- Public Logic (Actions) ---

  isOceanCompleted(oceanId: string): boolean {
    return this._completedOceans().includes(oceanId);
  }

  /**
   * Lädt die Ozean-Daten initial vom Service.
   * Hier werden die Fragen NICHT mehr gemischt, das passiert erst beim Start eines Quiz.
   */
  loadOceans(): void {
    this._isLoading.set(true);
    this.oceanDataService.getOceans().subscribe({
      next: (oceans) => {
        this._oceans.set(oceans);
        this._isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this._isLoading.set(false);
      },
    });
  }

  selectOcean(oceanId: string): void {
    this._currentOceanId.set(oceanId);
    this.resetQuizState();
  }

  /**
   * Startet das Quiz für den aktuell gewählten Ozean.
   * Kopiert die Fragen in _activeQuestions und mischt die Antworten.
   */
  startQuiz(): void {
    const ocean = this._oceans().find((o) => o.id === this._currentOceanId());
    if (ocean) {
      // Fragen kopieren und Antworten mischen
      const sessionQuestions = ocean.quiz.map((q) => ({
        ...q,
        options: [...q.options].sort(() => Math.random() - 0.5),
      }));

      this._activeQuestions.set(sessionQuestions);
      this.resetQuizState();
      this._isQuizActive.set(true);
    }
  }

  /**
   * Generiert und startet das "Meister-Quiz".
   * - Sammelt ALLE Fragen aus dem Katalog.
   * - Mischt sie zufällig.
   * - Setzt sie als aktive Fragen.
   */
  startMasterQuiz(): void {
    const allQuestions = this._oceans().flatMap((o) => o.quiz);

    // Fragen mischen
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    // Auch die Antworten innerhalb der Fragen mischen
    const preparedQuestions = shuffledQuestions.map((q) => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5),
    }));

    this._activeQuestions.set(preparedQuestions);

    // Virtual ID setzen
    this._currentOceanId.set('master');

    this.resetQuizState();
    this._isQuizActive.set(true);
    this._masterMode.set(true);
  }

  answerQuestion(answer: string): void {
    const question = this.currentQuestion();
    if (question && answer === question.answer) {
      this._score.update((s) => s + 1);
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
    // Beim Neustart behalten wir die aktuellen _activeQuestions bei
    this.resetQuizState();
    this._isQuizActive.set(true);
  }

  exitQuiz(): void {
    this.resetQuizState();
    this._currentOceanId.set(null);
    this._activeQuestions.set([]); // Clean up
  }

  private finishQuiz(): void {
    this._isQuizActive.set(false);
    this._isQuizFinished.set(true);

    if (!this._masterMode() && this._score() === this.totalQuestions()) {
      const currentId = this._currentOceanId();
      if (currentId && !this._completedOceans().includes(currentId)) {
        this._completedOceans.update((list) => [...list, currentId]);
      }
    }
  }

  private resetQuizState(): void {
    this._currentQuestionIndex.set(0);
    this._score.set(0);
    this._isQuizActive.set(false);
    this._isQuizFinished.set(false);
    this._masterMode.set(this._currentOceanId() === 'master');
  }
}
