import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OlvideContraService } from 'src/app/services/olvidecontra.service';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Asegúrate de importar tu servicio para consultas a la BD

@Component({
  selector: 'app-olvide-contra',
  templateUrl: './olvide-contra.page.html',
  styleUrls: ['./olvide-contra.page.scss'],
})
export class OlvideContraPage implements OnInit {
  codigo: string = ''; // Código ingresado por el usuario
  correo: string = ''; // Correo ingresado por el usuario
  codigoGenerado: string | undefined; // Código de verificación generado
  codigoEnviado: boolean = false; // Bandera para saber si el código ha sido enviado


  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private servicebd: ServicebdService, // Usa tu servicebd para la consulta de correos
    private olvideContraService: OlvideContraService // Usa tu service para el envío de correos
  ) {this.codigoEnviado = false;}

  ngOnInit() {}

  // Función para enviar el código de verificación si el correo está en la base de datos
  // Función para verificar si el correo está registrado en la base de datos
  enviarCodigo() {
    if (this.correo.trim() === '') {
      this.mostrarAlerta('Error', 'Por favor, ingrese un correo válido.');
      return;
    }
  
    this.servicebd.verificarCorreo(this.correo).subscribe({
      next: (existe: boolean) => {
        if (existe) {
          // Generar el código de verificación
          this.codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();
  
          // Enviar el código de verificación al correo
          this.olvideContraService.enviarCorreo(this.correo, this.codigoGenerado).subscribe({
            next: () => {
              this.codigoEnviado = true; // Actualiza a true solo si se envió con éxito
              this.mostrarToast('Se ha enviado un código de verificación a tu correo');
            },
            error: (err) => {
              console.error('Error en el envío de correo:', err); // Loguea el error
              this.mostrarAlerta('Error', 'Error al enviar el código. Inténtalo de nuevo.');
              this.codigoEnviado = false; // Asegúrate de que no se muestre el input
            }
          });
        } else {
          this.mostrarAlerta('Error', 'El correo ingresado no está registrado.');
          this.codigoEnviado = false; // Asegúrate de que no se muestre el input
        }
      },
      error: (error: string) => {
        this.mostrarAlerta('Error', 'Error al verificar el correo: ' + error);
        this.codigoEnviado = false; // Asegúrate de que no se muestre el input
      }
    });
  }
  

  // Función para verificar si el código ingresado es correcto
  verificarCodigo() {
    if (this.codigo === this.codigoGenerado) {
      this.mostrarToast('Código verificado correctamente');
      this.router.navigate(['/cambio-contra']); // Redirigir a la página de cambio de contraseña
    } else {
      this.mostrarAlerta('Error', 'Código incorrecto, intenta nuevamente');
    }
  }

  // Función para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para mostrar un toast (mensajes temporales en la parte inferior)
  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}
