import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-loginc',
  templateUrl: './loginc.page.html',
  styleUrls: ['./loginc.page.scss'],
})
export class LogincPage implements OnInit{

  constructor(private menuCtrl: MenuController, private alertController: AlertController, private toastController: ToastController,
     private router: Router, private activerouter: ActivatedRoute ) { this.activerouter.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];
      }
    })}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }

  usuario: string = '';
  contrasena: string = '';



  // Usuarios estáticos para el ejemplo
  listaUsuarios = [
    { usuario: 'Angel', contrasena: 'Angel123' },
    { usuario: 'Martin', contrasena: 'Martin123' },
    { usuario: 'Victor', contrasena: 'Victor123'}
  ];


  login() {

    const usuarioExistente = this.listaUsuarios.find(
      u => u.usuario === this.usuario
    );

    const usuarioValido = this.listaUsuarios.find(
      u => u.usuario === this.usuario && u.contrasena === this.contrasena
    );

    if (!usuarioExistente) {
      this.listaUsuarios.push({
        usuario: this.usuario,
        contrasena: this.contrasena
      });
    }

let navigationextras: NavigationExtras ={
      state: {
        user: this.usuario,
        contrasena: this.contrasena,
      }
    }

    if (usuarioValido) {
      this.alerta_t("Login exitoso", "Has iniciado sesión correctamente.");
      this.router.navigate(['/catalogoc'],navigationextras);
    } else {
      this.alerta("Error de login", "Usuario o contraseña incorrectos.");
    }
  }


  /*alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alerta_t(titulo: string, mensaje: string ) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}
