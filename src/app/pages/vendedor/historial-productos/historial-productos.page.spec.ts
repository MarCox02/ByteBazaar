import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialProductosPage } from './historial-productos.page';

describe('HistorialProductosPage', () => {
  let component: HistorialProductosPage;
  let fixture: ComponentFixture<HistorialProductosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
