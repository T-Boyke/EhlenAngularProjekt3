import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OceanCardComponent } from './ocean-card.component';
import { By } from '@angular/platform-browser';
import { Ocean } from '../../../models/ocean.model';

/**
 * Unit-Tests für die OceanCardComponent.
 *
 * Fokus:
 * - Darstellung (Inputs werden korrekt gerendert).
 * - Interaktion (Events werden gefeuert).
 * - Accessibility (Tastatursteuerung).
 */
describe('OceanCardComponent', () => {
  let component: OceanCardComponent;
  let fixture: ComponentFixture<OceanCardComponent>;

  const mockOcean: Ocean = {
    id: '1',
    name: 'Test Ocean',
    oceanimage: 'test.jpg',
    description: 'Desc',
    facts: [],
    inhabitants: [],
    quiz: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OceanCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(OceanCardComponent);
    component = fixture.componentInstance;
    // Input setzen
    component.ocean = mockOcean;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den Namen des Ozeans anzeigen', () => {
    // Per CSS-Selektor das Element suchen
    const title = fixture.debugElement.query(By.css('.ocean-card__title')).nativeElement;
    expect(title.textContent).toContain('Test Ocean');
  });

  it('sollte standardmäßig einen inaktiven Stern zeigen', () => {
    const star = fixture.debugElement.query(By.css('.ocean-card__star'));
    // Prüfung der CSS-Klassen
    expect(star.classes['ocean-card__star--inactive']).toBe(true);
  });

  it('sollte einen aktiven Stern zeigen, wenn isCompleted=true', () => {
    // Angular 17+ Signal Inputs oder klassische Inputs setzen
    fixture.componentRef.setInput('isCompleted', true);
    fixture.detectChanges(); // UI aktualisieren

    const star = fixture.debugElement.query(By.css('.ocean-card__star'));
    expect(star.classes['ocean-card__star--active']).toBe(true);
  });

  it('sollte beim Klick das Event oceanSelected auslösen', () => {
    // Spy auf den EventEmitter setzen
    const spy = vi.spyOn(component.oceanSelected, 'emit');
    const card = fixture.debugElement.query(By.css('.ocean-card'));

    // Klick simulieren
    card.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('sollte bei ENTER-Taste das Event oceanSelected auslösen (A11y)', () => {
    const spy = vi.spyOn(component.oceanSelected, 'emit');
    const card = fixture.debugElement.query(By.css('.ocean-card'));

    // Tastatur-Event simulieren
    card.triggerEventHandler('keyup.enter', null);

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('sollte tabindex="0" für Barrierefreiheit haben', () => {
    const card = fixture.debugElement.query(By.css('.ocean-card'));
    expect(card.attributes['tabindex']).toBe('0');
  });
});
