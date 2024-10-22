import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  
  constructor(private servicesbd: ServicebdService,private alertController: AlertController, private userService: UserService, private router: Router) { }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut; 

      this.servicesbd.cargarTarjetas(this.rutUsuario);

      this.servicesbd.tarjetas$.subscribe(tarjetas => {
        this.tarjetas = tarjetas;
      });
    }
  }
    
  

  cargarTarjetas() {
    this.servicesbd.getTarjetasByRUT(this.rutUsuario)
      .then(data => {
        this.tarjetas = data;
      });
  }
  crear() {
    this.router.navigate(['/edittarjeta'], { queryParams: { mode: 'create' } });
  }

  modificar(numero_tarjeta: any) {
    this.router.navigate(['/edittarjeta'], { queryParams: { mode: 'edit', tar: numero_tarjeta } });
  }
  async confirmarEliminacion(numero_tarjeta: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta tarjeta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.servicesbd.eliminarTarjeta(numero_tarjeta, this.rutUsuario); // Llama al método de eliminación
          },
        },
      ],
    });
  
    await alert.present();
  }




}

