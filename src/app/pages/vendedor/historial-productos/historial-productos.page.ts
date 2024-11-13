import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-historial-productos',
  templateUrl: './historial-productos.page.html',
  styleUrls: ['./historial-productos.page.scss'],
})
export class HistorialProductosPage implements OnInit {
  historialVentas: any[] = []; // Aquí guardamos las ventas del vendedor
  rutVendedor: string = '';  // Guardamos el RUT del vendedor
  cargando: boolean = true;  // Bandera para mostrar el spinner
  limite: number = 7;        // Cantidad de productos a cargar por vez
  offset: number = 0;        // Controla desde dónde cargar en la base de datos

  constructor(
    private servicebd: ServicebdService,
    private userService: UserService,
    private menuCtrl: MenuController
  ) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutVendedor = usuario.rut; // Obtenemos el RUT del vendedor desde el servicio
      await this.cargarHistorialVentas(true); // Cargamos el historial de ventas al iniciar
    }
  }

  // Método para cargar el historial de ventas
  async cargarHistorialVentas(inicial: boolean = false) {
    this.cargando = true;

    try {
      // Llamada al servicio para obtener un rango de ventas
      const ventas = await this.servicebd.obtenerHistorialVentasPaginado(this.rutVendedor, this.limite, this.offset);

      if (inicial) {
        this.historialVentas = ventas; // Si es la carga inicial, reemplazamos el historial
      } else {
        this.historialVentas = [...this.historialVentas, ...ventas]; // Si no, añadimos más ventas
      }

      // Actualizamos el offset solo si hemos recibido productos
      if (ventas.length > 0) {
        this.offset += this.limite;
      }

      // Si hemos cargado menos productos que el límite, significa que no hay más ventas
      if (ventas.length < this.limite) {
        this.cargando = false;
      }
    } catch (error) {
      console.error('Error al cargar el historial de ventas:', error);
    }
    this.cargando = false;
  }

  // Método para cargar más ventas al hacer clic en "Cargar más"
  cargarMas() {
    this.cargarHistorialVentas();
  }
}
