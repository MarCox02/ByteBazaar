import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-cambio-contra-v',
  templateUrl: './cambio-contra-v.page.html',
  styleUrls: ['./cambio-contra-v.page.scss'],
})
export class CambioContraVPage implements OnInit {

  constructor(private menuCtrl: MenuController,private alertController: AlertController,  private router: Router, private toastController: ToastController) { }

  ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(false,'vendedor')
  }
  nuevaContrasena!:string;
  confirmarContrasena!:string;
cambiarContrasena(){
  const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.,@$!%*?&]{6,20}$/;

  if (!patronContrasena.test(this.nuevaContrasena)) {
    this.alerta('Error', 'La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.');
    return;
  }
  if (this.nuevaContrasena!== this.confirmarContrasena) {
    this.alerta('Error', 'Las contraseñas no coinciden.');
    return; 
  }
  this.router.navigate(['/loginv'])
  this.presentToast('Éxito', 'Contraseña cambiada correctamente.');
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
