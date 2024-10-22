
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

  constructor(private router: Router, private servicecarrito: CarritoService, private servicebd: ServicebdService, 
    private userService: UserService) {}

    async ngOnInit() {
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
        return;
      }
  
      const totalCompra = this.calcularTotal();
      const fecha = this.servicebd.obtenerFecha();
      const costo_envio = this.direccionSeleccionada.costo_envio;
  
      try {
        const id_venta = await this.servicebd.crearVenta(this.rutUsuario, fecha, costo_envio, totalCompra);
        if (id_venta) {
          await this.servicebd.agregarDetalleVenta(id_venta, this.obtenerCarrito());
          this.servicebd.presentAlert('Éxito', 'Compra realizada con éxito.');
          this.servicecarrito.limpiarCarrito();
          this.router.navigate(['/catalogoc']);
        }
      } catch (error) {
        
      }
    }

    calcularTotal(): number {
      const carrito = this.obtenerCarrito(); // Obteniendo el carrito actual
      return carrito.reduce((total, item) => total + (item.cantidad * item.precio_unitario), 0);
    }
  
    obtenerCarrito(): any[] {
      return this.servicecarrito.obtenerCarrito(); // Asegúrate de que este método esté implementado en tu servicio
    }
  }