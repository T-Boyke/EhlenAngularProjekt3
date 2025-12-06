import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ocean } from '../models/ocean.model';

/**
 * Service zum Abrufen der Ozean-Daten.
 *
 * Verantwortlichkeit:
 * - Bereitstellung der Daten für die Anwendung.
 * - Abstraktion der Datenquelle (API vs. lokale JSON-Datei).
 * - Fehlerbehandlung beim Datenabruf.
 *
 * @Injectable providedIn: 'root' bedeutet, dass dieser Service ein Singleton ist
 * und in der gesamten Anwendung verfügbar ist.
 */
@Injectable({
  providedIn: 'root'
})
export class OceanDataService {
  // Modernes Dependency Injection via inject() Funktion
  private http = inject(HttpClient);

  // Basis-URLs für Datenquellen
  private apiUrl = '/api/oceans';
  private localUrl = 'assets/data/ocean-data.json';

  /**
   * Ruft die Liste aller Ozeane ab.
   *
   * Implementiert eine Fallback-Strategie:
   * 1. Versucht zuerst, die Daten von der API (`/api/oceans`) zu laden.
   * 2. Wenn dies fehlschlägt (catchError), wird automatisch auf die lokale
   *    JSON-Datei (`assets/data/ocean-data.json`) zurückgegriffen.
   *    Dies stellt sicher, dass die App auch offline oder ohne Backend funktioniert.
   *
   * @returns Observable<Ocean[]> Ein Stream, der das Array der Ozeane liefert.
   */
  getOceans(): Observable<Ocean[]> {
    return this.http.get<Ocean[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('API unavailable, falling back to local data');
        return this.http.get<Ocean[]>(this.localUrl);
      })
    );
  }
}
