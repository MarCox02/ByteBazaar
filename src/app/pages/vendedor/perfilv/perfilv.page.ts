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
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
   // Suscribirse al observable
   this.userSubscription = this.userService.currentUser$.subscribe(usuario => {
    this.usuario = usuario; // Actualiza el perfil con el usuario
  });
 // Cargar el usuario inicialmente
 this.usuario = await this.userService.obtenerUsuario();
}
ngOnDestroy() {
  // Asegúrate de cancelar la suscripción al destruir el componente
  if (this.userSubscription) {
    this.userSubscription.unsubscribe();
  }
}
}
