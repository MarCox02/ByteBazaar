import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ActionSheetController, MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/Modelo/usuario';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'; // Importa Camera y CameraSource

@Component({
  selector: 'app-editar-perfilc',
  templateUrl: './editar-perfilc.page.html',
  styleUrls: ['./editar-perfilc.page.scss'],
})
export class EditarPerfilcPage implements OnInit {
  
  editMode: boolean = false; // Estado para activar/desactivar edición
  correo: string = '';
  nombreUsuario: string = '';
  fotoPerfil: string | null = ''; // Ruta de la foto de perfil
  nuevaFoto: File | null = null; // Archivo de la nueva foto de perfil
  usuario: Usuario | null = null;
  id_rol: string = ''; // Para manejar el cambio de rol

  constructor(private userService: UserService, private alertController: AlertController,
              private actionSheetController: ActionSheetController, private menuCtrl: MenuController,
              private servicebd: ServicebdService, private router: Router) { }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      const rol = usuario.id_rol; // Suponiendo que id_rol es un string
      this.menuCtrl.enable(rol === '2', 'comprador');
      this.menuCtrl.enable(rol === '1', 'vendedor');
      
      this.usuario = usuario;
      this.correo = usuario.correo;
      this.nombreUsuario = usuario.user;
      this.fotoPerfil = usuario.foto_perfil || 'ruta/default_avatar.jpg';
      this.id_rol = usuario.id_rol;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar una opción',
      buttons: [
        {
          text: 'Tomar Foto',
          handler: () => {
            this.tomarFoto();
          }
        },
        {
          text: 'Seleccionar de la Galería',
          handler: () => {
            this.seleccionarDeGaleria();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // Cambiado a DataUrl para obtener la imagen en formato base64
      source: CameraSource.Camera // Para especificar que es de la cámara
    });

    if (image.dataUrl) {
      this.fotoPerfil = image.dataUrl; // Actualiza la imagen mostrada
      this.nuevaFoto = await this.convertirBase64AFile(image.dataUrl); // Guarda como File
    } else {
      this.alerta('Error', 'No se pudo obtener la imagen.');
    }
  }

  async seleccionarDeGaleria() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos // Para especificar que es de la galería
    });

    if (image.dataUrl) {
      this.fotoPerfil = image.dataUrl; // Actualiza la imagen mostrada
      this.nuevaFoto = await this.convertirBase64AFile(image.dataUrl); // Guarda como File
    } else {
      this.alerta('Error', 'No se pudo obtener la imagen.');
    }
  }

  async convertirBase64AFile(base64: string): Promise<File | null> {
    const response = await fetch(base64);
    const blob = await response.blob();
    return new File([blob], 'foto.jpg', { type: blob.type });
  }

  async toggleEdit() {
    if (this.editMode) {
      await this.actualizarUsuario();
    }
    this.editMode = !this.editMode; // Alternar el modo de edición
  }

  async actualizarUsuario() {
    if (this.usuario) {
      this.usuario.correo = this.correo;
      this.usuario.user = this.nombreUsuario;
      this.usuario.id_rol = this.id_rol;

      if (this.nuevaFoto) {
        const base64Foto = await this.convertirArchivoABase64(this.nuevaFoto);
        if (typeof base64Foto === 'string') {
          this.usuario.foto_perfil = base64Foto;
        } else {
          console.error('Error al convertir la imagen a base64');
        }
      }

      try {
        await this.servicebd.actualizarUsuario(this.usuario);
        await this.userService.login(this.usuario);
        await this.alerta('Éxito', 'Datos actualizados correctamente');

        // Redirigir según el rol después de guardar los cambios
        this.router.navigate([this.usuario.id_rol === '1' ? '/perfilv' : '/perfilc']);
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

  irACambiarContrasena() {
    this.router.navigate(['/introduzca-contra']);
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
