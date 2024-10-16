import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-editar-perfilv',
  templateUrl: './editar-perfilv.page.html',
  styleUrls: ['./editar-perfilv.page.scss'],
})
export class EditarPerfilvPage implements OnInit {

  editMode: boolean = false; // Estado para activar/desactivar edición
  correo: string = '';
  nombreUsuario: string = '';
  fotoPerfil: string | null = ''; // Ruta de la foto de perfil
  nuevaFoto: File | null = null; // Archivo de la nueva foto de perfil
  usuario: Usuario | null = null;

  constructor(private userService: UserService, private alertController: AlertController,private menuCtrl: MenuController,private servicebd: ServicebdService) { }

  async ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
    // Obtener el usuario desde el servicio
    this.usuario = await this.userService.obtenerUsuario();
    if (this.usuario) {
      this.correo = this.usuario.correo;
      this.nombreUsuario = this.usuario.user;
      this.fotoPerfil = this.usuario.foto_perfil || 'ruta/default_avatar.jpg';
    }
  }

  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.nuevaFoto = file;
  
      // Previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoPerfil = e.target.result; // Esto actualiza inmediatamente la imagen mostrada
      };
      reader.readAsDataURL(file);
    } else {
      this.alerta('Error', 'Por favor selecciona un archivo de imagen válido.');
    }
  }

  toggleEdit() {
    if (this.editMode) {
      // Guardar cambios
      this.actualizarUsuario();
    }
    this.editMode = !this.editMode; // Alternar el modo de edición
  }

  async actualizarUsuario() {
    if (this.usuario) {
      // Actualiza las propiedades del usuario
      this.usuario.correo = this.correo;
      this.usuario.user = this.nombreUsuario;
  
      // Manejo de la nueva foto
      if (this.nuevaFoto) {
        const base64Foto = await this.convertirArchivoABase64(this.nuevaFoto);
        if (typeof base64Foto === 'string') {
          this.usuario.foto_perfil = base64Foto; // Guardar la imagen como Base64
        } else {
          console.error('Error al convertir la imagen a base64');
        }
      }
  
      // Actualización en la base de datos
      try {
        await this.servicebd.actualizarUsuario(this.usuario);
        await this.userService.login(this.usuario); // Actualiza el almacenamiento en NativeStorage
        await this.alerta('Éxito', 'Datos actualizados correctamente');
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        await this.alerta('Error', 'No se pudo actualizar los datos. Intenta nuevamente.');
      }
    }
  }

  convertirArchivoABase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
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
