import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';


@Component({
  selector: 'app-cambio-contra-perfil',
  templateUrl: './cambio-contra-perfil.page.html',
  styleUrls: ['./cambio-contra-perfil.page.scss'],
})
export class CambioContraPerfilPage implements OnInit {
  contrasenaActual: string = ''; // Contraseña actual introducida por el usuario
  ContrasenaNueva: string = ''; // Nueva contraseña
  confirmarContrasena: string = ''; // Confirmación de la nueva contraseña
  usuario: Usuario | null = null; // Inicializa como null

  constructor(
    private userService: UserService,
    private router: Router,
    private servicebd: ServicebdService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUsuario(); // Cargar el usuario al inicializar el componente
  }

  async cargarUsuario() {
    try {
      this.usuario = await this.userService.obtenerUsuario(); // Cargar el usuario
      if (this.usuario) {
        console.log('Usuario cargado:', this.usuario);
      } else {
        console.error('Error: ', ''); // Manejo de error si no se carga el usuario
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
      console.error('Error: ', '');
    }
  }
  
  async cambiarContrasena() {
    if (this.ContrasenaNueva === this.confirmarContrasena) {
        try {
            // Verifica si usuario no es null
            if (this.usuario) {
                console.log('Cambiando la contraseña para el usuario:', this.usuario.rut);
                
                // Cambia la contraseña en la base de datos
                await this.servicebd.cambiarContrasena(this.usuario.rut, this.ContrasenaNueva);
                
                // Muestra un mensaje de éxito
                this.presentAlert('Éxito', 'Contraseña cambiada con éxito.');
                
                // Redirige a la página anterior
                this.volver();
            } else {
              console.error('Error: ', '');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            console.error('Error: ', '');// Manejo de error
        }
    } else {
      console.error('Error: ', '');// Si no coinciden
    }
}


  volver() {
    this.router.navigate(['/']); // Redirige al menú principal
  }

  async presentAlert(header: string, message: string) {
    // Implementa tu lógica de alerta aquí, por ejemplo usando AlertController de Ionic
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
