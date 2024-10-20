import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public carrito: any[] = [];

  

  constructor(private servicedb: ServicebdService, private menuCtrl: MenuController,private carritoService: CarritoService,private toastController: ToastController) { }


  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')

    this.carrito = this.carritoService.obtenerCarrito();
  }
  getTotalPrice(): number {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  eliminarProducto(index: number) {
    const productoEliminado = this.carrito[index].nom_producto; // Usar nom_producto en lugar de nombre
    this.carrito.splice(index, 1); // Eliminar el producto del carrito
    this.carritoService.actualizarCarrito(this.carrito); // Actualiza el carrito en el servicio
    this.servicedb.sumarStock(this.carrito[index].id_producto,this.carrito[index].cantidad);
    this.presentToast('Producto eliminado', `${productoEliminado} ha sido eliminado del carrito.`);
  }

  cambiarCantidad(index: number, incremento: number) {
    const nuevoCantidad = this.carrito[index].cantidad + incremento; // Ajustar la cantidad
    const stockDisponible = this.carrito[index].stock; // Obtener el stock disponible del producto

    if (nuevoCantidad < 0) {
      this.presentToast('Cantidad no válida', 'La cantidad no puede ser menor a 0.');
      return; // No permitir que la cantidad sea menor a 0
    }

    if (nuevoCantidad > stockDisponible) {
      this.presentToast('Stock insuficiente', `Solo hay ${stockDisponible} unidades disponibles.`);
      return; // No permitir que la cantidad supere el stock
    }

    if (nuevoCantidad === 0) {
      this.eliminarProducto(index); // Eliminar el producto si la cantidad llega a 0
    } else {
      this.carrito[index].cantidad = nuevoCantidad; // Actualizar la cantidad en el carrito
      this.carritoService.actualizarCarrito(this.carrito); // Actualiza el carrito en el servicio
    }
  }

  limpiarCarrito() {
    this.carrito = [];
    this.carritoService.actualizarCarrito(this.carrito); // Actualizar el carrito en el servicio
    this.presentToast('Carrito limpiado', 'Todos los productos han sido eliminados del carrito.');
  }

  async presentToast(titulo: string, mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
