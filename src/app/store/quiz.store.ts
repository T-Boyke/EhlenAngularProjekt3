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
    answers: { questionId: string; answer: string; isCorrect: boolean }[];
    isQuizActive: boolean;
    isQuizFinished: boolean;
    loading: boolean;
    completedOceans: string[]; // IDs of oceans with perfect score
    masterMode: boolean;
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
    completedOceans: [],
    masterMode: false
};

export const QuizStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((store) => ({
        currentOcean: computed(() => store.oceans().find(o => o.id === store.currentOceanId())),
        currentQuestion: computed(() => {
            const ocean = store.oceans().find(o => o.id === store.currentOceanId());
            return ocean?.quiz[store.currentQuestionIndex()] || null;
        }),
        totalQuestions: computed(() => {
            const ocean = store.oceans().find((o) => o.id === store.currentOceanId());
            return ocean?.quiz.length || 0;
        }),
        progress: computed(() => {
            const ocean = store.oceans().find(o => o.id === store.currentOceanId());
            if (!ocean || ocean.quiz.length === 0) return 0;
            return ((store.currentQuestionIndex()) / ocean.quiz.length) * 100;
        }),
        isOceanCompleted: computed(() => (oceanId: string) => store.completedOceans().includes(oceanId)),
        isMasterUnlocked: computed(() => store.completedOceans().length >= 5)
    })),
    withMethods((store, dataService = inject(DataService)) => ({
        loadOceans: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => dataService.getOceans()),
                tap((oceans) => {
                    // Shuffle options for each question
                    const shuffledOceans = oceans.map(ocean => ({
                        ...ocean,
                        quiz: ocean.quiz.map(q => ({
                            ...q,
                            options: [...q.options].sort(() => Math.random() - 0.5)
                        }))
                    }));
                    patchState(store, { oceans: shuffledOceans, loading: false });
                })
            )
        ),
        selectOcean(oceanId: string) {
            patchState(store, { currentOceanId: oceanId, currentQuestionIndex: 0, score: 0, answers: [], isQuizActive: false, isQuizFinished: false, masterMode: false });
        },
        startQuiz() {
            patchState(store, { isQuizActive: true, currentQuestionIndex: 0, score: 0, answers: [], isQuizFinished: false, masterMode: false });
        },
        startMasterQuiz() {
            const allQuestions = store.oceans().flatMap(o => o.quiz);
            // Shuffle all questions
            const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

            // Create a dummy "Master Ocean" to hold these questions
            const masterOcean: Ocean = {
                id: 'master',
                name: 'Master Quiz',
                color: 'bg-purple-600',
                oceanimage: '/assets/images/pacific.png', // Placeholder
                description: 'Das ultimative Quiz!',
                facts: [],
                inhabitants: [],
                quiz: shuffledQuestions
            };

            // We need to temporarily add this master ocean to the store or handle it differently.
            // Easier approach: Add a 'master' ocean to the oceans array if it doesn't exist, or update it.
            const oceans = store.oceans().filter(o => o.id !== 'master');
            patchState(store, {
                oceans: [...oceans, masterOcean],
                currentOceanId: 'master',
                currentQuestionIndex: 0,
                score: 0,
                answers: [],
                isQuizActive: true,
                isQuizFinished: false,
                masterMode: true
            });
        },
        answerQuestion(answer: string) {
            const currentOcean = store.oceans().find(o => o.id === store.currentOceanId());
            const currentQuestion = currentOcean?.quiz[store.currentQuestionIndex()];

            if (currentQuestion) {
                const isCorrect = answer === currentQuestion.answer;
                patchState(store, (state) => ({
                    score: isCorrect ? state.score + 1 : state.score,
                    answers: [...state.answers, { questionId: currentQuestion.question, answer, isCorrect }]
                }));
            }
        },
        nextQuestion() {
            patchState(store, (state) => {
                const nextIndex = state.currentQuestionIndex + 1;
                const currentOcean = state.oceans.find(o => o.id === state.currentOceanId);

                // Check if quiz finished
                if (currentOcean && nextIndex >= currentOcean.quiz.length) {
                    // If perfect score AND not master mode, mark ocean as completed
                    if (!state.masterMode && state.score === currentOcean.quiz.length) {
                        const completed = [...state.completedOceans];
                        if (!completed.includes(state.currentOceanId!)) {
                            completed.push(state.currentOceanId!);
                        }
                        return { currentQuestionIndex: nextIndex, completedOceans: completed, isQuizActive: false, isQuizFinished: true };
                    }
                    return { currentQuestionIndex: nextIndex, isQuizActive: false, isQuizFinished: true }; // End quiz if master mode or not perfect score
                }

                return { currentQuestionIndex: nextIndex };
            });
        },
        restartQuiz() {
            patchState(store, { currentQuestionIndex: 0, score: 0, answers: [], isQuizActive: true, isQuizFinished: false });
        },
        resetStore() {
            patchState(store, initialState);
        },
        exitQuiz() {
            patchState(store, { isQuizActive: false, isQuizFinished: false, currentOceanId: null, masterMode: false });
        }
    }))
);
