import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from 'src/app/services/producto';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Component({
  selector: 'app-catalogov',
  templateUrl: './catalogov.page.html',
  styleUrls: ['./catalogov.page.scss'],
})
export class CatalogovPage implements OnInit {

  productos: Producto[] = [];
  tiposProducto: { id_tipo: string; nom_tipo: string }[] = [];
  rutVendedor: string | null = null;
  usuario: string = '';
  searchText: string = ''; // Declaración de la variable para el texto de búsqueda

  constructor(private bdService: ServicebdService, private userService: UserService,    private alertController: AlertController,
    private storage: NativeStorage, private menuCtrl: MenuController
  )
{}
  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
    if (usuario) {
      this.rutVendedor = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
      this.usuario = usuario.nombre; // Suponiendo que el nombre está en el objeto Usuario
    } else {
      this.alerta('Error', 'No se pudo obtener el RUT del vendedor.');
    }
  }
  
  ionViewWillEnter() {
    this.cargarProductos(); // Se ejecuta cada vez que la página está a punto de mostrarse
  }


  async cargarProductos() {
    try {
       // Obtén el rut del vendedor desde NativeStorage o de donde lo estés almacenando
    // Obtén el objeto completo del usuario desde NativeStorage
    const usuario = await this.storage.getItem('usuario'); // Asegúrate de que 'usuario' es la clave correcta

    // Verifica si se obtuvo el objeto usuario
    if (!usuario || !usuario.rut) {
      throw new Error('No se encontró el RUT del vendedor');
    }

    // Extrae el RUT del objeto usuario
    const rutVendedor = usuario.rut;

      const todosLosProductos = await this.bdService.verProductosPorVendedor(rutVendedor); 
      this.productos = todosLosProductos.map(item => ({
        ...item,
        imagen: item.imagen || 'ruta/default.jpg', // Asigna una ruta por defecto si no hay imagen
      }));
    } catch (error) {
      this.alerta('Error', 'No se pudieron cargar los productos');
      console.error('Error al cargar productos:', error);
    }
  }

  obtenerNombreTipo(id_tipo: string): string {
    const tipo = this.tiposProducto.find(t => t.id_tipo === id_tipo);
    return tipo ? tipo.nom_tipo : 'Tipo desconocido'; // Maneja caso si el tipo no se encuentra
  }


  async filterProducts() {
    if (this.searchText) {
      const filteredProducts = this.productos.filter(producto =>
        producto.nom_producto.toLowerCase().includes(this.searchText.toLowerCase())
      );

      // Actualizar la lista de productos mostrados con los productos filtrados
      if (filteredProducts.length > 0) {
        this.productos = filteredProducts;
      } else {
        this.alerta('Error', 'No se encontraron productos que coincidan con la búsqueda.');
      }
    } else {
      await this.cargarProductos(); // Recargar todos los productos
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