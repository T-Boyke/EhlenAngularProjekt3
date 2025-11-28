import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start',
    standalone: true,
    styleUrl: './start.component.css',
    template: `
    <div class="start-page">
      <div class="start-page__card">
        <!-- Logo Placeholder -->
        <div class="start-page__logo-wrapper">
          <span class="start-page__logo">🌊</span>
        </div>
        
        <h1 class="start-page__title">Earth Ocean Learning</h1>
        
        <div class="start-page__fact-box">
          <p class="start-page__fact-label">Wusstest du, dass...</p>
          <p class="start-page__fact-text">...der Ozean mehr als 70% der Erdoberfläche bedeckt?</p>
        </div>

        <button (click)="start()" class="start-page__button">
          Los geht's! 🚀
        </button>
      </div>
    </div>
  `
})
export class StartComponent {
    private router = inject(Router);

    start() {
        this.router.navigate(['/selection']);
    }
}
