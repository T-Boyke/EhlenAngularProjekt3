import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { By } from '@angular/platform-browser';

/**
 * Unit-Tests für ProgressBarComponent.
 */
describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den Fortschritt via Inline-Style setzen', () => {
    // 1. Input setzen
    fixture.componentRef.setInput('progress', 75);
    fixture.detectChanges();

    // 2. DOM prüfen
    const fill = fixture.debugElement.query(By.css('.progress-bar__fill')).nativeElement;
    // width style kann "75%" oder ähnliches sein
    expect(fill.style.width).toBe('75%');
  });

  it('sollte die Farbe via Inline-Style setzen', () => {
    fixture.componentRef.setInput('color', 'red');
    fixture.detectChanges();

    const fill = fixture.debugElement.query(By.css('.progress-bar__fill')).nativeElement;
    expect(fill.style.backgroundColor).toBe('red');
  });

  it('sollte die Standardfarbe verwenden, wenn keine Farbe übergeben wird', () => {
    // Keine Farbe gesetzt -> default
    expect(component.color).toBe('#FACC15');

    // Check DOM just to be sure
    const fill = fixture.debugElement.query(By.css('.progress-bar__fill')).nativeElement;
    expect(fill).toBeTruthy();
  });
});
