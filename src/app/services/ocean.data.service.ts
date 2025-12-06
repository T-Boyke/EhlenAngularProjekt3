import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Ocean } from '../models/ocean.model';

@Injectable({
  providedIn: 'root'
})
export class OceanDataService {
  private http = inject(HttpClient);
  private apiUrl = '/api/oceans';
  private localUrl = 'assets/data/ocean-data.json';

  getOceans(): Observable<Ocean[]> {
    return this.http.get<Ocean[]>(this.apiUrl).pipe(
      catchError(() => {
        console.warn('API unavailable, falling back to local data');
        return this.http.get<Ocean[]>(this.localUrl);
      })
    );
  }
}
