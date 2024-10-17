import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-productov',
  templateUrl: './productov.page.html',
  styleUrls: ['./productov.page.scss'],
})
export class ProductovPage implements OnInit {

  producto: Producto | null = null;
  idProducto: number | null = null; // Permitir que sea nulo inicialmente
  tiposProducto: { id_tipo: string; nom_tipo: string }[] = [];
  isEditing: boolean = false; // Estado de edición
  
  constructor(private menuCtrl: MenuController,private bdService: ServicebdService, private userService: UserService,
    private route: ActivatedRoute,private alertController: AlertController,private router: Router
    
  ) { }

  async ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
    this.tiposProducto = await this.bdService.obtenerTiposProducto();

    // Obtener el id del producto desde la URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.idProducto = idParam ? Number(idParam) : null; // Asegúrate de que idProducto no sea null

    // Cargar los detalles del producto
    await this.cargarProducto();
  }

  async cargarProducto() {
    // Verificar que idProducto no sea nulo
    if (this.idProducto === null) {
      this.alerta('Error', 'ID del producto no válido');
      return; // Salir si el ID no es válido
  }
    try {

      const producto = await this.bdService.obtenerProductoPorId(this.idProducto);
      if (producto) {
        this.producto = producto;
      } else {
        this.alerta('Error', 'Producto no encontrado');
      }
    } catch (error) {
      this.alerta('Error', 'No se pudo cargar el producto');
      console.error('Error al cargar el producto:', error);
    }
  }

  async guardarCambios() {
    if (this.producto) {
      try {
        await this.bdService.actualizarProducto(this.producto);
        this.alerta('Éxito', 'Producto actualizado correctamente');
      } catch (error) {
        this.alerta('Error', 'No se pudo actualizar el producto');
      }
    }
  }

  async cambiarImagen() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      // Actualiza la imagen del producto
      if (this.producto) {
        this.producto.imagen = image.webPath; // Asignar la nueva imagen al producto
      }
    } else {
      this.alerta('Error', 'No se pudo obtener la imagen.');
    }
  }

  async eliminarProducto() {
    if (this.producto) {
      try {
        await this.bdService.eliminarProducto(this.producto.id_producto);
        this.alerta('Éxito', 'Producto eliminado correctamente');
        // Redirigir después de eliminar
        this.router.navigate(['./catalogov']);
      } catch (error) {
        this.alerta('Error', 'No se pudo eliminar el producto');
      }
    }
  }

  async toggleEdit() {
    if (this.isEditing) {
      await this.guardarCambios(); // Guarda cambios al salir de la edición
    }
    this.isEditing = !this.isEditing; // Cambia el estado de edición
  }
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}
