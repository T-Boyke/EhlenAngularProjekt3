import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Ocean } from '../models/ocean.model';

@Injectable({
    providedIn: 'root'
})
export class OceanDataService {
    private http = inject(HttpClient);

    // Primary API Endpoint (Grav)
    private apiUrl = '/api/oceans';
    // Fallback for local development
    private localUrl = 'assets/data/ocean-data.json';

    getOceans(): Observable<Ocean[]> {
        return this.http.get<Ocean[]>(this.apiUrl).pipe(
            // If API fails (e.g. running locally without Grav), fall back to local JSON
            catchError(() => {
                console.warn('API unavailable, falling back to local JSON');
                return this.http.get<Ocean[]>(this.localUrl);
            })
        );
    }
}
