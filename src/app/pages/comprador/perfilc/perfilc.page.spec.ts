import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilcPage } from './perfilc.page';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Observable } from 'rxjs/internal/Observable';

// Mock de UserService
class UserServiceMock {
  currentUser$ = new Observable((observer) => {
    observer.next({
      rut: '123456789',
      nombre: 'Test User',
      correo: 'testuser@example.com',
      // Otros campos del usuario
    });
  });

  obtenerUsuario() {
    return Promise.resolve({
      rut: '123456789',
      nombre: 'Test User',
      correo: 'testuser@example.com',
      // Otros campos del usuario
    });
  }

  cerrarSesion() {
    // Simula el cierre de sesión
    return Promise.resolve();
  }
}

// Mock de ServicebdService
class ServicebdServiceMock {
  eliminarUsuario(rut: string) {
    return Promise.resolve(); // Simula la eliminación de usuario
  }
}

// Mock básico para NativeStorage
class NativeStorageMock {
  getItem(key: string): Promise<any> {
    return Promise.resolve('mock-value');
  }

  setItem(key: string, value: any): Promise<any> {
    return Promise.resolve();
  }
}

// Mock de SQLite
class SQLiteMock {
  openDatabase(options: any): any {
    return {
      executeSql: (query: string, params: any[]) => {
        return new Promise((resolve) => {
          resolve({ rows: { length: 0, item: () => null } });
        });
      }
    };
  }
}

describe('PerfilcPage', () => {
  let component: PerfilcPage;
  let fixture: ComponentFixture<PerfilcPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilcPage],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: NativeStorage, useClass: NativeStorageMock },
        { provide: SQLite, useClass: SQLiteMock }, // Mock de SQLite
        AlertController,
        MenuController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});
