import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OceanDataService } from './ocean.data.service';
import { Ocean } from '../models/ocean.model';

describe('OceanDataService', () => {
  let service: OceanDataService;
  let httpMock: HttpTestingController;

  const mockOceans: Ocean[] = [
    { id: '1', name: 'Pacific', color: 'blue', oceanimage: 'img.jpg', description: 'Desc', facts: [], inhabitants: [], quiz: [] }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OceanDataService]
    });
    service = TestBed.inject(OceanDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch oceans from API', () => {
    service.getOceans().subscribe(oceans => {
      expect(oceans.length).toBe(1);
      expect(oceans).toEqual(mockOceans);
    });

    const req = httpMock.expectOne('/api/oceans');
    expect(req.request.method).toBe('GET');
    req.flush(mockOceans);
  });

  it('should fallback to local JSON on API failure', () => {
    // Spy on console.warn to suppress it in test output
    vi.spyOn(console, 'warn').mockImplementation(() => {});

    service.getOceans().subscribe(oceans => {
      expect(oceans.length).toBe(1);
      expect(oceans).toEqual(mockOceans);
    });

    // 1. Expect API Call -> Fail
    const apiReq = httpMock.expectOne('/api/oceans');
    apiReq.flush('Error', { status: 404, statusText: 'Not Found' });

    // 2. Expect Fallback Call -> Success
    const localReq = httpMock.expectOne('assets/data/ocean-data.json');
    expect(localReq.request.method).toBe('GET');
    localReq.flush(mockOceans);
  });
});
