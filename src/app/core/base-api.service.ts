import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Abstrakte Basisklasse für API-Services.
 * Implementiert grundlegende CRUD-Methoden und HTTP-Logik.
 *
 * @template T - Der Typ der Entität.
 */
export abstract class BaseApiService<T> {
  protected http = inject(HttpClient);

  /**
   * Die Basis-URL für die API-Ressource.
   * Muss von der ableitenden Klasse definiert werden.
   */
  protected abstract resourceUrl: string;

  /**
   * Ruft alle Einträge ab.
   *
   * @param params - Optionale HTTP-Parameter.
   * @returns Ein Observable mit der Liste der Einträge.
   */
  getAll(params?: HttpParams): Observable<T[]> {
    return this.http.get<T[]>(this.resourceUrl, { params });
  }

  /**
   * Ruft einen Eintrag anhand der ID ab.
   *
   * @param id - Die ID des Eintrags.
   * @returns Ein Observable mit dem Eintrag.
   */
  getById(id: number | string): Observable<T> {
    return this.http.get<T>(`${this.resourceUrl}/${id}`);
  }

  /**
   * Erstellt einen neuen Eintrag.
   *
   * @param item - Das zu erstellende Objekt.
   * @returns Ein Observable mit dem erstellten Objekt.
   */
  create(item: T): Observable<T> {
    return this.http.post<T>(this.resourceUrl, item);
  }

  /**
   * Aktualisiert einen bestehenden Eintrag.
   *
   * @param id - Die ID des Eintrags.
   * @param item - Die neuen Daten.
   * @returns Ein Observable mit dem aktualisierten Objekt.
   */
  update(id: number | string, item: T): Observable<T> {
    return this.http.put<T>(`${this.resourceUrl}/${id}`, item);
  }

  /**
   * Löscht einen Eintrag.
   *
   * @param id - Die ID des Eintrags.
   * @returns Ein Observable ohne Rückgabewert.
   */
  delete(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.resourceUrl}/${id}`);
  }
}
