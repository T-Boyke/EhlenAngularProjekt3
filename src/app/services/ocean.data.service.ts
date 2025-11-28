import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocean } from '../models/ocean.model';

@Injectable({
    providedIn: 'root'
})
export class OceanDataService {
    private http = inject(HttpClient);
    private dataUrl = 'assets/data/ocean-data.json';

    getOceans(): Observable<Ocean[]> {
        return this.http.get<Ocean[]>(this.dataUrl);
    }
}
