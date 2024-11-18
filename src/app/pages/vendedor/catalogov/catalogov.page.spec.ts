import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogovPage } from './catalogov.page';
import { UserService } from 'src/app/services/user.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController, MenuController } from '@ionic/angular';
import { of } from 'rxjs';

// Mocks de los servicios
class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '12345', nombre: 'Juan' });
  }
}

class MockServicebdService {
  verProductosPorVendedor(rut: string) {
    return Promise.resolve([
      { id_producto: 1, nom_producto: 'Producto 1', imagen: 'image1.jpg' },
      { id_producto: 2, nom_producto: 'Producto 2', imagen: 'image2.jpg' }
    ]);
  }
}

class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve({ rut: '12345', nombre: 'Juan' });
  }
}

class MockMenuController {
  enable() {}
}

class MockAlertController {
  create() {
    return {
      present: () => Promise.resolve()
    };
  }
}

describe('CatalogovPage', () => {
  let component: CatalogovPage;
  let fixture: ComponentFixture<CatalogovPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogovPage],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: MenuController, useClass: MockMenuController },
        { provide: AlertController, useClass: MockAlertController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogovPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente haya sido creado correctamente
  });
});
