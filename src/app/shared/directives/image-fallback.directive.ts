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
    standalone: true
})
export class ImageFallbackDirective {
    /**
     * Der Pfad zum Fallback-Bild.
     * Standard: '/assets/images/not_found.webp'
     */
    @Input() appImageFallback = '/assets/images/not_found.webp';
    private el = inject(ElementRef<HTMLImageElement>);

    /**
     * Horcht auf das 'error' Event des Image-Elements.
     * Setzt die src auf das Fallback-Bild.
     */
    @HostListener('error')
    onError() {
        const img = this.el.nativeElement;
        if (img.src !== window.location.origin + this.appImageFallback) {
            img.src = this.appImageFallback;
        }
    }
}
