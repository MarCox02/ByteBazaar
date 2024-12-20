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
  correoValido: boolean = true;
  nombreUsuarioValido: boolean = true;

  patronEmail: string = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

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

  validarCorreo() {
    const patron = new RegExp(this.patronEmail);
    this.correoValido = patron.test(this.correo);
  }

  validarNombreUsuario() {
    this.nombreUsuarioValido = this.nombreUsuario.length >= 3;
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
      this.nombreUsuario = this.nombreUsuario.trim();
      this.correo = this.correo.trim();
      // Ejecuta las validaciones antes de actualizar el usuario
      if (!this.validarFormulario()) {
        this.alerta('Error', 'Por favor, corrige los errores en el formulario antes de guardar.');
        return; // Si alguna validación falla, se sale del método y no guarda
      }
      // Intenta actualizar el usuario solo si todas las validaciones son exitosas
      const exito = await this.actualizarUsuario();
      if (exito) {
        this.editMode = !this.editMode; // Cambia el modo solo si la actualización fue exitosa
      }
    } else {
      this.editMode = !this.editMode; // Cambia al modo de edición
    }
  }

  validarFormulario() {
    this.validarCorreo();
    this.validarNombreUsuario();
    return this.correoValido && this.nombreUsuarioValido;
  }

  async actualizarUsuario(): Promise<boolean> {
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

        // Redirige según el rol del usuario
      if (this.usuario.id_rol === '1') { // Vendedor
        this.router.navigate(['/perfilv']);
      } else if (this.usuario.id_rol === '2') { // Comprador
        this.router.navigate(['/perfilc']);
      }

        return true; // Actualización exitosa
      } catch (error) {
        // Verifica si error es una instancia de Error y contiene un mensaje específico
        if (error instanceof Error && error.message === 'El nombre de usuario ya existe') {
          await this.alerta('Error', 'El nombre de usuario ya existe. Por favor, elige otro.');
        } else {
          await this.alerta('Error', 'No se pudo actualizar los datos. Intenta nuevamente.');
        }
        return false; // La actualización falló
      }
    }
    return false; // Devuelve false si no se puede realizar la actualización
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
