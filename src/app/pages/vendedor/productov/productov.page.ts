import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/Modelo/producto';
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


   // Errores
   mensajeErrorNombre: string | null = null;
   mensajeErrorDescripcion: string | null = null;
   mensajeErrorStock: string | null = null;
   mensajeErrorTipo: string | null = null;
   mensajeErrorPrecio: string | null = null;
   mensajeErrorImagen: string | null = null;

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

  async guardarCambios(): Promise<boolean> {  // Cambia el retorno a Promise<boolean>
    if (!this.validarProducto()) {
        // Si hay errores de validación, mostramos los mensajes correspondientes
        this.alerta('Error', 'Corrige los errores antes de guardar.');
        return false; // Indica que no se guardaron cambios
    }

    if (this.producto) {
        try {
            await this.bdService.actualizarProducto(this.producto);
            this.alerta('Éxito', 'Producto actualizado correctamente');
            return true; // Indica que se guardaron cambios exitosamente
        } catch (error) {
            this.alerta('Error', 'No se pudo actualizar el producto');
        }
    }
    return false; // Indica que no se guardaron cambios
}

  validarProducto(): boolean {
    if (!this.producto) return false;

    // Reiniciar mensajes de error
    this.mensajeErrorNombre = null;
    this.mensajeErrorDescripcion = null;
    this.mensajeErrorStock = null;
    this.mensajeErrorTipo = null;
    this.mensajeErrorPrecio = null;
    this.mensajeErrorImagen = null;

    // Validación del nombre del producto
    if (!this.producto.nom_producto || this.producto.nom_producto.trim().length < 3) {
      this.mensajeErrorNombre = 'El nombre del producto debe tener al menos 3 caracteres';
    }
    if (this.producto.nom_producto.trim().length > 50) {
      this.mensajeErrorNombre = 'El nombre del producto no puede superar los 50 caracteres';
    }

    // Validación de la descripción
    if (!this.producto.desc_producto || this.producto.desc_producto.trim().length < 10) {
      this.mensajeErrorDescripcion = 'La descripción debe tener al menos 10 caracteres';
    }
    if (this.producto.desc_producto.trim().length > 500) {
      this.mensajeErrorDescripcion = 'La descripción no puede superar los 500 caracteres';
    }

    // Validación del stock
    if (this.producto.stock < 0) {
      this.mensajeErrorStock = 'El stock no puede ser negativo';
    }

    // Validación del tipo de producto
    if (!this.producto.id_tipo) {
      this.mensajeErrorTipo = 'Debes seleccionar un tipo de producto';
    }

    // Validación del precio
    if (!this.producto.precio || this.producto.precio <= 0) {
      this.mensajeErrorPrecio = 'El precio no puede ser cero o negativo';
    }
    if (this.producto.precio > 999999) {
      this.mensajeErrorPrecio = 'El precio no puede ser mayor a 999,999';
    }

    // Validación de la imagen
    if (!this.producto.imagen) {
      this.mensajeErrorImagen = 'Debes agregar una imagen del producto';
    }

    // Retornar si hay errores
    return !(
      this.mensajeErrorNombre ||
      this.mensajeErrorDescripcion ||
      this.mensajeErrorStock ||
      this.mensajeErrorTipo ||
      this.mensajeErrorPrecio ||
      this.mensajeErrorImagen
    );

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
        const cambiosGuardados = await this.guardarCambios(); // Guarda cambios al salir de la edición
        if (!cambiosGuardados) {
            return; // Si no se guardaron los cambios, no cambia el estado
        }
    }
    this.isEditing = !this.isEditing; // Cambia el estado de edición solo si se guardaron cambios
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
