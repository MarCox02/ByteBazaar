import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage implements OnInit {
  ventas: any[] = [];
  id_venta!: number;
  rutUsuario: string = '';
  constructor(private servicesbd: ServicebdService, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
    } else {
      console.error('Error: ', '');
    }
    this.cargarVentas();
  }

  async cargarVentas() {
    try {
      this.ventas = await this.servicesbd.obtenerVentas(this.rutUsuario);
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  verDetalleVenta(id_venta: number) {
    this.router.navigate(['/detalle-venta'], { queryParams: { id_venta } });
  }
}