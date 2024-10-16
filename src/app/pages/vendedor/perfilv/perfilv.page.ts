import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-perfilv',
  templateUrl: './perfilv.page.html',
  styleUrls: ['./perfilv.page.scss'],
})
export class PerfilvPage implements OnInit {

  usuario: Usuario | null = null; // Almacena el usuario
  constructor(private menuCtrl: MenuController, private userService: UserService) { }

  async ngOnInit() {
    this.menuCtrl.enable(false,'comprador')
    this.menuCtrl.enable(true,'vendedor')
    this.usuario = await this.userService.obtenerUsuario(); // Asegúrate de que este método esté implementado

  }

}
