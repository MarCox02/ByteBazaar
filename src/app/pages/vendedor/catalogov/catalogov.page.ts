import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Producto } from 'src/app/services/producto';

@Component({
  selector: 'app-catalogov',
  templateUrl: './catalogov.page.html',
  styleUrls: ['./catalogov.page.scss'],
})
export class CatalogovPage implements OnInit {

  productos: Producto[] = [];
  rutVendedor: string | null = null;
  usuario: string = '';
  constructor(private bdService: ServicebdService, private userService: UserService,    private alertController: AlertController,
  )
{}
  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutVendedor = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
      this.usuario = usuario.nombre; // Suponiendo que el nombre está en el objeto Usuario
    } else {
      this.alerta('Error', 'No se pudo obtener el RUT del vendedor.');
    }

    await this.cargarProductos();
  }

  async cargarProductos() {
    try {
      const todosLosProductos = await this.bdService.verProductos(); 
      this.productos = todosLosProductos.map(item => ({
        ...item,
        imagen: item.imagen || 'ruta/default.jpg', // Asigna una ruta por defecto si no hay imagen
      }));
    } catch (error) {
      this.alerta('Error', 'No se pudieron cargar los productos');
      console.error('Error al cargar productos:', error);
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