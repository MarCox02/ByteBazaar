import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  private carrito: Producto[] = []; // Inicializa el carrito como un array vacío

  constructor(private nativeStorage: NativeStorage) { 
    this.cargarCarrito();}


   // Método para agregar un producto al carrito
   agregarProducto(producto: Producto) {
    const existente = this.carrito.find(item => item.id_producto === producto.id_producto);
    if (existente) {
      existente.cantidad! += producto.cantidad!; // Aumentar cantidad si ya existe
    } else {
      this.carrito.push(producto); // Agregar nuevo producto
    }
    this.guardarCarrito(); // Guardar cambios en NativeStorage
  }

  private async guardarCarrito() {
    try {
      await this.nativeStorage.setItem('carrito', this.carrito);
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }

  // Método para agregar un producto al carrito
  actualizarCarrito(nuevoCarrito: Producto[]) {
    if (!Array.isArray(nuevoCarrito) || nuevoCarrito.some(item => !item.id_producto)) {
        console.error('El nuevo carrito no es válido.');
        return;
    }
    this.carrito = nuevoCarrito;
}

private async cargarCarrito() {
  try {
    const storedCarrito = await this.nativeStorage.getItem('carrito');
    this.carrito = storedCarrito || []; // Cargar carrito o establecer vacío
  } catch (error) {
    console.error('Error al cargar el carrito:', error);
  }
}
  // Método para obtener los productos en el carrito
  obtenerCarrito(): Producto[] {
    return this.carrito;
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(index: number) {
    if (index > -1) {
      this.carrito.splice(index, 1);
    }
  }

  // Método para limpiar el carrito
  limpiarCarrito() {
    this.carrito = [];
    this.guardarCarrito(); // Limpiar el carrito en NativeStorage
  } 
}
