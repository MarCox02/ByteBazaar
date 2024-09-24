import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
interface Usuario {
  rut: string;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  contrasena: string;
  rol: string; // Agregado para manejar el rol
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private activerouter: ActivatedRoute
  ) {
    this.activerouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['contrasena'];
      }
    });
  }
  ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(false, 'vendedor');
  }

  usuario: string = '';
  contrasena: string = '';
  rol: string = '';



  // Usuarios estáticos para el ejemplo
  listaUsuarios: Usuario[] = [
    { rut: '12345678-9', nombre: 'Angel', apellido: 'Perugini', usuario: 'Angel', correo: 'angel@example.com', contrasena: 'Angel123', rol: 'vendedor' },
    { rut: '87654321-0', nombre: 'Martin', apellido: 'Cox', usuario: 'Martin', correo: 'martin@example.com', contrasena: 'Martin123', rol: 'vendedor' },
    { rut: '13579246-8', nombre: 'Victor', apellido: 'Gonzalez', usuario: 'Victor', correo: 'victor@example.com', contrasena: 'Victor123', rol: 'comprador' }
  ];


  login() {

   // Verificar si el usuario ya existe
   const usuarioExistente = this.listaUsuarios.find(
    u => u.usuario === this.usuario
  );

  if (usuarioExistente) {
    this.alerta("Error de registro", "El nombre de usuario ya está en uso. Por favor, elige otro.");
    return; // Salir de la función si el usuario ya existe
  }

    const usuarioValido = this.listaUsuarios.find(
      u => u.usuario === this.usuario && u.contrasena === this.contrasena
    );

    if (usuarioValido) {
      // Preparar los datos de navegación
      let navigationExtras: NavigationExtras = {
        state: {
          user: usuarioValido.usuario,
          contrasena: this.contrasena,
          rol: usuarioValido.rol
        }
      };

      this.alerta_t("Login exitoso", "Has iniciado sesión correctamente.");




    if (usuarioValido.rol === 'vendedor') {
      this.menuCtrl.enable(true, 'vendedor');
      this.router.navigate(['/catalogov'], navigationExtras); // Página del vendedor
    } else if (usuarioValido.rol === 'comprador') {
      this.menuCtrl.enable(true, 'comprador');
      this.router.navigate(['/catalogoc'], navigationExtras); // Página del comprador
    }
  } else {
    this.alerta("Error de login", "Usuario o contraseña incorrectos.");
  }
}


  /* alertas */
  async alerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alerta_t(titulo: string, mensaje: string) {
    const alert_t = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });

    await alert_t.present();
  }
}