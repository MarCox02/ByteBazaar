import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarvPage } from './publicarv.page';
import { RouterTestingModule } from '@angular/router/testing'; // Para simular la navegación
import { AlertController, IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserService } from 'src/app/services/user.service';
import { ActionSheetController } from '@ionic/angular';
import { Camera, Photo } from '@capacitor/camera';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';
import { Producto } from 'src/app/services/Modelo/producto';

// Crear mocks de los servicios
class MockServicebdService {
  verProductos() {
    return of([]); // Simula que no hay productos inicialmente
  }

  obtenerTiposProducto() {
    return of([{ id_tipo: '1', nom_tipo: 'Pantalla' }]); // Cambiado a 'Pantalla'
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
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: AlertController, useValue: { create: jasmine.createSpy('create').and.returnValue(Promise.resolve({ present: jasmine.createSpy('present') })) } },
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
  
  it('debería mostrar error si el nombre del producto es demasiado corto', async () => {
    component.nombreProducto = 'TV';
    await component.formulario();
    expect(component.mensajeErrorNombre).toBe('El nombre del producto debe tener al menos 3 caracteres');
  });

  it('debería mostrar error si la descripción del producto es demasiado corta', async () => {
    component.descripcionProducto = 'Muy corta';
    await component.formulario();
    expect(component.mensajeErrorDescripcion).toBe('La descripción debe tener al menos 10 caracteres');
  });

  it('debería mostrar error si el stock es menor a 1', async () => {
    component.cantidad = 0;
    await component.formulario();
    expect(component.mensajeErrorStock).toBe('El stock no puede ser menor a 1');
  });
  
  it('debería mostrar error si el precio es menor a 1000', async () => {
    component.precio = 500;
    await component.formulario();
    expect(component.mensajeErrorPrecio).toBe('El precio no puede ser menor a 1000 o negativo');
  });


  it('debería mostrar una alerta si ocurre un error al cargar los productos', async () => {
    // Usar 'as any' para acceder a la propiedad privada bdService
    spyOn((component as any).bdService, 'verProductos').and.returnValue(Promise.reject('Error de carga'));
    spyOn(component, 'alerta');
    
    await component.cargarProductos();
    
    expect(component.alerta).toHaveBeenCalledWith('Error', 'No se pudieron cargar los productos');
  });

  
  
});
