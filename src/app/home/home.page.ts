import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { ServicebdService } from '../services/servicebd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
interface Usuario {
  rut: string;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  contrasena: string;
  telefono: string;
  rol: string; // Agregar rol a la interfaz
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
    private activerouter: ActivatedRoute,
    private bd: ServicebdService,
    private storage: NativeStorage
  ) {
    // Escuchar cambios en los parámetros de la ruta
    this.activerouter.queryParams.subscribe(params => {
      const state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        const usuarioRegistrado = state['datosUsuario'] as Usuario;
        if (usuarioRegistrado) {
          this.registrarUsuario(usuarioRegistrado);
        }
      }
    });
  }


  ngOnInit() {
    this.menuCtrl.enable(false, 'comprador');
    this.menuCtrl.enable(false, 'vendedor');
    this.bd.crearBD();
  }
  usuario: string = '';
  contrasena: string = '';
  rol: string = '';



  // Usuarios estáticos para el ejemplo
  listaUsuarios: Usuario[] = [
    { rut: '12345678-9', nombre: 'Angel', apellido: 'Perugini', usuario: 'Angel',telefono: '933336269', correo: 'angel@example.com', contrasena: 'Angel123', rol: 'vendedor' },
    { rut: '87654321-0', nombre: 'Martin', apellido: 'Cox', usuario: 'Martin', telefono: '955555555',correo: 'martin@example.com', contrasena: 'Martin123', rol: 'vendedor' },
    { rut: '13579246-8', nombre: 'Victor', apellido: 'Gonzalez', usuario: 'Victor',telefono: '966665555', correo: 'victor@example.com', contrasena: 'Victor123', rol: 'comprador' }
  ];

  
// Agrega usuarios registrados
registrarUsuario(nuevoUsuario: Usuario) {
  this.listaUsuarios.push(nuevoUsuario);
}

  login() {

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


     // Redirigir según el rol
     if (usuarioValido.rol === 'vendedor') {
      this.menuCtrl.enable(true, 'vendedor'); // Habilita el menú del vendedor
      this.router.navigate(['/catalogov'], navigationExtras); // Página del vendedor
    } else if (usuarioValido.rol === 'comprador') {
      this.menuCtrl.enable(true, 'comprador'); // Habilita el menú del comprador
      this.router.navigate(['/catalogoc'], navigationExtras); // Página del comprador
    }
  } else {
    this.alerta("Error de login", "Usuario o contraseña incorrectos."); // Mensaje de error si no es válido
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