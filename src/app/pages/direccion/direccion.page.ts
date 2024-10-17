import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.page.html',
  styleUrls: ['./direccion.page.scss'],
})
export class DireccionPage implements OnInit {

  direcciones: any[] = [];
  rutUsuario: string = '';

  constructor(private servicesbd: ServicebdService, private userService: UserService, private router: Router) { }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut; // Asumiendo que 'rut' es la propiedad correcta en el objeto Usuario
    } else {
      this.servicesbd.presentAlert('Error', 'No se pudo obtener el RUT del vendedor.');
    }

    this.cargarDirecciones();
  }
    
  

  cargarDirecciones() {
    this.servicesbd.getDireccionesByRUT(this.rutUsuario)
      .then(data => {
        this.direcciones = data;
      });
  }
  eliminar(nom_direccion: any){
    this.servicesbd.presentAlert('Error en eliminacion de datos', 'no se puede eliminar todavia ~'+nom_direccion);
  }
  modificar(nom_direccion: any){
    this.servicesbd.presentAlert('Error en modificion de datos', 'no se puede modificar todavia ~'+nom_direccion);
  }
}

