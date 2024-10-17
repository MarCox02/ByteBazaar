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
) {this.cargarUsuario(); }

private async cargarUsuario() {
  const usuario = await this.obtenerUsuario();
  this.currentUserSubject.next(usuario); // Emitir el usuario inicial
}

async login(usuario: Usuario) {
  // Asegúrate de que todas las propiedades estén definidas
  const usuarioALogar = {
    rut: usuario.rut,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    user: usuario.user,
    telefono: usuario.telefono,
    foto_perfil: usuario.foto_perfil,
    correo: usuario.correo,
    contrasena: usuario.contrasena,
    id_rol: usuario.id_rol
  };
  await this.nativeStorage.setItem('usuario', usuarioALogar);
  this.currentUserSubject.next(usuarioALogar);
}

    // Método para obtener el RUT del usuario desde NativeStorage
    async obtenerUsuario(): Promise<Usuario | null> {
      try {
        const usuario = await this.nativeStorage.getItem('usuario');
        console.log("Usuario recuperado de NativeStorage:", usuario); // Verifica si se recuperó correctamente
        return usuario || null;
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null;
      }
    }

   // Este método se llamaría después de editar el usuario
   async editarUsuario(usuario: Usuario) {
    // Lógica para guardar el usuario editado en la base de datos
    await this.nativeStorage.setItem('usuario', usuario);
    this.currentUserSubject.next(usuario); // Actualiza el BehaviorSubject con el usuario editado
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
