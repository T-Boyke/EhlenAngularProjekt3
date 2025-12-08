import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageFallbackDirective } from '../../directives/image-fallback.directive';
import { Ocean } from '../../../models/ocean.model';

/**
 * Eine wiederverwendbare UI-Komponente zur Darstellung eines Ozeans in einer Karte.
 *
 * Verwendungszweck:
 * - Anzeige in der Übersicht (OceanSelection).
 * - Bietet Navigationsmöglichkeiten (Klick/Enter) zur Detailansicht.
 *
 * Features:
 * - Barrierefreiheit (Tastatursteuerung).
 * - Performance (LCP-Optimierung durch NgOptimizedImage).
 * - Robustheit (Fallback-Bild bei Ladefehlern).
 *
 * @example
 * <app-ocean-card [ocean]="oceanData" (oceanSelected)="handleSelection($event)"></app-ocean-card>
 */
@Component({
  selector: 'app-ocean-card',
  standalone: true,
  imports: [CommonModule, ImageFallbackDirective, NgOptimizedImage],
  template: `
    @if (ocean) {
    <!--
       Container ist fokussierbar (tabindex="0") für Barrierefreiheit.
       Unterstützt Tastaturnavigation via Enter-Taste.
    -->
    <div (click)="onSelect()" (keyup.enter)="onSelect()" tabindex="0" class="ocean-card group">
      <div class="ocean-card__image-wrapper">
        <!--
            NgOptimizedImage Directive für High-Performance-Image-Loading.
            Optimiert automatisch LCP (Largest Contentful Paint) wenn 'priority' gesetzt ist.
         -->
        <img
          [ngSrc]="ocean.oceanimage"
          [alt]="ocean.name"
          class="ocean-card__image"
          fill
          [priority]="priority"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 40vw, 20vw"
          appImageFallback
        />
      </div>

      <h3 class="ocean-card__title">{{ ocean.name }}</h3>

      <!--
        Visueller Indikator (Stern) für abgeschlossene Quizze
        Klassen-Binding basiert auf dem 'isCompleted' Input.
      -->
      <div
        class="ocean-card__star"
        [class.ocean-card__star--active]="isCompleted"
        [class.ocean-card__star--inactive]="!isCompleted"
      >
        ★
      </div>
    </div>
    }
  `,
  styleUrl: './ocean-card.component.css',
})
export class OceanCardComponent {
  /**
   * Das Ozean-Objekt, dessen Daten angezeigt werden sollen.
   * Dieses Feld ist zwingend erforderlich.
   * @required
   */
  @Input({ required: true }) ocean!: Ocean;

  /**
   * Gibt an, ob der Nutzer das Quiz zu diesem Ozean bereits erfolgreich absolviert hat.
   * Wenn `true`, wird ein goldener Stern angezeigt.
   * @default false
   */
  @Input() isCompleted = false;

  /**
   * Steuert die Lade-Priorität des Bildes.
   * Sollte für Bilder im sichtbaren Bereich (Above-the-Fold) auf `true` gesetzt werden (LCP-Optimierung).
   * @default false
   */
  @Input() priority = false;

  /**
   * Event, das ausgelöst wird, wenn der Nutzer die Karte auswählt (Klick oder Enter).
   * Payload: Die ID des ausgewählten Ozeans.
   */
  @Output() oceanSelected = new EventEmitter<string>();

  /**
   * Behandelt Interaktionen (Klick, Tastatur) und leitet die Auswahl weiter.
   * Löst das `oceanSelected` Event aus.
   */
  onSelect() {
    this.oceanSelected.emit(this.ocean.id);
  }
}
