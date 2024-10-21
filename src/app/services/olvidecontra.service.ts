import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class OlvideContraService {
  private apiUrl = 'https://api.emailjs.com/api/v1.0/email/send'; // URL de la API de SendGrid (puedes usar otro servicio)
  private public_key = 'pMgYuxH-AjMbTJdXF'; // API key de SendGrid
  private services_key = `service_88b994g`;
  private template_id = `template_sh3syat`;

  constructor(private http: HttpClient,private alertController: AlertController,
  ) {}

  enviarCorreo(email: string, codigo: string): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    let body = {
      "service_id": this.services_key,
      "template_id": this.template_id,
      "user_id": this.public_key,
      "template_params": {
        "email": email,
        "mensaje": codigo
      }
    };
  
    return this.http.post(this.apiUrl, body, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error al enviar correo:', error);
        return throwError('Error en el envío del correo: ' + (error.error || error.message || 'Error desconocido'));
      })
    );
  }
  

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
