import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Eine generische Fortschrittsleiste.
 *
 * Funktion:
 * - Visualisiert einen Prozentwert (0-100) als balken.
 * - Farbe ist konfigurierbar.
 *
 * Architektur:
 * - "Dumb Component": Enthält keine Logik, nur Darstellung basierend auf Inputs.
 */
@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './progress-bar.component.css',
  template: `
    <div class="progress-bar">
      <!-- Die Breite wird dynamisch über Style-Binding gesetzt -->
      <div class="progress-bar__fill"
           [style.width.%]="progress"
           [style.background-color]="color">
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  /** Der Fortschritt in Prozent (0 bis 100). */
  @Input({ required: true }) progress = 0;

  /** Die Farbe des Balkens (CSS-Farbwert). Standard: Gelb/Gold ('#FACC15'). */
  @Input() color = '#FACC15';
}
