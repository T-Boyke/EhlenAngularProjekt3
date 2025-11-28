import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

/**
 * Interface für Ozean-Daten
 * @description Definiert die Struktur eines Ozean-Objekts.
 */
interface Ocean {
  id: string;
  name: string;
  oceanimage: string;
}

/**
 * Ocean Card Component
 * 
 * @description
 * Eine wiederverwendbare Karte zur Darstellung eines Ozeans.
 * Zeigt Bild, Titel und Status (Sterne) an.
 * Nutzt NgOptimizedImage für bessere Performance (LCP).
 * 
 * @example
 * <app-ocean-card 
 *   [ocean]="oceanData" 
 *   [isCompleted]="true" 
 *   [priority]="true"
 *   (select)="onSelect($event)">
 * </app-ocean-card>
 */
@Component({
  selector: 'app-ocean-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, NgOptimizedImage],
  template: `
    <div (click)="onSelect()" class="ocean-card group">
      
      <!-- Bild Container -->
      <div class="ocean-card__image-wrapper relative">
         <img [ngSrc]="ocean.oceanimage" 
              [alt]="ocean.name" 
              class="ocean-card__image" 
              fill
              [priority]="priority"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
              appImageFallback>
      </div>
      
      <!-- Titel -->
      <h3 class="ocean-card__title">{{ ocean.name }}</h3>

      <!-- Status Stern -->
      <div class="ocean-card__star"
           [class.ocean-card__star--active]="isCompleted"
           [class.ocean-card__star--inactive]="!isCompleted">
        ★
      </div>
    </div>
  `,
  styleUrls: [] // Styles kommen aus globalen Blöcken (src/styles.css)
})
export class OceanCardComponent {
  /**
   * Das anzuzeigende Ozean-Objekt.
   * @required
   */
  @Input({ required: true }) ocean!: Ocean;

  /**
   * Status, ob der Ozean bereits vollständig erkundet wurde.
   * Steuert die Farbe des Sterns.
   */
  @Input() isCompleted: boolean = false;

  /**
   * Ob das Bild priorisiert geladen werden soll (für LCP).
   * @default false
   */
  @Input() priority: boolean = false;

  /**
   * Event, das gefeuert wird, wenn die Karte geklickt wird.
   * Gibt die ID des Ozeans zurück.
   */
  @Output() select = new EventEmitter<string>();

  /**
   * Behandelt den Klick auf die Karte.
   * Feuert das select Event.
   */
  onSelect() {
    this.select.emit(this.ocean.id);
  }
}
