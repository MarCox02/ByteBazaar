import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor( private nativeStorage: NativeStorage,private alertController: AlertController,
) { }

async login(user: Usuario) {
  // Después de iniciar sesión correctamente
  this.currentUserSubject.next(user); // Emitir el nuevo usuario logueado
}
   // Método para guardar el RUT del usuario
   async guardarUsuario(rut: string) {
    try {
      await this.nativeStorage.setItem('usuario', { rut: rut });
      this.presentAlert('Usuario guardado:', `${rut}`);
    } catch (error) {
      this.presentAlert('Error al guardar el usuario:', `${error}`);
    }
  }

  // Método para obtener el RUT del usuario
  async obtenerRutUsuario(): Promise<string | null> {
    try {
      const usuario = await this.nativeStorage.getItem('usuario');
      console.log('Usuario recuperado:', usuario); // Depuración
      this.presentAlert(`RUT`, `${usuario.rut}`);
      return usuario.rut;
    } catch (error) {
      this.presentAlert('Error al obtener el usuario:', `${error}`);
      return null; // O lanza una excepción si prefieres
    }
  }


  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
