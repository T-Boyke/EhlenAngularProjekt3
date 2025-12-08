import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Eine generische UI-Komponente zur Visualisierung von Fortschritt.
 *
 * Verwendungszweck:
 * - Zeigt den Fortschritt eines Quiz oder Prozesses an.
 * - Rein präsentationale Komponente ("Dumb Component").
 *
 * @example
 * <app-progress-bar [progress]="50" color="red"></app-progress-bar>
 */
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './progress-bar.component.css',
  template: `
    <div class="progress-bar">
      <!-- Die Breite wird dynamisch über Style-Binding gesetzt -->
      <div
        class="progress-bar__fill"
        [style.width.%]="progress"
        [style.background-color]="color"
      ></div>
    </div>
  `,
})
export class ProgressBarComponent {
  /**
   * Der aktuelle Fortschrittswert in Prozent.
   * Muss ein Wert zwischen 0 und 100 sein.
   * @required
   */
  @Input({ required: true }) progress = 0;

  /**
   * Die Farbe des Fortschrittsbalkens.
   * Erwartet einen validen CSS-Farbwert (Hex, RGB, Name).
   * Standardwert: '#FACC15' (Gelb/Gold).
   * @default '#FACC15'
   */
  @Input() color = '#FACC15';
}
