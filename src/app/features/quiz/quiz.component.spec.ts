import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { QuizStore } from '../../store/quiz.store';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

/**
 * Unit-Tests für die QuizComponent.
 *
 * Ziel:
 * - Sicherstellen, dass die Komponente korrekt erstellt wird.
 * - Überprüfen, ob Daten aus dem Store (Frage, Optionen) richtig dargestellt werden.
 * - Testen der Interaktionen (Antwort wählen, Quiz beenden).
 * - Validieren des Feedbacks (Richtig/Falsch).
 */
describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  // Mock für den globalen QuizStore (wir testen hier nur die Component, nicht den Store)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStore: any;

  // Spy für den Router, um Navigationen abzufangen
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  /** Setup vor jedem einzelnen Test */
  beforeEach(async () => {
    // 1. Mock-Daten vorbereiten
    mockStore = {
      // Signals müssen simuliert werden
      currentQuestion: signal({
        question: 'Test Question',
        options: ['A', 'B'],
        answer: 'A',
        quizimage: 'img.jpg',
        trivia: 'Trivia Text'
      }),
      currentOcean: signal({ id: '1' }),
      progress: signal(0),
      masterMode: signal(false),
      isQuizFinished: signal(false),
      currentQuestionIndex: signal(0),
      // Methoden werden als Spies gemockt
      answerQuestion: vi.fn(),
      nextQuestion: vi.fn(),
      exitQuiz: vi.fn()
    };

    routerSpy = { navigate: vi.fn() };

    // 2. Test-Modul konfigurieren
    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        { provide: QuizStore, useValue: mockStore },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    // 3. Komponente instanziieren
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initiale Change Detection (ngOnInit)
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte die Frage anzeigen', () => {
    // DOM-Abfrage: Findet das Element mit der Klasse .quiz__question
    const questionEl = fixture.nativeElement.querySelector('.quiz__question');
    expect(questionEl.textContent).toContain('Test Question');
  });

  it('sollte die Antwortmöglichkeiten anzeigen', () => {
    const options = fixture.nativeElement.querySelectorAll('.quiz__option-btn');
    expect(options.length).toBe(2); // Wir haben 2 Optionen im Mock definiert
    expect(options[0].textContent).toContain('A');
  });

  it('sollte korrekte Antwort verarbeiten', async () => {
    // Simulation der Zeit (für setTimeout im Code)
    vi.useFakeTimers();

    // 1. Option "A" (richtig) wählen
    component.selectOption('A');
    fixture.detectChanges();

    // 2. Prüfungen
    expect(component.selectedOption()).toBe('A');
    expect(component.isCorrect()).toBe(true);
    expect(mockStore.answerQuestion).toHaveBeenCalledWith('A');

    // 3. Visualisierung prüfen (Feedback)
    const feedbackTitle = fixture.nativeElement.querySelector('.quiz__feedback-title');
    expect(feedbackTitle.textContent).toContain('Richtig');

    // 4. Automatische Weiterleitung nach 1.5 Sekunden testen
    vi.advanceTimersByTime(1500);
    expect(mockStore.nextQuestion).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('sollte falsche Antwort verarbeiten', () => {
    // 1. Option "B" (falsch) wählen
    component.selectOption('B');
    fixture.detectChanges();

    // 2. Prüfungen
    expect(component.isCorrect()).toBe(false);

    const feedbackTitle = fixture.nativeElement.querySelector('.quiz__feedback-title');
    expect(feedbackTitle.textContent).toContain('Leider falsch');
  });

  it('sollte beim Klick auf "Beenden" das Quiz verlassen', () => {
    const exitBtn = fixture.nativeElement.querySelector('.quiz__exit-btn');
    exitBtn.click();

    // Logik im Store aufrufen
    expect(mockStore.exitQuiz).toHaveBeenCalled();
    // Navigation prüfen
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/selection']);
  });
});
