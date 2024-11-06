import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { AlertController } from '@ionic/angular';
import { Usuario } from './Modelo/usuario';
import { ServicebdService } from './servicebd.service';
import { CarritoService } from './carrito.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor( private nativeStorage: NativeStorage,private alertController: AlertController, private servicebd : ServicebdService,
    private carritoService: CarritoService,private router: Router
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
    async obtenerUsuario(): Promise<Usuario> {
      try {
        const usuario = await this.nativeStorage.getItem('usuario');
        return usuario; // Asegúrate de que esto sea de tipo Usuario
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        throw error; // Lanza el error para manejarlo en el componente
      }
    }

    async cerrarSesion() {
      const carrito = this.carritoService.obtenerCarrito();
      
      for (const item of carrito) {
        await this.servicebd.sumarStock(item.id_producto, item.cantidad!); // Asegúrate de que `cantidad` esté definido
      }
      
      this.carritoService.limpiarCarrito(); // Limpiar el carrito después de aumentar el stock
      
      // Redirigir al usuario a la página de inicio
      this.router.navigate(['/']); 
    }

    // Método para obtener solo el correo del usuario
  async obtenerCorreo(): Promise<string | null> {
    const usuario = await this.obtenerUsuario();
    return usuario ? usuario.correo : null; // Devuelve el correo o null
  }

  async cambiarContrasena(nuevaContrasena: string): Promise<void> {
    const usuario = await this.obtenerUsuario(); // Obtiene el usuario actual
    if (usuario) {
      // Llama al método de bdservices para cambiar la contraseña
      await this.servicebd.cambiarContrasena(usuario.rut, nuevaContrasena);
      usuario.contrasena = nuevaContrasena; // Actualiza la contraseña en el objeto de usuario
      await this.nativeStorage.setItem('usuario', usuario); // Guarda el usuario actualizado en NativeStorage
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
