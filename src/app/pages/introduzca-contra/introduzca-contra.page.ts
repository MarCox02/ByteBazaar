import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-introduzca-contra',
  templateUrl: './introduzca-contra.page.html',
  styleUrls: ['./introduzca-contra.page.scss'],
})
export class IntroduzcaContraPage implements OnInit {
  contrasenaActual: string = ''; // Variable para almacenar la contraseña introducida

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
  }

  async verificarContrasena() {
    const usuario = await this.userService.obtenerUsuario(); // Obtén el usuario actual
    if (usuario && usuario.contrasena === this.contrasenaActual) {
      // Verifica si la contraseña introducida es correcta
      this.router.navigate(['/cambio-contra-perfil']); // Redirige al nuevo template usando Router
    } else {
      this.userService.presentAlert('Error', 'La contraseña introducida es incorrecta.'); // Muestra un mensaje de error
    }
  }
}
