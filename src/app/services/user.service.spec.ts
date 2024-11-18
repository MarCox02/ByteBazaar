import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from './servicebd.service';
import { CarritoService } from './carrito.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

class MockNativeStorage {
  setItem() {}
  getItem() { return Promise.resolve({}); }
}

class MockServicebdService {
  cambiarContrasena() {}
}

class MockCarritoService {
  obtenerCarrito() { return []; }
  limpiarCarrito() {}
}

class MockAlertController {
  create() {
    return { present: () => {} };
  }
}

class MockRouter {
  navigate() {}
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: CarritoService, useClass: MockCarritoService },
        { provide: AlertController, useClass: MockAlertController },
        { provide: Router, useClass: MockRouter },
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
