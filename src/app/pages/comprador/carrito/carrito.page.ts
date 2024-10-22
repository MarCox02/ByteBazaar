import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private enProcesoDeCompra: boolean = false; // Bandera para indicar si se está en proceso de compra


  constructor(private router: Router,private servicedb: ServicebdService, private menuCtrl: MenuController,private carritoService: CarritoService,private toastController: ToastController) { }
  msjerror: string =''

  ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')

    this.carrito = this.carritoService.obtenerCarrito();
  }
  getTotalPrice(): number {
    return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }

  eliminarProducto(index: number) {
    const productoEliminado = this.carrito[index].nom_producto;
    this.servicedb.sumarStock(this.carrito[index].id_producto, this.carrito[index].cantidad);
    this.carrito.splice(index, 1);
    this.carritoService.actualizarCarrito(this.carrito);
    this.presentToast('Producto eliminado', `${productoEliminado} ha sido eliminado del carrito.`);
  }

  cambiarCantidad(index: number, incremento: number) {
    const nuevoCantidad = this.carrito[index].cantidad + incremento;
    const stockDisponible = this.carrito[index].stock;

    if (nuevoCantidad < 0) {
      this.presentToast('Cantidad no válida', 'La cantidad no puede ser menor a 0.');
      return;
    }

    if (nuevoCantidad > stockDisponible) {
      this.presentToast('Stock insuficiente', `Solo hay ${stockDisponible} unidades disponibles.`);
      return;
    }

    if (nuevoCantidad === 0) {
      this.eliminarProducto(index);
    } else {
      this.carrito[index].cantidad = nuevoCantidad;
      this.carritoService.actualizarCarrito(this.carrito);
    }
  }


  iraseleccion() {
    if(this.carrito.length > 0){
      this.msjerror = ''
      this.enProcesoDeCompra = true; 
      this.router.navigate(['/seleccion']);
    }else{
      this.msjerror = 'no hay nada que pagar';
    }
      
  }

  limpiarCarrito() {
    this.carrito.forEach(item => {
      this.servicedb.sumarStock(item.id_producto, item.cantidad); // Restaurar stock
    });
    this.carrito = [];
    this.carritoService.actualizarCarrito(this.carrito);
    this.presentToast('Carrito limpiado', 'Todos los productos han sido eliminados del carrito.');
  }

  finalizarCompra() {
    // Aquí puedes manejar la lógica de la compra
    // Al finalizar la compra, puedes marcar que se completó
    this.enProcesoDeCompra = false; // Resetear la bandera
    this.presentToast('Compra realizada', 'Gracias por tu compra!');
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
