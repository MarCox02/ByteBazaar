import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Platform } from '@ionic/angular';
import { UserService } from './user.service';
import { AlertController } from '@ionic/angular';

// Mock de las dependencias
class MockSQLite {
  // Simula los métodos de SQLite que puedes necesitar
  create({ name, location }: any) {
    return Promise.resolve();
  }
}

class MockNativeStorage {
  setItem(key: string, value: any) {
    return Promise.resolve();
  }

  getItem(key: string) {
    return Promise.resolve('some value');
  }
}

class MockPlatform {
  ready() {
    return Promise.resolve('ready');
  }
}

class MockUserService {
  // Simula los métodos del servicio de usuario si es necesario
}

class MockAlertController {
  create() {
    return Promise.resolve({
      present: () => {}
    });
  }
}

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SQLite, useClass: MockSQLite },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: Platform, useClass: MockPlatform },
        { provide: UserService, useClass: MockUserService },
        { provide: AlertController, useClass: MockAlertController },
      ]
    });
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se haya creado correctamente
  });
});
