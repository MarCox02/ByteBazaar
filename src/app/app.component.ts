import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {
    this.showSplash(); // Mostrar Splash Screen cuando la app se inicia
  }

  async cerrarSesion() {
    await this.userService.cerrarSesion(); // Incrementa el stock y limpia el carrito
    this.router.navigate(['/']); // Redirige a la página de inicio
  }

 async showSplash(){
    await SplashScreen.show({
      autoHide: true,
      showDuration: 1000
    })
  }
}