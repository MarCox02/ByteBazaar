import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogocPage } from './catalogoc.page';
import { UserService } from 'src/app/services/user.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { of } from 'rxjs';

// Mock de UserService
class UserServiceMock {
  obtenerUsuario() {
    return Promise.resolve({ rut: '12345678-9', nombre: 'Juan Pérez' }); // Simulamos que obtenemos un usuario
  }
}

// Mock de ServicebdService
class ServicebdServiceMock {
  verProductos() {
    return Promise.resolve([
      { id_producto: 1, nom_producto: 'Producto 1', imagen: 'ruta/imagen1.jpg', id_tipo: '1' },
      { id_producto: 2, nom_producto: 'Producto 2', imagen: 'ruta/imagen2.jpg', id_tipo: '2' }
    ]); // Simulamos la carga de productos
  }
}

// Mock de NativeStorage
class NativeStorageMock {
  getItem(key: string) {
    if (key === 'usuario') {
      return Promise.resolve({ rut: '12345678-9', nombre: 'Juan Pérez' });
    }
    return Promise.reject('No encontrado');
  }
}

// Mock de MenuController
class MenuControllerMock {
  enable(state: boolean, role: string) {
    // Simulamos habilitar/deshabilitar el menú
  }
}

// Mock de AlertController
class AlertControllerMock {
  create() {
    return {
      present: () => Promise.resolve(),
    };
  }
}

describe('CatalogocPage', () => {
  let component: CatalogocPage;
  let fixture: ComponentFixture<CatalogocPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogocPage],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: ServicebdService, useClass: ServicebdServiceMock },
        { provide: NativeStorage, useClass: NativeStorageMock },
        { provide: AlertController, useClass: AlertControllerMock },
        { provide: MenuController, useClass: MenuControllerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
