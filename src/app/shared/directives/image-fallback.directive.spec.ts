import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageFallbackDirective } from './image-fallback.directive';

@Component({
  template: `
    <img
      src="invalid-image.jpg"
      appImageFallback="/assets/fallback.png"
      id="test-img"
      alt="Test Image"
    />
    <img src="invalid-image-default.jpg" appImageFallback id="default-img" alt="Default Image" />
  `,
  imports: [ImageFallbackDirective],
  standalone: true,
})
class TestComponent {}

describe('ImageFallbackDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent, ImageFallbackDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('sollte erstellt werden', () => {
    const directive = fixture.debugElement.query(By.directive(ImageFallbackDirective));
    expect(directive).toBeTruthy();
  });

  it('sollte das Fallback-Bild setzen, wenn Fehler (error event) auftritt', () => {
    const imgDebugElement = fixture.debugElement.query(By.css('#test-img'));
    const imgElement = imgDebugElement.nativeElement as HTMLImageElement;

    imgDebugElement.triggerEventHandler('error', null);
    fixture.detectChanges();

    expect(imgElement.getAttribute('src')).toBe('/assets/fallback.png');
  });

  it('sollte das Standard-Fallback nutzen, wenn kein Input übergeben wird', () => {
    const imgDebugElement = fixture.debugElement.query(By.css('#default-img'));
    const imgElement = imgDebugElement.nativeElement as HTMLImageElement;

    imgDebugElement.triggerEventHandler('error', null);
    fixture.detectChanges();

    expect(imgElement.getAttribute('src')).toBe('/assets/images/not_found.webp');
  });
});
