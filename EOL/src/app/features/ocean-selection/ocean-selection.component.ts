import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizStore } from '../../store/quiz.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ocean-selection',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="min-h-screen w-full p-8 flex flex-col items-center justify-center overflow-y-auto">
      <h2 class="text-3xl font-bold text-white mb-8 drop-shadow-md animate-pop-in">Wähle einen Ozean</h2>
      
      <div class="flex flex-wrap justify-center gap-8 w-full max-w-7xl">
        @for (ocean of store.oceans(); track ocean.id) {
          <div (click)="selectOcean(ocean.id)" 
               class="glass-card cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/40 group relative animate-pop-in w-full sm:w-80 md:w-96"
               [style.animation-delay]="$index * 100 + 'ms'">
            
            <div class="w-full h-40 rounded-xl overflow-hidden mb-4 bg-white/50 shadow-inner relative">
               <img [src]="ocean.oceanimage" [alt]="ocean.name" class="w-full h-full object-cover" 
                    onerror="this.src='assets/images/pacific.png'">
            </div>
            
            <h3 class="text-xl font-bold text-blue-900 text-center group-hover:text-blue-700">{{ ocean.name }}</h3>

            <!-- Star Indicator -->
            <div class="absolute top-4 right-4 text-2xl transition-colors z-10"
                 [class.text-yellow-400]="store.isOceanCompleted()(ocean.id)"
                 [class.text-gray-400]="!store.isOceanCompleted()(ocean.id)">
              ★
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class OceanSelectionComponent implements OnInit {
  store = inject(QuizStore);
  private router = inject(Router);

  ngOnInit() {
    this.store.loadOceans();
  }

  selectOcean(id: string) {
    this.store.selectOcean(id);
    this.router.navigate(['/facts', id]);
  }
}
