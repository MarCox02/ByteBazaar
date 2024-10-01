import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContraPage } from './cambio-contra.page';

describe('CambioContraPage', () => {
  let component: CambioContraPage;
  let fixture: ComponentFixture<CambioContraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
