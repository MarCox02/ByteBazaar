import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeleccionPage } from './seleccion.page';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

// Mock de los servicios
class MockCarritoService {
  limpiarCarrito() {}
  obtenerCarrito() {
    return [];
  }
}

class MockNotificacionService {
  requestPermissions() {
    return Promise.resolve(true);
  }

  programarNotificacion() {
    return Promise.resolve();
  }
}

class MockServicebdService {
  presentAlert(title: string, message: string) {}
  obtenerFecha() {
    return new Date();
  }

  crearVenta(rut: string, fecha: Date, costoEnvio: number, totalCompra: number) {
    return Promise.resolve(1); // Simula que la venta fue creada y retorna un ID
  }

  agregarDetalleVenta(idVenta: number, carrito: any[]) {
    return Promise.resolve(); // Simula agregar los productos al detalle de la venta
  }

  getDireccionesByRUT(rut: string) {
    return Promise.resolve([]);
  }

  getTarjetasByRUT(rut: string) {
    return Promise.resolve([]);
  }
}

class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '12345678-9' });
  }
}

describe('SeleccionPage', () => {
  let component: SeleccionPage;
  let fixture: ComponentFixture<SeleccionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [SeleccionPage],
      providers: [
        { provide: CarritoService, useClass: MockCarritoService },
        { provide: NotificacionService, useClass: MockNotificacionService },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigate: () => {} } } // Simulación del Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });
});
