import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  direcciones: any[] = [];
  rutUsuario: string = '';

  constructor(
    private servicesbd: ServicebdService,
    private alertController: AlertController,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
      // Suscripción al observable que carga las direcciones
      this.servicesbd.cargarDirecciones(this.rutUsuario);
      this.servicesbd.direcciones$.subscribe(direcciones => {
        this.direcciones = direcciones;
      });
    } else {
      console.error('Error: No se pudo obtener el usuario.');
      // Considera mostrar un alert o redirigir a la página de login
    }
  }

  crear() {
    this.router.navigate(['/editdireccion'], { queryParams: { mode: 'create' } });
  }

  modificar(id_direccion: any) {
    this.router.navigate(['/editdireccion'], { queryParams: { mode: 'edit', dir: id_direccion } });
  }

  async confirmarEliminacion(id_direccion: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta dirección?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.servicesbd.eliminarDireccion(id_direccion, this.rutUsuario); // Llama al método de eliminación
          },
        },
      ],
    });

    await alert.present();
  }
}