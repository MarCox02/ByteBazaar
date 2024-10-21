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

  producto: Producto | undefined = undefined; // Inicializa como undefined
  tiposProducto: any[] = []; // Asegúrate de declarar esto
  public cantidad: number = 0; // Valor predeterminado

  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private router: Router, 
    private toastController: ToastController, 
    private carritoService: CarritoService, 
    private userService: UserService,
    private bdService: ServicebdService,  
    private route: ActivatedRoute // Inyección de ActivatedRoute
  ) {}

  async ngOnInit() {
    this.menuCtrl.enable(true, 'comprador');
    this.menuCtrl.enable(false, 'vendedor');
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
      const totalCantidadEnCarrito = this.carritoService.obtenerCarrito()
      .filter(p => p.id_producto === this.producto?.id_producto) // Uso de optional chaining
      .reduce((total, item) => total + (item.cantidad ?? 0), 0);

      const nuevaCantidadTotal = totalCantidadEnCarrito + this.cantidad;
  
      const stockProducto = this.producto.stock ?? 0;
  
      if (nuevaCantidadTotal > stockProducto) {
        this.presentToast(`Stock insuficiente. Solo hay ${stockProducto} unidades disponibles.`);
        return; // Evitar agregar al carrito si excede el stock
      }
  
      const item: Producto = {
        id_producto: this.producto.id_producto,
        nom_producto: this.producto.nom_producto,
        desc_producto: this.producto.desc_producto,
        precio: this.producto.precio,
        stock: stockProducto,
        id_tipo: this.producto.id_tipo,
        imagen: this.producto.imagen,
        rut_v: this.producto.rut_v,
        nom_tipo: this.producto.nom_tipo,
        usuario_vendedor: this.producto.usuario_vendedor,
        cantidad: this.cantidad
      };
  
      this.carritoService.agregarProducto(item);
      this.bdService.restarStock(item.id_producto, this.cantidad);
      this.presentToast(`${item.nom_producto} ha sido agregado al carrito.`);
    } else {
      this.presentToast('El producto no está disponible.');
    }
  }
  

  // Métodos para incrementar y disminuir la cantidad
  incrementarCantidad() {
    const stockProducto = this.producto?.stock ?? 0; // Usar el valor predeterminado para stock
    if (this.cantidad < stockProducto) {
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

  async presentToast(mensaje: string) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
    });

    await alert_t.present();
  }
}
