import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Platform } from '@ionic/angular'; // Importa Platform
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-publicarv',
  templateUrl: './publicarv.page.html',
  styleUrls: ['./publicarv.page.scss'],
})
export class PublicarvPage implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  nombreProducto: string = '';
  descripcionProducto: string = '';
  cantidad: number | null = null;
  precio: number | null = null;
  productos: Producto[] = [];

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private router: Router,
    private bdService: ServicebdService,private storage: NativeStorage, private platform: Platform

  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      console.log('La plataforma está lista');
    });

    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(true, 'vendedor');
    this.cargarProductos();
    

  }

  async cargarProductos() {
    try {
      this.productos = await this.bdService.verProductos(); 
    } catch (error) {
      this.alerta('Error', 'No se pudieron cargar los productos');
    }
  }

  async formulario() {
    // Validaciones de los campos
    if (
      this.nombreProducto.trim() === '' ||
      this.descripcionProducto.trim() === '' ||
      this.cantidad === null ||
      this.cantidad <= 0 ||
      this.precio === null ||
      this.precio <= 0 ||
      !this.imageSrc
    ) {
      this.alerta('Error', 'Un valor ingresado es inválido');
      return;
    }

    try {
      const rutVendedor = await this.storage.getItem('rutVendedor');
      if (!rutVendedor) {
        this.alerta('Error', 'No se encontró el RUT del vendedor.');
        return;
      } 
      

    // Crea una nueva instancia de Producto
    const nuevoProducto: Producto = {
      id_producto: 0, // Autoincremental en la BD
      nom_producto: this.nombreProducto,
      desc_producto: this.descripcionProducto,
      rut_vendedor: rutVendedor, 
      precio: this.precio,
      stock: this.cantidad,
      id_tipo: '1', 
      imagen: this.imageSrc as string 
    };

    await this.bdService.registrarProducto(nuevoProducto);
    this.alerta('Éxito', 'Producto registrado correctamente');
    this.cargarProductos(); 
    this.router.navigate(['/catalogov']);
  } catch (error) {
    this.alerta('Error', 'Hubo un problema al recuperar el RUT del vendedor');
  }
}
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validar el tipo de archivo (ej: solo permitir imágenes)
      if (!file.type.startsWith('image/')) {
        this.alerta('Error', 'Por favor selecciona una imagen válida.');
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Establece la URL de datos
      };

      reader.readAsDataURL(file); // Esto lee el archivo como una URL de datos
    }
  }


  limpiarFormulario() {
    this.nombreProducto = '';
    this.descripcionProducto = '';
    this.cantidad = null;
    this.precio = null;
    this.imageSrc = null;
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


