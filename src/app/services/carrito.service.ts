import { Injectable } from '@angular/core';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  private carrito: Producto[] = []; // Inicializa el carrito como un array vacío

  constructor() { }


  agregarProducto(item: any) {
    this.carrito.push(item);
  }

  // Método para agregar un producto al carrito
  actualizarCarrito(nuevoCarrito: any[]) {
    this.carrito = nuevoCarrito; // Actualiza el carrito en el servicio
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
  }
}
