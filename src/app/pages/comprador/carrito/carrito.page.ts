import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  public carrito: any[] = [];

  

  constructor(private menuCtrl: MenuController,private carritoService: CarritoService,private toastController: ToastController) { }


  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')

    this.carrito = this.carritoService.obtenerCarrito();
  }
  getTotalPrice(): number {
    return this.carrito.reduce((total, item) => total + item.precio, 0);
  }

  eliminarProducto(index: number) {
    const productoEliminado = this.carrito[index].nombre; // Guardar el nombre del producto para mostrar en el toast
    this.carrito.splice(index, 1); // Eliminar el producto del carrito
    this.carritoService.actualizarCarrito(this.carrito); // Asegúrate de que tu servicio tenga un método para actualizar el carrito
    this.presentToast('Producto eliminado', `${productoEliminado} ha sido eliminado del carrito.`);
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
