import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Ocean, QuizQuestion } from '../models/ocean.model';
import { computed, inject } from '@angular/core';
import { DataService } from '../services/data.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type QuizState = {
    oceans: Ocean[];
    currentOceanId: string | null;
    currentQuestionIndex: number;
    score: number;
    answers: { questionIndex: number; selectedOption: string; isCorrect: boolean }[];
    isQuizActive: boolean;
    isQuizFinished: boolean;
    loading: boolean;
};

const initialState: QuizState = {
    oceans: [],
    currentOceanId: null,
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isQuizActive: false,
    isQuizFinished: false,
    loading: false,
    withMethods((store, dataService = inject(DataService)) => ({
        loadOceans: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => dataService.getOceans()),
                tap((oceans) => patchState(store, { oceans, loading: false }))
            )
        ),
        selectOcean(oceanId: string) {
            patchState(store, { currentOceanId: oceanId, currentQuestionIndex: 0, score: 0, answers: [], isQuizActive: false, isQuizFinished: false });
        },
        startQuiz() {
            patchState(store, { isQuizActive: true, currentQuestionIndex: 0, score: 0, answers: [], isQuizFinished: false });
        },
        answerQuestion(selectedOption: string) {
            const currentQuestion = store.currentQuestion();
            if (!currentQuestion) return;

            const isCorrect = selectedOption === currentQuestion.answer;
            const newScore = isCorrect ? store.score() + 1 : store.score();

            const newAnswers = [
                ...store.answers(),
                { questionIndex: store.currentQuestionIndex(), selectedOption, isCorrect }
            ];

            patchState(store, {
                score: newScore,
                answers: newAnswers
            });
        },
        nextQuestion() {
            const nextIndex = store.currentQuestionIndex() + 1;
            if (nextIndex < store.totalQuestions()) {
                patchState(store, { currentQuestionIndex: nextIndex });
            } else {
                patchState(store, { isQuizFinished: true, isQuizActive: false });
            }
        },
        resetQuiz() {
            patchState(store, { currentQuestionIndex: 0, score: 0, answers: [], isQuizActive: true, isQuizFinished: false });
        },
        exitQuiz() {
            patchState(store, { isQuizActive: false, isQuizFinished: false, currentOceanId: null });
        }
    }))
);
