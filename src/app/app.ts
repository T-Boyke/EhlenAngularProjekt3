import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  // styleUrl wurde entfernt, da app.css gelöscht ist
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
}