import { Injectable, computed, inject, signal, effect, Signal } from '@angular/core';
import { OceanDataService } from '../services/ocean.data.service';
import { Ocean } from '../models/ocean.model';

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
  inhabitants: []
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
  providedIn: 'root'
})
export class QuizStore {
  private readonly oceanDataService = inject(OceanDataService);
  private readonly STORAGE_KEY = 'eol_progress';

  // --- Interner State (private signals) ---
  // Diese Signale sind privat und können nur innerhalb dieser Klasse verändert werden.

  /** Liste aller verfügbaren Ozeane. */
  private readonly _oceans = signal<Ocean[]>([]);
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

  // --- Öffentliche Readonly Signals ---
  // Diese Signale werden nach außen hingegeben. Komponenten können sie lesen ("reagieren"),
  // aber nicht direkt schreiben. Das schützt den State vor inkonsistenten Änderungen.

  readonly oceans: Signal<Ocean[]> = this._oceans.asReadonly();
  readonly currentOceanId: Signal<string | null> = this._currentOceanId.asReadonly();
  readonly currentQuestionIndex: Signal<number> = this._currentQuestionIndex.asReadonly();
  readonly score: Signal<number> = this._score.asReadonly();
  readonly isQuizActive: Signal<boolean> = this._isQuizActive.asReadonly();
  readonly isQuizFinished: Signal<boolean> = this._isQuizFinished.asReadonly();
  readonly completedOceans: Signal<string[]> = this._completedOceans.asReadonly();
  readonly masterMode: Signal<boolean> = this._masterMode.asReadonly();

  // --- Computed Signals (Abgeleiteter State) ---
  // Diese Werte berechnen sich automatisch neu, wenn sich ihre Abhängigkeiten ändern.

  /**
   * Liefert das aktuelle Ozean-Objekt basierend auf der `currentOceanId`.
   * Findet den Ozean in der `_oceans` Liste.
   */
  readonly currentOcean = computed(() =>
    this._oceans().find(o => o.id === this._currentOceanId())
  );

  /**
   * Liefert das aktuelle Frage-Objekt basierend auf dem `currentQuestionIndex`.
   */
  readonly currentQuestion = computed(() => {
    const ocean = this.currentOcean();
    return ocean?.quiz[this._currentQuestionIndex()] || null;
  });

  /**
   * Berechnet die Gesamtanzahl der Fragen für das aktuelle Quiz.
   */
  readonly totalQuestions = computed(() =>
    this.currentOcean()?.quiz.length || 0
  );

  /**
   * Berechnet den Fortschritt des Quiz in Prozent (0-100).
   * Wird für die Progress-Bar verwendet.
   */
  readonly progress = computed(() => {
    const total = this.totalQuestions();
    return total === 0 ? 0 : (this._currentQuestionIndex() / total) * 100;
  });

  /**
   * Prüft, ob das "Ultimative Quiz" freigeschaltet ist.
   * Bedingung: Alle 5 normalen Ozeane müssen abgeschlossen sein.
   */
  readonly isMasterUnlocked = computed(() =>
    this._completedOceans().length >= 5
  );

  constructor() {
    // Beim Start: Fortschritt laden
    this.loadProgressFromStorage();

    // Effect: "Side Effect", der automatisch läuft, wenn sich _completedOceans ändert.
    // Speichert den neuen Fortschritt sofort im LocalStorage.
    effect(() => {
      this.saveProgressToStorage(this._completedOceans());
    });
  }

  // --- Helper Methods (Private) ---

  /** Lädt den gespeicherten Fortschritt aus dem Browser-LocalStorage. */
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

