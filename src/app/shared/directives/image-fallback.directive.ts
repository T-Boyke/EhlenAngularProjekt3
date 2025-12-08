import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';

/**
 * Image Fallback Directive
 *
 * @description
 * Eine Direktive, die automatisch ein Fallback-Bild setzt,
 * wenn das ursprüngliche Bild nicht geladen werden kann (error event).
 *
 * @example
 * <img src="invalid.jpg" appImageFallback>
 * <img src="invalid.jpg" appImageFallback="assets/fallback.png">
 */
@Directive({
  selector: 'img[appImageFallback]',
  standalone: true,
})
export class ImageFallbackDirective {
  /**
   * Der Pfad zum Fallback-Bild, das angezeigt werden soll, wenn das Originalbild nicht geladen werden kann.
   * Standardwert: '/assets/images/not_found.webp'
   *
   * @type {string}
   */
  @Input() appImageFallback = '/assets/images/not_found.webp';

  private el = inject(ElementRef<HTMLImageElement>);

  /**
   * Event-Handler für das native 'error' Event des Image-Elements.
   * Wenn das Bild nicht geladen werden kann, wird die `src` Eigenschaft auf das Fallback-Bild gesetzt.
   * Verhindert Endlosschleifen, falls das Fallback-Bild ebenfalls nicht existiert.
   */
  @HostListener('error')
  onError() {
    const img = this.el.nativeElement;
    const fallback = this.appImageFallback || '/assets/images/not_found.webp';

    if (img.src !== window.location.origin + fallback) {
      img.src = fallback;
    }
  }
}
