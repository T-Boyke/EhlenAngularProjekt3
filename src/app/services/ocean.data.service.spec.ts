import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OceanDataService } from './ocean.data.service';
import { Ocean } from '../models/ocean.model';

/**
 * Unit-Tests für den OceanDataService.
 *
 * Ziel:
 * - Testen der HTTP-Kommunikation.
 * - Sicherstellen, dass der Fallback-Mechanismus (API -> JSON) funktioniert.
 */
describe('OceanDataService', () => {
  let service: OceanDataService;
  let httpMock: HttpTestingController;

  // Beispiel-Daten für den Test
  const mockOceans: Ocean[] = [
    { id: '1', name: 'Pacific', oceanimage: 'img.jpg', description: 'Desc', facts: [], inhabitants: [], quiz: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      // HttpClientTestingModule erlaubt das Mocken von HTTP-Anfragen
      imports: [HttpClientTestingModule],
      providers: [OceanDataService]
    });
    service = TestBed.inject(OceanDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Stellt sicher, dass keine unerwarteten Requests offen sind
    httpMock.verify();
  });

  it('sollte erstellt werden', () => {
    expect(service).toBeTruthy();
  });

  it('sollte Ozeane von der API laden (Happy Path)', () => {
    // 1. Aufruf starten
    service.getOceans().subscribe(oceans => {
      expect(oceans.length).toBe(1);
      expect(oceans).toEqual(mockOceans);
    });

    // 2. Erwarteten Request definieren
    const req = httpMock.expectOne('/api/oceans');
    expect(req.request.method).toBe('GET');

    // 3. Antwort simulieren (Antwort zurückgeben)
    req.flush(mockOceans);
  });

  it('sollte auf lokale JSON-Daten zurückfallen, wenn API fehlschlägt', () => {
    // Console.warn unterdrücken, damit der Test-Output sauber bleibt
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    service.getOceans().subscribe(oceans => {
      expect(oceans.length).toBe(1);
      expect(oceans).toEqual(mockOceans);
    });

    // 1. API-Request erwarten und Fehler simulieren (404)
    const apiReq = httpMock.expectOne('/api/oceans');
    apiReq.flush('Error', { status: 404, statusText: 'Not Found' });

    // 2. Automatischen Fallback-Request erwarten (lokales JSON)
    const localReq = httpMock.expectOne('assets/data/ocean-data.json');
    expect(localReq.request.method).toBe('GET');

    // 3. Erfolgreiche Daten simulieren
    localReq.flush(mockOceans);
  });
});
