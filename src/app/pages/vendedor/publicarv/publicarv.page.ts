import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/Modelo/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-publicarv',
  templateUrl: './publicarv.page.html',
  styleUrls: ['./publicarv.page.scss'],
})
export class PublicarvPage implements OnInit {
  
  imagen: any;// Cambia a Blob
  imageBlob: Blob | null = null;
  nombreProducto: string = '';
  descripcionProducto: string = '';
  cantidad: number | null = null;
  precio: number | null = null;
  productos: Producto[] = [];
  rutVendedor: string | null = null; // Campo para almacenar el RUT del vendedor
  tiposProducto: { id_tipo: string; nom_tipo: string }[] = []; // Almacena los tipos de producto
  tipoSeleccionado: string | null = null; // Tipo de producto seleccionado


  // Errores
  mensajeErrorNombre: string | null = null;
  mensajeErrorDescripcion: string | null = null;
  mensajeErrorStock: string | null = null;
  mensajeErrorTipo: string | null = null;
  mensajeErrorPrecio: string | null = null;
  mensajeErrorImagen: string | null = null;

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private router: Router,
    private bdService: ServicebdService,private storage: NativeStorage,private userService: UserService,private actionSheetController: ActionSheetController, 


  ) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
    if (usuario) {
        this.rutVendedor = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
    } else {
        this.alerta('Error', 'No se pudo obtener el RUT del vendedor.');
    }
    await this.cargarTiposProducto(); // Cargar tipos de productos
    this.cargarProductos();
}

public getBdService(): ServicebdService {
  return this.bdService;
}

async cargarProductos() {
  try {
    this.productos = await this.bdService.verProductos(); 
  } catch (error) {
    this.alerta('Error', 'No se pudieron cargar los productos');
    console.error('Error al cargar productos:', error);
  }
}

async cargarTiposProducto() {
  try {
    // Aquí deberías implementar tu método para obtener los tipos de productos de la base de datos
    this.tiposProducto = await this.bdService.obtenerTiposProducto();
  } catch (error) {
    this.alerta('Error', 'No se pudieron cargar los tipos de producto');
    console.error('Error al cargar tipos de producto:', error);
  }
}

async presentActionSheet() {
  const actionSheet = await this.actionSheetController.create({
    header: 'Seleccionar una opción',
    buttons: [
      {
        text: 'Tomar Foto',
        handler: () => {
          this.tomarFoto(); // Llama a la función tomarFoto()
        }
      },
      {
        text: 'Seleccionar de la Galería',
        handler: () => {
          this.seleccionarDeGaleria(); // Llama a la función seleccionarDeGaleria()
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ]
  });
  await actionSheet.present();
}

async tomarFoto() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl, // Obtener como base64
    source: CameraSource.Camera // Tomar desde la cámara
  });

  if (image.dataUrl) {
    this.imagen = image.dataUrl; // Guardar la imagen
  } else {
    this.alerta('Error', 'No se pudo obtener la imagen.');
  }
}

async seleccionarDeGaleria() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.DataUrl, // Obtener como base64
    source: CameraSource.Photos // Seleccionar de la galería
  });

  if (image.dataUrl) {
    this.imagen = image.dataUrl; // Guardar la imagen
  } else {
    this.alerta('Error', 'No se pudo obtener la imagen.');
  
  }
}

  async formulario() {
    
  // Reiniciar mensajes de error
  this.mensajeErrorNombre = null;
  this.mensajeErrorDescripcion = null;
  this.mensajeErrorStock = null;
  this.mensajeErrorTipo = null;
  this.mensajeErrorPrecio = null;
  this.mensajeErrorImagen = null;

  // Validación del nombre del producto
  if (!this.nombreProducto || this.nombreProducto.trim().length < 3) {
    this.mensajeErrorNombre = 'El nombre del producto debe tener al menos 3 caracteres';
  }
  if (this.nombreProducto.trim().length > 50) {
    this.mensajeErrorNombre = 'El nombre del producto no puede superar los 50 caracteres';
  }

  // Validación de la descripción
  if (!this.descripcionProducto || this.descripcionProducto.trim().length < 10) {
    this.mensajeErrorDescripcion = 'La descripción debe tener al menos 10 caracteres';
  }
  if (this.descripcionProducto.trim().length > 500) {
    this.mensajeErrorDescripcion = 'La descripción no puede superar los 500 caracteres';
  }

  // Validación del stock
  if (this.cantidad === null || this.cantidad < 1) {
    this.mensajeErrorStock = 'El stock no puede ser menor a 1';
  }

  // Validación del tipo de producto
  if (!this.tipoSeleccionado) {
    this.mensajeErrorTipo = 'Debes seleccionar un tipo de producto';
  }

  // Validación del precio
  if (this.precio === null || this.precio <= 999) {
    this.mensajeErrorPrecio = 'El precio no puede ser menor a 1000 o negativo';
  }

  if (this.precio !== null && this.precio > 9999999) {
    this.mensajeErrorPrecio = 'El precio no puede ser mayor a 9,999,999';
  }

  // Validación de la imagen
  if (!this.imagen) {
    this.mensajeErrorImagen = 'Debes agregar una imagen del producto';
  }

  // Si hay errores de validación, mostramos los mensajes correspondientes
  if (
    this.mensajeErrorNombre ||
    this.mensajeErrorDescripcion ||
    this.mensajeErrorStock ||
    this.mensajeErrorTipo ||
    this.mensajeErrorPrecio ||
    this.mensajeErrorImagen
  ) {
    this.alerta('Error', 'Corrige los errores antes de guardar.');
    return; // Salir si hay errores
  }

  // Obtener el nombre del tipo basado en el tipo seleccionado
  const tipoSeleccionado = this.tiposProducto.find(tipo => tipo.id_tipo === this.tipoSeleccionado);
  const nombreTipo = tipoSeleccionado ? tipoSeleccionado.nom_tipo : 'Tipo desconocido';

  const nuevoProducto: Producto = {
    id_producto: 0, // Este se autoincrementará en la base de datos
    nom_producto: this.nombreProducto,
    desc_producto: this.descripcionProducto,
    precio: this.precio!, // Asegúrate de que sea un número
    stock: this.cantidad!, // Asegúrate de que sea un número
    id_tipo: this.tipoSeleccionado!, // Usar el tipo seleccionado
    imagen: this.imagen, // Asegúrate de que sea una cadena de texto
    rut_v: this.rutVendedor!, // Asegúrate de que no sea null
    nom_tipo: nombreTipo // Agregar el nombre del tipo
  };

  try {
    await this.bdService.registrarProducto(nuevoProducto);
    this.alerta('Éxito', 'Producto registrado correctamente');
    this.limpiarFormulario();
    this.cargarProductos(); 
    this.router.navigate(['/catalogov']);
  } catch (error) {
    const errorMessage = typeof error === 'object' ? JSON.stringify(error) : error;
    this.alerta('Error', `No se pudo registrar el producto: ${errorMessage}`);
    console.error('Error al registrar producto:', error);
  }
}
  

  limpiarFormulario() {
    this.nombreProducto = '';
    this.descripcionProducto = '';
    this.cantidad = null;
    this.precio = null;
    this.imagen = null;
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


