import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraResultType } from '@capacitor/camera';
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


  constructor(private menuCtrl: MenuController, private alertController: AlertController, private router: Router,
    private bdService: ServicebdService,private storage: NativeStorage,private userService: UserService

  ) {}

  async ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(true, 'vendedor');

    // Obtener el usuario y su RUT
    const usuario = await this.userService.obtenerUsuario();

    if (usuario) {
        this.rutVendedor = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
    } else {
        this.alerta('Error', 'No se pudo obtener el RUT del vendedor.');
    }

    this.cargarProductos();
}

async cargarProductos() {
  try {
    this.productos = await this.bdService.verProductos(); 
  } catch (error) {
    this.alerta('Error', 'No se pudieron cargar los productos');
    console.error('Error al cargar productos:', error);
  }
}



tomarfoto = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: false,
    resultType: CameraResultType.Uri
  });
    
  
    if (image.webPath) {
      this.imagen = image.webPath;
    } else {
      this.alerta('Error', 'No se pudo obtener la imagen.');
    }
    
  }

  async formulario() {
    if (
      this.nombreProducto.trim() === '' ||
      this.descripcionProducto.trim() === '' ||
      this.cantidad === null ||
      this.cantidad <= 0 ||
      this.precio === null ||
      this.precio <= 0 ||
      !this.imagen
    ) {
      this.alerta('Error', 'Por favor, asegúrate de completar todos los campos correctamente.');
      return;
    }
  
    const nuevoProducto: Producto = {
      id_producto: 0, // Este se autoincrementará en la base de datos
      nom_producto: this.nombreProducto,
      desc_producto: this.descripcionProducto,
      precio: this.precio!, // Asegúrate de que sea un número
      stock: this.cantidad!, // Asegúrate de que sea un número
      id_tipo: '1', // Este valor debe ser válido
      imagen: this.imagen, // Asegúrate de que sea una cadena de texto
      rut_v: this.rutVendedor! // Asegúrate de que no sea null
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


