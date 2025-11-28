import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
 * 
 * @example
 * <app-ocean-card 
 *   [ocean]="oceanData" 
 *   [isCompleted]="true" 
 *   (select)="onSelect($event)">
 * </app-ocean-card>
 */
@Component({
    selector: 'app-ocean-card',
    standalone: true,
    imports: [CommonModule, ImageFallbackDirective],
    template: `
    <div (click)="onSelect()" class="ocean-card group">
      
      <!-- Bild Container -->
      <div class="ocean-card__image-wrapper">
         <img [src]="ocean.oceanimage" 
              [alt]="ocean.name" 
              class="ocean-card__image" 
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
    styleUrls: [] // Styles kommen aus globalen Blöcken (src/styles/blocks/_cards.css)
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
