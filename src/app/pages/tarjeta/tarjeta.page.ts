import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.page.html',
  styleUrls: ['./tarjeta.page.scss'],
})
export class TarjetaPage implements OnInit {

  tarjetas: any[] = [];
  rutUsuario: string = '';
  constructor(private servicesbd: ServicebdService, private userService: UserService, private router: Router) { }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
    } else {
      this.servicesbd.presentAlert('Error', 'No se pudo obtener el RUT del vendedor.');
    }

    this.cargarTarjetas();
  }
    
  

  cargarTarjetas() {
    this.servicesbd.getTarjetasByRUT(this.rutUsuario)
      .then(data => {
        this.tarjetas = data;
      });
  }
  eliminar(numero_tarjeta: any){
    this.servicesbd.presentAlert('Error en eliminacion de datos', 'no se puede eliminar todavia'+numero_tarjeta);
  }
  modificar(numero_tarjeta: any){
    this.servicesbd.presentAlert('Error en modificion de datos', 'no se puede modificar todavia'+numero_tarjeta);
  }
}
