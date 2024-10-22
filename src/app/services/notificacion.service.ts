import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { AlertController, ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(private alertController: AlertController ) { }

  public async requestPermissions(): Promise<boolean> {
    try {
      const permisos = await LocalNotifications.checkPermissions();
      if (permisos.display === 'granted') {
        return true;
      } else {
        const resultado = await LocalNotifications.requestPermissions();
        if (resultado.display === 'granted') {
          console.log('Permisos de notificación concedidos.');
          return true;
        } else {
          console.warn('Permisos de notificación no concedidos.');
          return false;
        }
      }
    } catch (error) {
      this.alerta('Error al solicitar permisos de notificación:', `${error}`);
      return false;
    }
  }
  

  // Programar una notificación local
  public async programarNotificacion() {
    const notificacionId = Math.floor(Math.random() * 1000); // Generar un ID único

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Compra Exitosa',
            body: 'Gracias por tu compra!',
            id: notificacionId,
            schedule: { at: new Date(Date.now() + 1000) }, // La notificación aparecerá en 1 segundo
          },
        ],
      });
    } catch (error) {
      this.alerta('Error al programar la notificación:', `${error}`);
    }
  }

  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }
}