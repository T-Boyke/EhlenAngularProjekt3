import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';

// Lokales Interface für die benötigten Daten (Subset von Ocean)
// Dient der Entkopplung: Die Karte muss nicht das gesamte Ocean-Model kennen.
interface Ocean {
  id: string;
  name: string;
  oceanimage: string;
}

/**
 * Eine wiederverwendbare Karte zur Darstellung eines Ozeans.
 *
 * Verwendung:
 * - Wird in der Ozean-Auswahl (`OceanSelectionComponent`) genutzt.
 * - Zeigt Bild, Name und einen "Erledigt"-Stern an.
 * - Unterstützt Accessibility (Tastatursteuerung via Enter).
 * - Nutzt `NgOptimizedImage` für performantes Laden von Bildern (LCP-Optimierung).
 */
@Component({
  selector: 'app-ocean-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, NgOptimizedImage],
  template: `
    @if (ocean) {
    <!--
       div ist fokussierbar (tabindex="0") für Barrierefreiheit.
       (keyup.enter) ermöglicht Auswahl per Tastatur.
    -->
    <div (click)="onSelect()" (keyup.enter)="onSelect()" tabindex="0" class="ocean-card group">

      <div class="ocean-card__image-wrapper">
         <!--
            NgOptimizedImage Directive:
            - 'fill': Bild füllt den Container
            - 'priority': Lädt wichtige Bilder (z.B. viewport) früher (LCP)
            - 'sizes': Responsive Bildgrößen für verschiedene Viewports
         -->
         <img [ngSrc]="ocean.oceanimage"
              [alt]="ocean.name"
              class="ocean-card__image"
              fill
              [priority]="priority"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
              appImageFallback>
      </div>

      <h3 class="ocean-card__title">{{ ocean.name }}</h3>

      <!-- Visueller Indikator für abgeschlossene Quizze -->
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
  /** Das darzustellende Ozean-Objekt. Required = Muss übergeben werden. */
  @Input({ required: true }) ocean!: Ocean;

  /** Status: Hat der Nutzer das Quiz für diesen Ozean bereits bestanden? */
  @Input() isCompleted = false;

  /** LCP-Optimierung: Wenn true, wird das Bild mit hoher Priorität geladen. */
  @Input() priority = false;

  /** Event: Feuert die ID des Ozeans, wenn die Karte angeklickt wird. */
  @Output() oceanSelected = new EventEmitter<string>();

  /**
   * Handler für Klick- und Tastatur-Events.
   * Leitet die Auswahl an die Eltern-Komponente weiter.
   */
  onSelect() {
    this.oceanSelected.emit(this.ocean.id);
  }
}
