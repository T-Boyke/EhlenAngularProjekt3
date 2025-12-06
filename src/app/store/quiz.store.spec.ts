import { TestBed } from '@angular/core/testing';
import { QuizStore } from './quiz.store';
import { OceanDataService } from '../services/ocean.data.service';
import { of } from 'rxjs';
import { Ocean } from '../models/ocean.model';

// Test-Daten
const mockOceans: Ocean[] = [
  {
      id: 'pacific',
      name: 'Pacific',
      oceanimage: 'img.jpg',
      description: 'Desc',
      facts: [],
      inhabitants: [],
      quiz: [
          { question: 'Q1', answer: 'A', options: ['A', 'B'], quizimage: '', trivia: '' },
          { question: 'Q2', answer: 'B', options: ['A', 'B'], quizimage: '', trivia: '' }
      ]
  }
];

/**
 * Unit-Tests für den QuizStore.
 *
 * Diese Tests verifizieren die gesamte Geschäftslogik der Anwendung.
 * Da Angular Signals verwendet werden, sind die Tests voll reaktiv.
 */
describe('QuizStore', () => {
  let store: QuizStore;
  let oceanServiceSpy: { getOceans: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    // Service-Mock: Liefert unsere Test-Daten sofort zurück (Observable 'of')
    oceanServiceSpy = {
      getOceans: vi.fn().mockReturnValue(of(mockOceans))
    };

    TestBed.configureTestingModule({
      providers: [
        QuizStore,
        { provide: OceanDataService, useValue: oceanServiceSpy }
      ]
    });

    store = TestBed.inject(QuizStore);

    // LocalStorage Mocken, um Seiteneffekte zu vermeiden
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('sollte Ozeane initial laden', () => {
    store.loadOceans();
    expect(oceanServiceSpy.getOceans).toHaveBeenCalled();
    // Prüfen, ob das Signal gefüllt wurde
    expect(store.oceans().length).toBe(1);
  });

  it('sollte einen Ozean auswählen und den Status zurücksetzen', () => {
    store.loadOceans();
    store.selectOcean('pacific');

    expect(store.currentOceanId()).toBe('pacific');
    // Computed Signal 'currentOcean' prüfen
    expect(store.currentOcean()?.name).toBe('Pacific');
    expect(store.isQuizActive()).toBe(false);
  });

  it('sollte das Quiz starten', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    expect(store.isQuizActive()).toBe(true);
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('sollte den Score bei richtiger Antwort erhöhen', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    const initialScore = store.score();
    store.answerQuestion('A'); // Q1: Richtige Antwort ist 'A'

    expect(store.score()).toBe(initialScore + 1);
  });

  it('sollte den Score bei falscher Antwort NICHT erhöhen', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    const initialScore = store.score();
    store.answerQuestion('Wrong');

    expect(store.score()).toBe(initialScore);
  });

  it('sollte zur nächsten Frage weiterschalten', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    store.nextQuestion();
    expect(store.currentQuestionIndex()).toBe(1);
    // Fortschritt sollte jetzt 50% sein (1 von 2 Fragen)
    expect(store.progress()).toBe(50);
  });

  it('sollte das Quiz beenden, wenn alle Fragen beantwortet sind', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    // Alle Fragen durchlaufen
    store.nextQuestion(); // Zu Frage 2
    store.nextQuestion(); // Ende

    expect(store.isQuizFinished()).toBe(true);
    expect(store.isQuizActive()).toBe(false);
  });
});
