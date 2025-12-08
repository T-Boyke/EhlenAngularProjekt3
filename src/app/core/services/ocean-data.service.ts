import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ocean } from '../../models/ocean.model';

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
  providedIn: 'root',
})
export class OceanDataService {
  // Modernes Dependency Injection via inject() Funktion
  private http = inject(HttpClient);

  // Basis-URLs für Datenquellen
  private apiUrl = 'http://127.0.0.1:8000/eol-api/data';
  private localUrl = 'assets/data/ocean-data.json';

  /**
   * Ruft die Liste aller Ozeane ab.
   *
   * Implementiert eine Fallback-Strategie:
   * 1. Versucht zuerst, die Daten von der Live-API (`/api/oceans`) zu laden.
   * 2. Tritt ein Fehler auf (z.B. API nicht erreichbar), wird der Fehler abgefangen (`catchError`).
   * 3. Als Fallback wird automatisch auf die lokale JSON-Datei (`assets/data/ocean-data.json`) zugegriffen.
   *
   * Dies gewährleistet die grundlegende Funktionalität der Anwendung auch bei Netzwerkproblemen oder offline-Nutzung.
   *
   * @returns {Observable<Ocean[]>} Ein Observable, das ein Array von {@link Ocean}-Objekten emittiert.
   */
  getOceans(): Observable<Ocean[]> {
    return this.http.get<Ocean[]>(this.apiUrl).pipe(
      catchError((error: unknown) => {
        // Logge den Fehler für Debugging-Zwecke, aber störe nicht den User-Flow
        console.warn('API nicht verfügbar, lade lokale Fallback-Daten.', error);
        return this.http.get<Ocean[]>(this.localUrl);
      })
    );
  }
}
