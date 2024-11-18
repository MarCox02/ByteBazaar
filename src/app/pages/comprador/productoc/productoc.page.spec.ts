import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductocPage } from './productoc.page';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Crear mocks para los servicios
class MockCarritoService {
  obtenerCarrito() {
    return []; // Retorna un carrito vacío
  }

  agregarProducto() {
    // Simula agregar producto
  }
}

class MockUserService {
  obtenerUsuario() {
    return Promise.resolve({ rut: '123456789' }); // Simula un usuario
  }
}

class MockServicebdService {
  obtenerTiposProducto() {
    return Promise.resolve([]); // Retorna tipos de producto vacíos
  }

  obtenerProductoPorId(id: number) {
    return Promise.resolve({
      id_producto: id,
      nom_producto: 'Producto Test',
      desc_producto: 'Descripción del producto',
      precio: 100,
      stock: 10,
      id_tipo: 1,
      imagen: 'url_de_imagen',
      rut_v: '123456789',
      nom_tipo: 'Tipo Test',
      usuario_vendedor: 'Vendedor Test',
    }); // Simula un producto
  }

  restarStock(id_producto: number, cantidad: number) {
    // Simula la acción de restar stock
  }
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: () => '1', // Simula el parámetro 'id' con el valor 1
    },
  };
}

describe('ProductocPage', () => {
  let component: ProductocPage;
  let fixture: ComponentFixture<ProductocPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductocPage],
      providers: [
        { provide: CarritoService, useClass: MockCarritoService },
        { provide: UserService, useClass: MockUserService },
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
