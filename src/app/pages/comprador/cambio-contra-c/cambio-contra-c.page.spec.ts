import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContraCPage } from './cambio-contra-c.page';

describe('CambioContraCPage', () => {
  let component: CambioContraCPage;
  let fixture: ComponentFixture<CambioContraCPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContraCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
