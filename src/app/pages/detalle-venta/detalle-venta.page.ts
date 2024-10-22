import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.page.html',
  styleUrls: ['./detalle-venta.page.scss'],
})
export class DetalleVentaPage implements OnInit {
  detallesVenta: any[] = [];
  id_venta!: number;
  rutUsuario: string = '';
  

  constructor(private route: ActivatedRoute, private servicesbd: ServicebdService, private userService: UserService) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
    } else {
      console.error('Error: ', '');
    }
    this.route.queryParams.subscribe(params => {
      this.id_venta = params['id_venta'];
      this.cargarDetallesBoleta();
    });
  }

  async cargarDetallesBoleta() {
    try {
      this.detallesVenta = await this.servicesbd.obtenerDetalleBoleta(this.id_venta);
    } catch (error) {
      console.error('Error: ', error);
    }
  }
}