import { TestBed } from '@angular/core/testing';
import { QuizStore } from './quiz.store';
import { OceanDataService } from '../services/ocean.data.service';
import { of } from 'rxjs';
import { Ocean } from '../models/ocean.model';

const mockOceans: Ocean[] = [
  {
      id: 'pacific',
      name: 'Pacific',
      color: 'blue',
      oceanimage: 'img.jpg',
      description: 'Desc',
      facts: [],
      inhabitants: [],
      quiz: [
          { question: 'Q1', answer: 'A', options: ['A', 'B'], quizimage: '', trivia: '', prequizdescription: '' },
          { question: 'Q2', answer: 'B', options: ['A', 'B'], quizimage: '', trivia: '', prequizdescription: '' }
      ]
  }
];

describe('QuizStore', () => {
  let store: QuizStore;
  let oceanServiceSpy: { getOceans: any };

  beforeEach(() => {
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
    // Mock LocalStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
  });

  it('should load oceans on initialization request', () => {
    store.loadOceans();
    expect(oceanServiceSpy.getOceans).toHaveBeenCalled();
    expect(store.oceans().length).toBe(1);
  });

  it('should select an ocean and reset quiz state', () => {
    store.loadOceans();
    store.selectOcean('pacific');

    expect(store.currentOceanId()).toBe('pacific');
    expect(store.currentOcean()?.name).toBe('Pacific');
    expect(store.isQuizActive()).toBe(false);
  });

  it('should start quiz', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    expect(store.isQuizActive()).toBe(true);
    expect(store.currentQuestionIndex()).toBe(0);
  });

  it('should increment score on correct answer', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    const initialScore = store.score();
    store.answerQuestion('A'); // Correct Answer for Q1

    expect(store.score()).toBe(initialScore + 1);
  });

  it('should NOT increment score on wrong answer', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    const initialScore = store.score();
    store.answerQuestion('Wrong');

    expect(store.score()).toBe(initialScore);
  });

  it('should advance to next question', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    store.nextQuestion();
    expect(store.currentQuestionIndex()).toBe(1);
    expect(store.progress()).toBe(50); // 1 out of 2 questions
  });

  it('should finish quiz when questions are exhausted', () => {
    store.loadOceans();
    store.selectOcean('pacific');
    store.startQuiz();

    // Answer all questions
    store.nextQuestion(); // Q2
    store.nextQuestion(); // End

    expect(store.isQuizFinished()).toBe(true);
    expect(store.isQuizActive()).toBe(false);
  });
});
