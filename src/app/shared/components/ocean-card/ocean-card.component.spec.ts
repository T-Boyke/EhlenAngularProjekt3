import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OceanCardComponent } from './ocean-card.component';
import { By } from '@angular/platform-browser';
import { Ocean } from '../../../models/ocean.model';

describe('OceanCardComponent', () => {
  let component: OceanCardComponent;
  let fixture: ComponentFixture<OceanCardComponent>;

  const mockOcean: Ocean = {
    id: '1',
    name: 'Test Ocean',
    color: 'blue',
    oceanimage: 'test.jpg',
    description: '',
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
    component.ocean = mockOcean;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ocean name', () => {
    const title = fixture.debugElement.query(By.css('.ocean-card__title')).nativeElement;
    expect(title.textContent).toContain('Test Ocean');
  });

  it('should display inactive star by default', () => {
    const star = fixture.debugElement.query(By.css('.ocean-card__star'));
    expect(star.classes['ocean-card__star--inactive']).toBe(true);
  });

  it('should display active star when isCompleted is true', () => {
    fixture.componentRef.setInput('isCompleted', true);
    fixture.detectChanges();
    const star = fixture.debugElement.query(By.css('.ocean-card__star'));
    expect(star.classes['ocean-card__star--active']).toBe(true);
  });

  it('should emit oceanSelected event on click', () => {
    const spy = vi.spyOn(component.oceanSelected, 'emit');
    const card = fixture.debugElement.query(By.css('.ocean-card'));

    card.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should emit oceanSelected event on Enter key', () => {
    const spy = vi.spyOn(component.oceanSelected, 'emit');
    const card = fixture.debugElement.query(By.css('.ocean-card'));

    card.triggerEventHandler('keyup.enter', null);

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should have tabindex="0" for accessibility', () => {
    const card = fixture.debugElement.query(By.css('.ocean-card'));
    expect(card.attributes['tabindex']).toBe('0');
  });
});
