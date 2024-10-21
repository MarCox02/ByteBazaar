import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
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

  constructor(private router: Router, private servicecarrito: CarritoService, private servicebd: ServicebdService, private userService: UserService) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
      await this.cargarDirecciones();
      await this.cargarTarjetas();
      this.direcciones = await this.servicebd.getDireccionesByRUT(this.rutUsuario);
      this.tarjetas = await this.servicebd.getTarjetasByRUT(this.rutUsuario);
    } else {
      this.servicebd.presentAlert('Error', 'No se pudo obtener el RUT del usuario.');
    }
    
  }

  async cargarDirecciones() {
    // Supongamos que obtienes las direcciones desde el servicio o base de datos
    this.servicebd.getDireccionesByRUT(this.rutUsuario)
      .then((data: any) => {
        this.direcciones = data;
      })
      .catch(error => {
        this.servicebd.presentAlert('Error', 'Error al cargar direcciones: ' + JSON.stringify(error));
      });
  }

  async cargarTarjetas() {
    // Supongamos que obtienes las tarjetas desde el servicio o base de datos
    this.servicebd.getTarjetasByRUT(this.rutUsuario)
      .then((data: any) => {
        this.tarjetas = data;
      })
      .catch(error => {
        this.servicebd.presentAlert('Error', 'Error al cargar tarjetas: ' + JSON.stringify(error));
      });
  }

  async confirmarCompra() {
    if (!this.direccionSeleccionada || !this.tarjetaSeleccionada) {
      this.servicebd.presentAlert('Error', 'Debe seleccionar una dirección y una tarjeta.');
      return;
    }

    const totalCompra = this.calcularTotal(); // Asumimos que tienes una función para esto
    const fecha = this.servicebd.obtenerFecha();
    const costo_envio = this.direccionSeleccionada.costo_envio;
    try {
      const id_venta = await this.servicebd.crearVenta(this.rutUsuario,fecha,costo_envio, totalCompra);
      if (id_venta) {
        // Registra los detalles de la compra en `detalle_boleta`
        await this.servicebd.agregarDetalleVenta(id_venta, this.obtenerCarrito());
        this.servicebd.presentAlert('Éxito', 'Compra realizada con éxito.');
        this.servicecarrito.limpiarCarrito();
        this.router.navigate(['/catalogoc']);
      }
    } catch (error) {
      this.servicebd.presentAlert('Error', 'Error al procesar la compra: ' + JSON.stringify(error));
    }
  }

  calcularTotal(): number {
    // Aquí puedes implementar la lógica para calcular el total de la compra
    return 10000; // Ejemplo estático
  }

  obtenerCarrito(): any[] {
    // Aquí puedes obtener el carrito desde el servicio, por ahora un ejemplo estático
    return [
      { id_producto: 1, cantidad: 2, precio_unitario: 50 },
    ];
  }
}