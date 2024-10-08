import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Producto } from 'src/app/services/producto';
import { ServicebdService } from 'src/app/services/servicebd.service';

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
    private bdService: ServicebdService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(true, 'vendedor');
    this.cargarProductos();
  }

  async cargarProductos() {
    try {
        this.productos = await this.bdService.verProductos(); // Carga los productos desde la BD
    } catch (error) {
        this.alerta('Error', 'No se pudieron cargar los productos');
    }
}
  async formulario() {
     // Validaciones de los campos
     if (this.nombreProducto.trim() === '' || this.descripcionProducto.trim() === '' || 
     this.cantidad === null || this.cantidad < 0 || this.precio === null || this.precio < 0 || !this.imageSrc) {
    this.alerta('Error', 'Un Valor ingresado es inválido');
    return;
 }

 // Crea una nueva instancia de Producto
 // Crea una nueva instancia de Producto
 const nuevoProducto: Producto = {
  id_producto: 0, // Esto será autoincremental
  nom_producto: this.nombreProducto,
  desc_producto: this.descripcionProducto,
  rut_vendedor: '12345678-9', // Asegúrate de tener el RUT del vendedor
  precio: this.precio,
  stock: this.cantidad,
  id_tipo: '1', // Asegúrate de que este ID sea válido
  imagen: this.imageSrc as string // Asegúrate de que imageSrc se trate como string
};

// Llama al servicio para registrar el producto
try {
  await this.bdService.registrarProducto(nuevoProducto);
  this.alerta('Éxito', 'Producto registrado correctamente');
  this.cargarProductos(); // Actualiza la lista de productos
  this.router.navigate(['/catalogov']);
} catch (error) {
  this.alerta('Error', 'Hubo un error al registrar el producto');
  console.error(error); // Esto te ayudará a depurar
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
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }


}


