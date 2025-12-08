import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OceanSelectionComponent } from './ocean-selection.component';
import { QuizStore } from '../../store/quiz.store';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { Ocean } from '../../models/ocean.model';

/**
 * Unit-Tests für OceanSelectionComponent.
 */
describe('OceanSelectionComponent', () => {
  let component: OceanSelectionComponent;
  let fixture: ComponentFixture<OceanSelectionComponent>;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storeMock: Record<string, any>;

  // Mock-Daten
  const mockOcean: Ocean = {
    id: '1',
    name: 'Test',
    oceanimage: 'test.jpg',
    description: '',
    facts: [],
    inhabitants: [],
    quiz: [],
  };

  beforeEach(async () => {
    routerSpy = { navigate: vi.fn() };

    // Einfacher Mock für den SignalStore
    storeMock = {
      oceans: signal([mockOcean]),
      isOceanCompleted: vi.fn().mockReturnValue(false),
      isMasterUnlocked: signal(false),
      completedOceans: signal([]),
      loadOceans: vi.fn(),
      selectOcean: vi.fn(),
      startMasterQuiz: vi.fn(),
      isLoading: signal(false), // Neu: Für Lade-Indikator
    };

    await TestBed.configureTestingModule({
      imports: [OceanSelectionComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: QuizStore, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OceanSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte beim Initialisieren Ozeane laden, wenn leer', () => {
    // Falls leer
    storeMock['oceans'].set([]);
    component.ngOnInit();
    expect(storeMock['loadOceans']).toHaveBeenCalled();
  });

  it('sollte beim Klick auf eine Karte selectOcean und Navigate aufrufen', () => {
    component.selectOcean('1');
    expect(storeMock['selectOcean']).toHaveBeenCalledWith('1');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/facts', '1']);
  });

  it('sollte MasterQuiz NICHT starten, wenn gesperrt', () => {
    storeMock['isMasterUnlocked'].set(false);
    component.startMasterQuiz();
    expect(storeMock['startMasterQuiz']).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('sollte MasterQuiz starten, wenn freigeschaltet', () => {
    storeMock['isMasterUnlocked'].set(true);
    component.startMasterQuiz();
    expect(storeMock['startMasterQuiz']).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/quiz']);
  });
});
