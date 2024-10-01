import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OlvideContraPage } from './olvide-contra.page';

describe('OlvideContraPage', () => {
  let component: OlvideContraPage;
  let fixture: ComponentFixture<OlvideContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvideContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
