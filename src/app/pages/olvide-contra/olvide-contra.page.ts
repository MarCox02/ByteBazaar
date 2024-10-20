import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Asegúrate de importar tu servicio para consultas a la BD

@Component({
  selector: 'app-olvide-contra',
  templateUrl: './olvide-contra.page.html',
  styleUrls: ['./olvide-contra.page.scss'],
})
export class OlvideContraPage implements OnInit {
  correo: string = ''; // Asegúrate de inicializar la variable
  codigo: string = '';
  codigoGenerado: string = '';
  codigoEnviado: boolean = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private servicebd: ServicebdService // Usa tu servicebd para la consulta de correos
  ) {}

  ngOnInit() {}

  // Función para enviar el código de verificación si el correo está en la base de datos
  async enviarCodigo() {
    if (!this.correo) {
      this.mostrarAlerta('Error', 'Por favor, ingresa un correo válido');
      return;
    }

    try {
      // Verificar si el correo existe en la base de datos
      const existe = await this.servicebd.verificarCorreo(this.correo);

      if (existe) {
        // Generar un código de verificación (por ejemplo, un número aleatorio de 6 dígitos)
        this.codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();

        // Enviar el código al correo del usuario (simulando el envío)
        // Aquí deberías implementar un servicio que realmente envíe el correo
        const envioExitoso = await this.simularEnvioCorreo(this.correo, this.codigoGenerado);

        if (envioExitoso) {
          this.codigoEnviado = true;
          this.mostrarToast('Se ha enviado un código de verificación a tu correo');
        } else {
          this.mostrarAlerta('Error', 'Error al enviar el código de verificación. Inténtalo de nuevo.');
        }
      } else {
        this.mostrarAlerta('Error', 'El correo ingresado no está registrado.');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Error al verificar el correo: ' + error);
    }
  }

  // Función para verificar si el código ingresado es correcto
  verificarCodigo() {
    if (this.codigo === this.codigoGenerado) {
      this.mostrarToast('Código verificado correctamente');
      // Redirigir al siguiente paso (ej. cambiar contraseña)
      this.router.navigate(['/cambio-contra']);
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

  // Simular el envío de un correo (deberías reemplazar esto con un servicio real)
  async simularEnvioCorreo(correo: string, codigo: string): Promise<boolean> {
    this.mostrarAlerta(`codigo `,`Enviando código ${codigo} a ${correo}`);
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000)); // Simula un delay y retorna éxito
  }
}
