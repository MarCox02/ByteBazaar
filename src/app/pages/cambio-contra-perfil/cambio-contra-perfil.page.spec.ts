import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { CambioContraPage } from '../cambio-contra/cambio-contra.page';

// Mock de ServicebdService
class ServicebdServiceMock {
  cambiarContrasenaPorCorreo(correo: string, contrasena: string): Promise<any> {
    return Promise.resolve(); // Simula la respuesta exitosa al cambiar la contraseña
  }
}

// Mock de AlertController
class AlertControllerMock {
  create() {
    return {
      present: () => Promise.resolve(),
      dismiss: () => Promise.resolve(),
    };
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
  navigate(path: string[]): void {
    // Simula la navegación
  }
}

describe('CambioContraPage', () => {
  let component: CambioContraPage;
  let fixture: ComponentFixture<CambioContraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambioContraPage],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: ToastController, useClass: ToastControllerMock },
        { provide: Router, useClass: RouterMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CambioContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
