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

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private router: Router,
    private bdService: ServicebdService,private storage: NativeStorage,private userService: UserService

  ) {}

  ngOnInit() {
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

  async tomarfoto(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    if (image.webPath) {
      this.imagen = image.webPath;
  
      const response = await fetch(image.webPath);
      this.imageBlob = await response.blob();
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
      !this.imageBlob // Cambiar a imageBlob
    ) {
      this.alerta('Error', 'Un valor ingresado es inválido');
      return;
    }
    
    // Crea una nueva instancia de Producto
    const nuevoProducto: Producto = {
      id_producto: 0, // Autoincremental en la BD
      nom_producto: this.nombreProducto,
      desc_producto: this.descripcionProducto, 
      precio: this.precio,
      stock: this.cantidad,
      id_tipo: '1', 
      imagen: this.imageBlob, // Aquí mantienes el Blob para guardar en la BD
    };

    await this.bdService.registrarProducto(nuevoProducto);
    this.alerta('Éxito', 'Producto registrado correctamente');
    this.limpiarFormulario(); // Limpiar formulario después de registrar el producto
    this.cargarProductos(); 
    this.router.navigate(['/catalogov']);
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


