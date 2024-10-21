import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroduzcaContraPage } from './introduzca-contra.page';

describe('IntroduzcaContraPage', () => {
  let component: IntroduzcaContraPage;
  let fixture: ComponentFixture<IntroduzcaContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroduzcaContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
