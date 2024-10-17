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
    if (!this.producto) {
      this.presentToast('El producto no está disponible.');
      return;
    }

    const item = {
      id: this.producto.id_producto,
      nombre: this.producto.nom_producto,
      img: this.producto.imagen,
      precio: this.producto.precio,
      tag: this.producto.nom_tipo, // Suponiendo que este campo se relaciona con el tipo
      url: `/producto/${this.producto.id_producto}`, // URL del detalle del producto
    };

    // Agregar el producto al carrito usando el servicio
    this.carritoService.agregarProducto(item);
    this.presentToast(`${item.nombre}ha sido agregado a tu carrito.`);
  }
  async presentToast( mensaje: string) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