  /** Speichert den Fortschritt im Browser-LocalStorage. */
  private saveProgressToStorage(progress: string[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  // --- Public Logic (Actions) ---
  // Diese Methoden werden von den Komponenten aufgerufen, um den State zu ändern.

  /** Prüft, ob ein spezifischer Ozean bereits erfolgreich absolviert wurde. */
  isOceanCompleted(oceanId: string): boolean {
    return this._completedOceans().includes(oceanId);
  }

  /**
   * Lädt die Ozean-Daten initial vom Service.
   * Startet den HTTP-Request und mischt die Antwortmöglichkeiten zufällig,
   * damit das Quiz nicht immer gleich ist.
   */
  loadOceans(): void {
    this.oceanDataService.getOceans().subscribe({
      next: (oceans) => {
        // Antworten mischen (Fisher-Yates oder simples sort mit random)
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

  /**
   * Wählt einen Ozean aus und setzt den Quiz-Status zurück für einen sauberen Start.
   */
  selectOcean(oceanId: string): void {
    this._currentOceanId.set(oceanId);
    this.resetQuizState();
  }

  /**
   * Startet das Quiz für den aktuell gewählten Ozean.
   */
  startQuiz(): void {
    this.resetQuizState();
    this._isQuizActive.set(true);
  }

  /**
   * Generiert und startet das "Meister-Quiz".
   * - Sammelt ALLE Fragen aus allen Ozeanen.
   * - Mischt sie zufällig.
   * - Erstellt einen temorären "Master"-Ozean.
   */
  startMasterQuiz(): void {
    const allQuestions = this._oceans()
      .filter(o => o.id !== 'master')
      .flatMap(o => o.quiz);

    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

    const masterOcean: Ocean = {
      ...MASTER_OCEAN_TEMPLATE as Ocean,
      quiz: shuffledQuestions
    };

    // Fügt den Master-Ozean temporär zur Liste hinzu
    this._oceans.update(oceans => {
      const others = oceans.filter(o => o.id !== 'master');
      return [...others, masterOcean];
    });

    this._currentOceanId.set('master');
    this.resetQuizState();
    this._isQuizActive.set(true);
    this._masterMode.set(true);
  }

  /**
   * Verarbeitet eine gegebene Antwort.
   * Erhöht den Score, falls die Antwort korrekt ist.
   */
  answerQuestion(answer: string): void {
    const question = this.currentQuestion();
    if (question && answer === question.answer) {
      this._score.update(s => s + 1);
    }
  }

  /**
   * Schaltet zur nächsten Frage weiter.
   * Wenn das Ende erreicht ist, wird `finishQuiz` aufgerufen.
   */
  nextQuestion(): void {
    const nextIndex = this._currentQuestionIndex() + 1;
    if (nextIndex >= this.totalQuestions()) {
      this.finishQuiz();
    } else {
      this._currentQuestionIndex.set(nextIndex);
    }
  }

  /**
   * Startet das aktuelle Quiz neu (Score 0, Frage 1).
   */
  restartQuiz(): void {
    this.resetQuizState();
    this._isQuizActive.set(true);
  }

  /**
   * Verlässt das Quiz und kehrt zur Auswahl zurück.
   */
  exitQuiz(): void {
    this.resetQuizState();
    this._currentOceanId.set(null);
  }

  /**
   * Interne Methode zum Beenden des Quizzes.
   * - Setzt Status auf "Finished".
   * - Speichert den Erfolg, wenn alle Fragen richtig beantwortet wurden (100%).
   */
  private finishQuiz(): void {
    this._isQuizActive.set(false);
    this._isQuizFinished.set(true);

    // Nur im normalen Modus speichern wir den Fortschritt (Sterne sammeln)
    if (!this._masterMode() && this._score() === this.totalQuestions()) {
      const currentId = this._currentOceanId();
      if (currentId && !this._completedOceans().includes(currentId)) {
        this._completedOceans.update(list => [...list, currentId]);
      }
    }
  }

  /**
   * Setzt alle Quiz-relevanten Zähler auf Anfangswerte zurück.
   */
  private resetQuizState(): void {
    this._currentQuestionIndex.set(0);
    this._score.set(0);
    this._isQuizActive.set(false);
    this._isQuizFinished.set(false); // Ergebnis-Screen ausblenden
    this._masterMode.set(false);
  }
}
