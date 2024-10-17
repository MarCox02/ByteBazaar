import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catalogoc',
  templateUrl: './catalogoc.page.html',
  styleUrls: ['./catalogoc.page.scss'],
})
export class CatalogocPage implements OnInit {

  Usuario: string = "";

  constructor(private menuCtrl: MenuController,private router: Router, private activerouter: ActivatedRoute,
    private userService: UserService 
  ) {
    this.activerouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.Usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    })
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
  }

}
