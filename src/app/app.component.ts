import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService, private router: Router) {}

  async cerrarSesion() {
    await this.userService.cerrarSesion(); // Incrementa el stock y limpia el carrito
    this.router.navigate(['/']); // Redirige a la página de inicio
  }
}