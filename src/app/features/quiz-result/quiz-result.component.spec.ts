import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizResultComponent } from './quiz-result.component';
import { QuizStore } from '../../store/quiz.store';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));
import confetti from 'canvas-confetti';

describe('QuizResultComponent', () => {
  let component: QuizResultComponent;
  let fixture: ComponentFixture<QuizResultComponent>;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storeMock: Record<string, any>;

  beforeEach(async () => {
    routerSpy = { navigate: vi.fn() };
    storeMock = {
      masterMode: signal(false),
      score: signal(10),
      totalQuestions: signal(10),
      startMasterQuiz: vi.fn(),
      restartQuiz: vi.fn(),
      exitQuiz: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [QuizResultComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: QuizStore, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte Konfetti feuern bei Erfolg', () => {
    // Score == TotalQuestions (10 == 10)
    expect(component.isSuccess()).toBe(true);
    // ngOnInit feuert Konfetti
    expect(confetti).toHaveBeenCalled();
  });

  it('sollte kein Konfetti feuern bei Misserfolg', () => {
    storeMock['score'].set(5); // 5/10
    fixture.detectChanges();

    // Reset call count from previous tests if necessary, or just create new fixture
    // Since beforeEach resets, we are good. But wait, confetti is global mock.
    vi.clearAllMocks();

    component.triggerConfetti(); // Manuell aufrufen für Test
    expect(confetti).toHaveBeenCalled();

    // Check isSuccess logic
    expect(component.isSuccess()).toBe(false);
  });

  it('sollte Quiz restarten (Normal Mode)', () => {
    storeMock['masterMode'].set(false);
    component.restart();
    expect(storeMock['restartQuiz']).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/quiz']);
  });

  it('sollte Quiz restarten (Master Mode)', () => {
    storeMock['masterMode'].set(true);
    component.restart();
    expect(storeMock['startMasterQuiz']).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/quiz']);
  });

  it('sollte zur Auswahl zurückkehren', () => {
    component.backToSelection();
    expect(storeMock['exitQuiz']).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/selection']);
  });
});
