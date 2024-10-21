import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambioContraPerfilPage } from './cambio-contra-perfil.page';

describe('CambioContraPerfilPage', () => {
  let component: CambioContraPerfilPage;
  let fixture: ComponentFixture<CambioContraPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioContraPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
