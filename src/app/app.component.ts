import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Die Wurzel-Komponente ("Root Component") der Anwendung.
 *
 * Verwendungszweck:
 * - Bootstrapping-Punkt der Angular-Application.
 * - Beinhaltet das `RouterOutlet` zur Anzeige der aktiven Route (Seite).
 *
 * Strategie:
 * - `OnPush` Change Detection für maximale Performance (Zone.js wird entlastet).
 * - Minimalistisches Template, da das meiste Layout in den Feature-Komponenten liegt.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
