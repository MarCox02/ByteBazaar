import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContraVPage } from './cambio-contra-v.page';

describe('CambioContraVPage', () => {
  let component: CambioContraVPage;
  let fixture: ComponentFixture<CambioContraVPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContraVPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
