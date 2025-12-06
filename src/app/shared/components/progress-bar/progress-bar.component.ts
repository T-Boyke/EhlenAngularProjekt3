import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './progress-bar.component.css',
  template: `
    <div class="progress-bar">
      <div class="progress-bar__fill"
           [style.width.%]="progress"
           [style.background-color]="color">
      </div>
    </div>
  `
})
export class ProgressBarComponent {
  @Input({ required: true }) progress = 0;
  @Input() color = '#FACC15';
}
