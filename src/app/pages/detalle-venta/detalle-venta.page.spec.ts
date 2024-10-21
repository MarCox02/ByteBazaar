import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleVentaPage } from './detalle-venta.page';

describe('DetalleVentaPage', () => {
  let component: DetalleVentaPage;
  let fixture: ComponentFixture<DetalleVentaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
