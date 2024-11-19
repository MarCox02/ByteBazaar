import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Producto } from 'src/app/services/Modelo/producto';

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

  it('debería inicializar el carrito al cargarse la página', () => {
    // Asegúrate de incluir todas las propiedades necesarias para un Producto
    const mockCarrito: Producto[] = [
      {
        id_producto: 1,
        nom_producto: 'Producto 1',
        desc_producto: 'Descripción del Producto 1',
        precio: 100,
        cantidad: 2,
        stock: 5,
        id_tipo: '1', // Ajusta según tu tipo de producto
        imagen: 'url_de_imagen', // Proporciona una URL de imagen o un valor representativo
        rut_v: '12345678-9' // RUT del vendedor, ajusta según tus necesidades
      }
    ];
  
    // Configura el spy antes de inicializar el componente
    const obtenerCarritoSpy = spyOn(component['carritoService'], 'obtenerCarrito').and.returnValue(mockCarrito);
  
    // Llama a ngOnInit para inicializar la página
    component.ngOnInit();
  
    // Verifica que la función se haya llamado
    expect(obtenerCarritoSpy).toHaveBeenCalled();
  
    // Verifica que el carrito tenga los valores esperados
    expect(component.carrito.length).toBe(1);
    expect(component.carrito).toEqual(mockCarrito);
  });
  
  

  it('debería calcular correctamente el precio total del carrito', () => {
    component.carrito = [
      { precio: 100, cantidad: 2 },
      { precio: 50, cantidad: 1 },
    ];
    const totalPrice = component.getTotalPrice();
    expect(totalPrice).toBe(250); // 100*2 + 50*1
  });

  it('debería eliminar un producto del carrito correctamente', () => {
    component.carrito = [
      { id_producto: 1, nom_producto: 'Producto 1', precio: 100, cantidad: 2, stock: 5 },
      { id_producto: 2, nom_producto: 'Producto 2', precio: 50, cantidad: 1, stock: 10 },
    ];
    
    spyOn(component['servicedb'], 'sumarStock');
    spyOn(component['carritoService'], 'actualizarCarrito');
    spyOn(component, 'presentToast');
  
    component.eliminarProducto(0);
  
    expect(component.carrito.length).toBe(1);
    expect(component['servicedb'].sumarStock).toHaveBeenCalledWith(1, 2);
    expect(component['carritoService'].actualizarCarrito).toHaveBeenCalled();
    expect(component.presentToast).toHaveBeenCalledWith('Producto eliminado', 'Producto 1 ha sido eliminado del carrito.');
  });

  it('debería cambiar correctamente la cantidad de un producto en el carrito', () => {
    component.carrito = [
      { id_producto: '1', nom_producto: 'Producto 1', precio: 100, cantidad: 2, stock: 5 },
    ];
  
    spyOn(component['carritoService'], 'actualizarCarrito');
    spyOn(component, 'presentToast');
  
    // Incrementar la cantidad
    component.cambiarCantidad(0, 1);
    expect(component.carrito[0].cantidad).toBe(3);
  
    // Intentar incrementar más allá del stock disponible
    component.cambiarCantidad(0, 3);
    expect(component.presentToast).toHaveBeenCalledWith('Stock insuficiente', 'Solo hay 5 unidades disponibles.');
  
    // Decrementar la cantidad
    component.cambiarCantidad(0, -1);
    expect(component.carrito[0].cantidad).toBe(2);
  
    // Eliminar el producto cuando la cantidad es 0
    spyOn(component, 'eliminarProducto');
    component.cambiarCantidad(0, -2);
    expect(component.eliminarProducto).toHaveBeenCalledWith(0);
  });
  
  
});
