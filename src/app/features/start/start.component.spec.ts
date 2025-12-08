import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartComponent } from './start.component';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

/**
 * Unit-Tests für StartComponent.
 */
describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;
  let routerSpy: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    // Router Mock erstellen
    routerSpy = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [StartComponent],
      providers: [{ provide: Router, useValue: routerSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    expect(component).toBeTruthy();
  });

  it('sollte den Titel anzeigen', () => {
    const title = fixture.debugElement.query(By.css('.start-page__title')).nativeElement;
    expect(title.textContent).toBe('Earth Ocean Learning');
  });

  it('sollte beim Klick auf den Button zur Selection-Page navigieren', () => {
    const button = fixture.debugElement.query(By.css('.start-page__button'));
    button.triggerEventHandler('click', null);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/selection']);
  });
});
