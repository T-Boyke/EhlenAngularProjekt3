import { Routes } from '@angular/router';
import { StartComponent } from './features/start/start.component';
import { OceanSelectionComponent } from './features/ocean-selection/ocean-selection.component';
import { OceanFactsComponent } from './features/ocean-facts/ocean-facts.component';
import { QuizComponent } from './features/quiz/quiz.component';
import { QuizResultComponent } from './features/quiz-result/quiz-result.component';

export const routes: Routes = [
    { path: '', component: StartComponent },
    { path: 'selection', component: OceanSelectionComponent },
    { path: 'facts/:id', component: OceanFactsComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'result', component: QuizResultComponent },
    { path: '**', redirectTo: '' }
];
