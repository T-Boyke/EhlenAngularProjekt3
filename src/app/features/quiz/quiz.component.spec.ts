import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizComponent } from './quiz.component';
import { QuizStore } from '../../store/quiz.store';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockStore: any;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockStore = {
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
      answerQuestion: vi.fn(),
      nextQuestion: vi.fn(),
      exitQuiz: vi.fn()
    };

    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [QuizComponent],
      providers: [
        { provide: QuizStore, useValue: mockStore },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the question', () => {
    const questionEl = fixture.nativeElement.querySelector('.quiz__question');
    expect(questionEl.textContent).toContain('Test Question');
  });

  it('should display options', () => {
    const options = fixture.nativeElement.querySelectorAll('.quiz__option-btn');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toContain('A');
  });

  it('should handle option selection (Correct Answer)', async () => {
    vi.useFakeTimers();

    // Select Option A (Correct)
    component.selectOption('A');
    fixture.detectChanges();

    expect(component.selectedOption()).toBe('A');
    expect(component.isCorrect()).toBe(true);
    expect(mockStore.answerQuestion).toHaveBeenCalledWith('A');

    // Check feedback
    const feedbackTitle = fixture.nativeElement.querySelector('.quiz__feedback-title');
    expect(feedbackTitle.textContent).toContain('Richtig');

    // Wait for timeout
    vi.advanceTimersByTime(1500);
    expect(mockStore.nextQuestion).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should handle option selection (Wrong Answer)', () => {
    component.selectOption('B');
    fixture.detectChanges();

    expect(component.isCorrect()).toBe(false);

    const feedbackTitle = fixture.nativeElement.querySelector('.quiz__feedback-title');
    expect(feedbackTitle.textContent).toContain('Leider falsch');
  });

  it('should exit quiz on button click', () => {
    const exitBtn = fixture.nativeElement.querySelector('.quiz__exit-btn');
    exitBtn.click();

    expect(mockStore.exitQuiz).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/selection']);
  });
});
