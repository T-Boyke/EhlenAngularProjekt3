import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Progress Bar Component
 * 
 * @description
 * Eine wiederverwendbare Fortschrittsanzeige.
 * Zeigt einen Balken basierend auf einem Prozentwert an.
 * 
 * @example
 * <app-progress-bar [progress]="50"></app-progress-bar>
 */
@Component({
    selector: 'app-progress-bar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="progress-container w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
      <div class="progress-fill h-2.5 rounded-full transition-all duration-500"
           [style.width.%]="progress"
           [style.background-color]="color">
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class ProgressBarComponent {
    /**
     * Der Fortschritt in Prozent (0-100).
     * @required
     */
    @Input({ required: true }) progress: number = 0;

    /**
     * Die Farbe des Fortschrittsbalkens.
     * Standard ist Gelb (#FACC15 - Tailwind yellow-400).
     */
    @Input() color: string = '#FACC15';
}
