import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { By } from '@angular/platform-browser';

/**
 * Unit-Tests für den LoadingSpinnerComponent.
 *
 * Ziel:
 * - Sicherstellen, dass der Spinner korrekt gerendert wird.
 * - Überprüfen des angezeigten Textes.
 */
describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den Lade-Text anzeigen', () => {
    const textElement = fixture.debugElement.query(By.css('.spinner-text'));
    expect(textElement.nativeElement.textContent).toContain('Lade Ozeane...');
  });

  it('sollte den Spinner-Div rendern', () => {
    const spinnerElement = fixture.debugElement.query(By.css('.spinner'));
    expect(spinnerElement).toBeTruthy();
  });
});
