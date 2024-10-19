import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-perfilc',
  templateUrl: './perfilc.page.html',
  styleUrls: ['./perfilc.page.scss'],
})
export class PerfilcPage implements OnInit {
  private userSubscription: Subscription | null = null; // Inicializa como null
  usuario: Usuario | null = null; // Almacena el usuario
  usuario$: Observable<Usuario | null>; // Observable para el usuario

  constructor(private menuCtrl: MenuController, private userService: UserService,private servicesbd: ServicebdService,
    private router: Router,private alertController: AlertController) { 
    this.usuario$ = this.userService.currentUser$;
  }

  async ngOnInit() {
    this.menuCtrl.enable(true,'comprador')
    this.menuCtrl.enable(false,'vendedor')
   // Suscribirse al observable
   this.userSubscription = this.userService.currentUser$.subscribe(usuario => {
    this.usuario = usuario; // Actualiza el perfil con el usuario
  });
  this.usuario = await this.userService.obtenerUsuario();
}

async eliminarCuenta() {
  // Verifica si el usuario ha sido cargado
  if (!this.usuario) {
    await this.alerta("Error", "No se pudo obtener el usuario. Intenta nuevamente.");
    return;
  }

  if (!this.usuario.rut) {
    await this.alerta("Error", "No se pudo obtener el RUT del usuario.");
    return;
  }

  const confirm = await this.alertController.create({
    header: 'Confirmar Eliminación',
    message: '¿Estás seguro de que deseas eliminar tu cuenta?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Eliminar',
        handler: async () => {
          try {
            // Aquí usamos el "this" de la clase PerfilvPage porque es una función flecha
            console.log('Eliminando cuenta para RUT:', this.usuario?.rut);
            await this.servicesbd.eliminarUsuario(this.usuario!.rut); // Usa el "!" para asegurar que no es null
            await this.alerta("Éxito", "Tu cuenta ha sido eliminada.");
            this.router.navigate(['/']); // Redirigir a la página principal o de inicio de sesión
          } catch (error) {
            console.error(error); // Para depuración
            await this.alerta("No se pudo eliminar tu cuenta. Intenta nuevamente. Detalle: ",`{error}`  );
          }
        } // <- Función flecha
      }
    ]
  });

  await confirm.present();
}
ngOnDestroy() {
  // Asegúrate de cancelar la suscripción al destruir el componente
  if (this.userSubscription) {
    this.userSubscription.unsubscribe();
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

