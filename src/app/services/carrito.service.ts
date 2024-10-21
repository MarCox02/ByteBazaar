import { Injectable } from '@angular/core';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  
  private carrito: Producto[] = []; // Inicializa el carrito como un array vacío

  constructor() { }


   // Método para agregar un producto al carrito
   agregarProducto(item: Producto) {
    if (!item.id_producto || !item.nom_producto || item.precio === undefined || item.stock === undefined) {
        console.error('El producto debe tener un ID, nombre, precio y stock válidos.');
        return;
    }
    
    const index = this.carrito.findIndex(p => p.id_producto === item.id_producto);
    
    if (index !== -1) {
        // Aumentar la cantidad si el producto ya está en el carrito
        this.carrito[index].cantidad = (this.carrito[index].cantidad ?? 0) + (item.cantidad ?? 0);
      } else {
        // Si no está, añadir el producto al carrito con la cantidad especificada
        this.carrito.push({ ...item, cantidad: item.cantidad });
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
