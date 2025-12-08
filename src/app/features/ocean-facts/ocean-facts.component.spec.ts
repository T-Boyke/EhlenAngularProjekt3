import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OceanFactsComponent } from './ocean-facts.component';
import { QuizStore } from '../../store/quiz.store';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { Ocean } from '../../models/ocean.model';

/**
 * Unit-Tests für OceanFactsComponent.
 */
describe('OceanFactsComponent', () => {
  let component: OceanFactsComponent;
  let fixture: ComponentFixture<OceanFactsComponent>;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storeMock: Record<string, any>;

  const mockOcean: Ocean = {
    id: '1',
    name: 'Facts Ocean',
    oceanimage: 'img.jpg',
    description: 'Desc',
    facts: ['Fact 1'],
    inhabitants: [{ name: 'Fish', description: 'Desc', image: 'fish.jpg' }],
    quiz: [],
  };

  beforeEach(async () => {
    routerSpy = { navigate: vi.fn() };
    storeMock = {
      currentOcean: signal(mockOcean),
      startQuiz: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [OceanFactsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: QuizStore, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OceanFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte korrekte Anzahl an Slides berechnen', () => {
    // 1 Intro + 1 Fact + 1 Inhabitant = 3 Slides
    expect(component.slides().length).toBe(3);
  });

  it('sollte vorwärts blättern und hasViewedAll setzen wenn Ende erreicht', () => {
    // Current Index 0
    component.nextSlide(); // Index 1
    expect(component.slideIndex()).toBe(1);
    expect(component.hasViewedAll()).toBe(false);

    component.nextSlide(); // Index 2 (letzter)
    expect(component.slideIndex()).toBe(2);
    expect(component.hasViewedAll()).toBe(true);
  });

  it('sollte rückwärts blättern (loop)', () => {
    component.prevSlide(); // Von 0 auf 2
    expect(component.slideIndex()).toBe(2);
  });

  it('sollte Quiz starten und navigieren', () => {
    component.startQuiz();
    expect(storeMock['startQuiz']).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/quiz']);
  });

  it('sollte zurück navigieren', () => {
    component.goBack();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/selection']);
  });
});
