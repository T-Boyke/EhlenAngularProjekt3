import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

interface Ocean {
  id: string;
  name: string;
  oceanimage: string;
}

@Component({
  selector: 'app-ocean-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, NgOptimizedImage],
  template: `
    @if (ocean) {
    <div (click)="onSelect()" (keyup.enter)="onSelect()" tabindex="0" class="ocean-card group">

      <div class="ocean-card__image-wrapper">
         <img [ngSrc]="ocean.oceanimage"
              [alt]="ocean.name"
              class="ocean-card__image"
              fill
              [priority]="priority"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
              appImageFallback>
      </div>

      <h3 class="ocean-card__title">{{ ocean.name }}</h3>

      <div class="ocean-card__star"
           [class.ocean-card__star--active]="isCompleted"
           [class.ocean-card__star--inactive]="!isCompleted">
        ★
      </div>
    </div>
    }
  `,
  styleUrl: './ocean-card.component.css'
})
export class OceanCardComponent {
  @Input({ required: true }) ocean!: Ocean;
  @Input() isCompleted = false;
  @Input() priority = false;
  @Output() oceanSelected = new EventEmitter<string>();

  onSelect() {
    this.oceanSelected.emit(this.ocean.id);
  }
}
