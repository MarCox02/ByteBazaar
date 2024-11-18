import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleVentaPage } from './detalle-venta.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Crear mocks para los servicios
class MockServicebdService {
  obtenerDetalleBoleta(id_venta: number) {
    return Promise.resolve([ // Simula los detalles de la venta
      { id_producto: 1, nom_producto: 'Producto 1', cantidad: 2, precio: 100 },
      { id_producto: 2, nom_producto: 'Producto 2', cantidad: 1, precio: 150 }
    ]);
  }
}

class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '123456789' }); // Simula un usuario con un RUT
  }
}

class MockActivatedRoute {
  queryParams = of({ id_venta: 1 }); // Simula los parámetros de la ruta con el id_venta
}

describe('DetalleVentaPage', () => {
  let component: DetalleVentaPage;
  let fixture: ComponentFixture<DetalleVentaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleVentaPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleVentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detalles de venta on init', async () => {
    // Simula que el componente ha cargado y ha obtenido los detalles de la venta
    await component.ngOnInit();
    expect(component.detallesVenta.length).toBe(2); // Esperamos que se carguen dos productos
  });

  it('should set rutUsuario from user service', async () => {
    await component.ngOnInit();
    expect(component.rutUsuario).toBe('123456789');
  });
});
