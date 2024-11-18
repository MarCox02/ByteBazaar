import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

// Mock de CarritoService
class CarritoServiceMock {
  obtenerCarrito() {
    return []; // Retorna un carrito vacío para la prueba
  }

  actualizarCarrito(carrito: any[]) {
    // Simula la actualización del carrito
  }
}

// Mock de ServicebdService
class ServicebdServiceMock {
  sumarStock(id_producto: string, cantidad: number) {
    // Simula la operación de sumar stock
  }
}

// Mock de MenuController
class MenuControllerMock {
  enable(state: boolean, role: string) {
    // Simula la habilitación del menú
  }
}

// Mock de ToastController
class ToastControllerMock {
  create() {
    return {
      present: () => Promise.resolve(),
    };
  }
}

// Mock de Router
class RouterMock {
  navigate(path: string[]) {
    // Simula la navegación
  }
}

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      providers: [
        { provide: CarritoService, useClass: CarritoServiceMock },
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: MenuController, useClass: MenuControllerMock },
        { provide: ToastController, useClass: ToastControllerMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
