import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarvPage } from './publicarv.page';
import { RouterTestingModule } from '@angular/router/testing'; // Para simular la navegación
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserService } from 'src/app/services/user.service';
import { ActionSheetController } from '@ionic/angular';

// Crear mocks de los servicios
class MockServicebdService {
  verProductos() {
    return of([]); // Simula que no hay productos inicialmente
  }
  
  obtenerTiposProducto() {
    return of([{ id_tipo: '1', nom_tipo: 'Electrónica' }]); // Simula tipos de productos
  }
  
  registrarProducto() {
    return of({}); // Simula el registro de un producto exitoso
  }
}

class MockNativeStorage {
  getItem(key: string) {
    return Promise.resolve({ rut: '12345678' }); // Simula el valor del RUT del vendedor
  }
}

class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '12345678' }); // Simula el usuario
  }
}

describe('PublicarvPage', () => {
  let component: PublicarvPage;
  let fixture: ComponentFixture<PublicarvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicarvPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule // Para simular la navegación
      ],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: NativeStorage, useClass: MockNativeStorage },
        { provide: UserService, useClass: MockUserService },
        ActionSheetController
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
