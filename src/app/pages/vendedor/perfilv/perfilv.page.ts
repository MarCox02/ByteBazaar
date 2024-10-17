import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-perfilv',
  templateUrl: './perfilv.page.html',
  styleUrls: ['./perfilv.page.scss'],
})
export class PerfilvPage implements OnInit {
  private userSubscription: Subscription | null = null; // Inicializa como null
  usuario: Usuario | null = null; // Almacena el usuario
  usuario$: Observable<Usuario | null>; // Observable para el usuario

  constructor(private menuCtrl: MenuController, private userService: UserService) { 
    this.usuario$ = this.userService.currentUser$;
  }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      // Establecer el rol y habilitar/deshabilitar el menú correspondiente
      const rol = usuario.id_rol; // Suponiendo que id_rol es un string

      // Habilitar y deshabilitar los menús según el rol
      this.menuCtrl.enable(rol === '2', 'comprador'); // Habilitar menú de comprador
      this.menuCtrl.enable(rol === '1', 'vendedor'); // Habilitar menú de vendedor
    }
   // Suscribirse al observable
   this.userSubscription = this.userService.currentUser$.subscribe(usuario => {
    this.usuario = usuario; // Actualiza el perfil con el usuario
  });
 // Cargar el usuario inicialmente
 this.usuario = await this.userService.obtenerUsuario();
 if (this.usuario) {
  // Habilitar o deshabilitar menús según el rol
  if (this.usuario.id_rol === 'vendedor') {
    this.menuCtrl.enable(true, 'vendedor');
    this.menuCtrl.enable(false, 'comprador');
  } else {
    this.menuCtrl.enable(false, 'vendedor');
    this.menuCtrl.enable(true, 'comprador');
  }
}
}
ngOnDestroy() {
  // Asegúrate de cancelar la suscripción al destruir el componente
  if (this.userSubscription) {
    this.userSubscription.unsubscribe();
  }
}
}
