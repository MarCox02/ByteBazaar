import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-olvide-contra',
  templateUrl: './olvide-contra.page.html',
  styleUrls: ['./olvide-contra.page.scss'],
})
export class OlvideContraPage implements OnInit {

  constructor(private alertController: AlertController, private toastController: ToastController, private router: Router) { }

  

  ngOnInit() {
  }

  correo!:string;

  olvideContrasena() {
    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!patronEmail.test(this.correo)) {
      const Titulo = "Correo inválido";
      const Mensaje = "Por favor, ingrese un correo electrónico válido.";
      this.alerta(Titulo, Mensaje);
      return;
    }

    this.router.navigate(['/cambio-contra']);
    // Simulación de envío del correo electrónico
    this.presentToast('Correo electrónico enviado', 'Te hemos enviado un correo electrónico con instrucciones para recuperar tu contraseña');
  }
  /*alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(titulo: string, mensaje: string ) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
