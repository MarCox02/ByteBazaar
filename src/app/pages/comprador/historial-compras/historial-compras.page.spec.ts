import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComprasPage } from './historial-compras.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';

// Crear mocks para los servicios
class MockServicebdService {
  obtenerHistorialComprasPaginado() {
    return of([]); // Simula una respuesta vacía
  }
}

class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '123456789' }); // Simula un usuario con un RUT
  }
}

describe('HistorialComprasPage', () => {
  let component: HistorialComprasPage;
  let fixture: ComponentFixture<HistorialComprasPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialComprasPage ],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
