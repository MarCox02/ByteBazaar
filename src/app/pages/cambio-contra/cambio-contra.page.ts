import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-cambio-contra',
  templateUrl: './cambio-contra.page.html',
  styleUrls: ['./cambio-contra.page.scss'],
})
export class CambioContraPage implements OnInit {
  nuevaContrasena!: string;
  confirmarContrasena!: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private servicesbd : ServicebdService,
    private userService : ServicebdService,
  ) { }

  async ngOnInit() {
    
   }

  async cambiarContrasena() {
    // Validar si las contraseñas coinciden
    if (this.nuevaContrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
    // Validar la nueva contraseña
    if (!this.validarContrasena(this.nuevaContrasena)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener entre 6 y 20 caracteres, con al menos una mayúscula, una minúscula y un dígito.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
    const correo = localStorage.getItem('correoUsuario'); // Recuperamos el correo del almacenamiento local
  
    // Llamamos al servicio para cambiar la contraseña
    try {
      await this.servicesbd.cambiarContrasenaPorCorreo(correo!, this.nuevaContrasena);
      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Contraseña cambiada exitosamente.',
        buttons: ['OK'],
      });
      await alert.present();
      localStorage.removeItem('correoUsuario'); // Limpiamos el correo del almacenamiento local
      this.router.navigate(['/home']); // Redirigir al login o a donde necesites
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: `${error}` || 'Error al cambiar la contraseña. Intenta de nuevo.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  

  validarContrasena(contrasena: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/;
    return regex.test(contrasena);
  }

  /* alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(titulo: string, mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }
}
