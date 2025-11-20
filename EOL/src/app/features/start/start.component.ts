import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-start',
    standalone: true,
    template: `
    <div class="flex items-center justify-center h-screen w-full">
      <div class="glass-card w-full max-w-md text-center animate-fly-in flex flex-col items-center gap-6">
        <!-- Logo Placeholder -->
        <div class="w-32 h-32 rounded-full bg-white/50 flex items-center justify-center shadow-inner mb-2">
          <span class="text-4xl">🌊</span>
        </div>
        
        <h1 class="text-4xl font-extrabold text-blue-900 drop-shadow-sm">Earth Ocean Learning</h1>
        
        <div class="bg-white/30 p-4 rounded-xl w-full">
          <p class="text-sm font-semibold text-blue-800 mb-1">Wusstest du, dass...</p>
          <p class="text-slate-700 italic">...der Ozean mehr als 70% der Erdoberfläche bedeckt?</p>
        </div>

        <button (click)="start()" class="glass-btn glass-btn-primary text-xl w-full mt-4">
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
