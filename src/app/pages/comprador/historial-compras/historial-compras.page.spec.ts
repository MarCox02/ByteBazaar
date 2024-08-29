import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComprasPage } from './historial-compras.page';

describe('HistorialComprasPage', () => {
  let component: HistorialComprasPage;
  let fixture: ComponentFixture<HistorialComprasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
