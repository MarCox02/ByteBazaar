import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
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

  constructor(private menuCtrl: MenuController, private userService: UserService) { 
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
ngOnDestroy() {
  // Asegúrate de cancelar la suscripción al destruir el componente
  if (this.userSubscription) {
    this.userSubscription.unsubscribe();
  }
}
}

