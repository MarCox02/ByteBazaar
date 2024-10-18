import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { Producto } from 'src/app/services/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-productoc',
  templateUrl: './productoc.page.html',
  styleUrls: ['./productoc.page.scss'],
})
export class ProductocPage implements OnInit {

  producto: Producto | undefined; 
  tiposProducto: any[] = []; // Asegúrate de declarar esto
  public cantidad: number = 1; // Valor predeterminado


  constructor(private menuCtrl: MenuController,private alertController: AlertController,  private router: Router, 
     private toastController: ToastController, private carritoService: CarritoService, private userService: UserService,
     private bdService: ServicebdService,  private route: ActivatedRoute // Inyección de ActivatedRoute
    ) {}


       async ngOnInit() {
      this.menuCtrl.enable(true,'comprador');
      this.menuCtrl.enable(false,'vendedor');
      this.tiposProducto = await this.bdService.obtenerTiposProducto();
  
      const idProducto = this.route.snapshot.paramMap.get('id'); // Obtiene el ID directamente de los parámetros
    
    if (idProducto) {
        const productoObtenido = await this.bdService.obtenerProductoPorId(Number(idProducto)); // Convertir a número
        if (productoObtenido) {
            this.producto = productoObtenido; // Asignar solo si no es nulo
        } else {
            this.presentToast('El producto no fue encontrado.');
            this.router.navigate(['/pagina-de-error']);
        }
    } else {
        this.presentToast('ID de producto no válido.');
        this.router.navigate(['/pagina-de-error']);
    }
}


agregarAlCarrito() {
  if (this.producto) {
    const item: Producto = {
      id_producto: this.producto.id_producto,
      nom_producto: this.producto.nom_producto,
      desc_producto: this.producto.desc_producto,
      precio: this.producto.precio,
      stock: this.producto.stock,
      id_tipo: this.producto.id_tipo,
      imagen: this.producto.imagen, // Asegúrate de que esto esté correctamente asignado
      rut_v: this.producto.rut_v,
      nom_tipo: this.producto.nom_tipo,
      usuario_vendedor: this.producto.usuario_vendedor,
      cantidad: this.cantidad // Asigna la cantidad seleccionada
    };

    // Verifica que todos los campos requeridos estén presentes
    if (item.id_producto && item.nom_producto && item.imagen && item.precio !== undefined && item.stock !== undefined && this.cantidad > 0) {
      this.carritoService.agregarProducto(item);
      this.presentToast(`${item.nom_producto} ha sido agregado al carrito.`);
    } else {
      console.error('El producto no tiene todos los campos requeridos o la cantidad es cero.');
    }
  }
}

// Métodos para incrementar y disminuir la cantidad
incrementarCantidad() {
  if (this.cantidad < this.producto?.stock!) {
    this.cantidad++;
  }
}

disminuirCantidad() {
  if (this.cantidad > 1) {
    this.cantidad--;
  } else if (this.cantidad === 1) {
    this.cantidad = 1; // Mantener en 1
  }
}

  async presentToast( mensaje: string) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });

    await alert_t.present();
  }
}
