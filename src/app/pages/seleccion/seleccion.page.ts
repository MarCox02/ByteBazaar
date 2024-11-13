import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.page.html',
  styleUrls: ['./seleccion.page.scss'],
})
export class SeleccionPage implements OnInit {
  tarjetas: any[] = [];
  direcciones: any[] = [];
  rutUsuario: string = '';

  tarjetaSeleccionada: any;
  direccionSeleccionada: any;

  constructor(
    private router: Router,
    private servicecarrito: CarritoService,
    private servicebd: ServicebdService, 
    private userService: UserService,
    private notificacionService: NotificacionService 
  ) {}

  async ngOnInit() {
    const permisosConcedidos = await this.notificacionService.requestPermissions();
    if (!permisosConcedidos) {
      console.warn('Permisos de notificación no concedidos al inicio.');
    }

    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
      await this.cargarDirecciones();
      await this.cargarTarjetas();
    }
  }

  async cargarDirecciones() {
    try {
      this.direcciones = await this.servicebd.getDireccionesByRUT(this.rutUsuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async cargarTarjetas() {
    try {
      this.tarjetas = await this.servicebd.getTarjetasByRUT(this.rutUsuario);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async confirmarCompra() {
    if (!this.direccionSeleccionada || !this.tarjetaSeleccionada) {
      this.servicebd.presentAlert('Error', 'Debes seleccionar una dirección y una tarjeta.');
      return;
    }

    const totalCompra = this.calcularTotal();
    const fecha = this.servicebd.obtenerFecha();
    const costoEnvio = this.direccionSeleccionada.costo_envio;

    try {
      // Paso 1: Insertar la venta en la tabla "venta"
      const idVenta = await this.servicebd.crearVenta(this.rutUsuario, fecha, costoEnvio, totalCompra);
      
      if (idVenta) {
        // Paso 2: Insertar cada producto del carrito en "detalle_venta"
        const carrito = this.obtenerCarrito();
        await this.servicebd.agregarDetalleVenta(idVenta, carrito);

        // Limpiar el carrito después de la compra
        this.servicecarrito.limpiarCarrito();
        this.servicebd.presentAlert('Éxito', 'Compra realizada con éxito.');
        
        // Navegar de regreso al catálogo
        this.router.navigate(['/catalogoc']);
        
        // Programar notificación de compra exitosa
        const permisosConcedidos = await this.notificacionService.requestPermissions();
        if (permisosConcedidos) {
          await this.notificacionService.programarNotificacion();
        } else {
          console.warn('Permisos de notificación no concedidos.');
        }
      }
    } catch (error) {
      console.error('Error al confirmar la compra:', error);
      this.servicebd.presentAlert('Error', 'Hubo un problema al realizar la compra.');
    }
  }

  calcularTotal(): number {
    const carrito = this.obtenerCarrito();
    return carrito.reduce((total, item) => total + (item.cantidad * item.precio), 0);
  }

  obtenerCarrito(): any[] {
    return this.servicecarrito.obtenerCarrito();
  }
}
