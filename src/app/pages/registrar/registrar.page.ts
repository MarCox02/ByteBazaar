import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController, ToastController } from '@ionic/angular';

interface Usuario {
  rut: string;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  contrasena: string;
}


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  constructor(private menuCtrl: MenuController,private alertController: AlertController,  private router: Router, 
    private toastController: ToastController) {}

  ngOnInit() {
    this.menuCtrl.enable(false,'vendedor')
    this.menuCtrl.enable(false,'comprador')

  }



  Vendedor: Usuario = {
    rut: '',
    nombre: '',
    apellido: '',
    usuario: '',
    correo: '',
    contrasena: ''
  };

  Comprador: Usuario = {
    rut: '',
    nombre: '',
    apellido: '',
    usuario: '',
    correo: '',
    contrasena: ''
  };


  

  rol: string = ''; // Nueva variable para el rol
  rut!: string;
  nombre!: string;
  apellido!: string;
  usuario!: string;
  correo!: string;
  contrasena!: string;
  confirmarContrasena!: string;

  formulario(){

    if (!this.rol || !this.rut || !this.nombre || !this.apellido || !this.usuario || !this.correo || !this.contrasena || !this.confirmarContrasena) {
      this.alerta("Campos vacíos", "Todos los campos son obligatorios");
      return;
    }

    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!patronEmail.test(this.correo)) {
      this.alerta("Correo inválido", "Por favor, ingrese un correo electrónico válido.");
      return;
    }

    const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.,@$!%*?&]{6,20}$/;
    if (!patronContrasena.test(this.contrasena)) {
      this.alerta("Contraseña inválida", "La contraseña debe tener entre 6 y 20 caracteres, incluyendo al menos una mayúscula, una minúscula y un dígito.");
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.alerta("Contraseñas no coinciden", "Las contraseñas no coinciden");
      return;
    }

    if (!this.validarRUT(this.rut)) {
      this.alerta("RUT inválido", "El RUT ingresado no es válido");
      return;
    }

    // Guardar la información según el rol
    let datosUsuario: Usuario;   
    if (this.rol === 'vendedor') {
      this.Vendedor = {
        rut: this.rut,
        nombre: this.nombre,
        apellido: this.apellido,
        usuario: this.usuario,
        correo: this.correo,
        contrasena: this.contrasena
      };
      datosUsuario = this.Vendedor; // Asignar Vendedor
    } else if (this.rol === 'comprador') {
      this.Comprador = {
        rut: this.rut,
        nombre: this.nombre,
        apellido: this.apellido,
        usuario: this.usuario,
        correo: this.correo,
        contrasena: this.contrasena
      };
      datosUsuario = this.Comprador; // Asignar Comprador
    } else {
      this.alerta("Rol inválido", "Por favor, selecciona un rol válido.");
      return;
    }

    // Preparar los datos para enviarlos al login
    let navigationExtras: NavigationExtras = {
      state: {
        rol: this.rol,
        datosUsuario: datosUsuario
      }
    };

    // Mostrar el mensaje de registro exitoso
    this.alerta_t("Registro exitoso", "Te has registrado correctamente, ahora puedes iniciar sesión");
    
    // Navegar al login y pasar los datos
    this.router.navigate(['/home'], navigationExtras);
  }

  validarRUT(rut: string): boolean {
    // Eliminar los puntos y guiones del RUT
    rut = rut.replace(/\./g, '').replace(/-/g, '');

    // Obtener el cuerpo del RUT y el dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    // Validar que el cuerpo sea numérico y que tenga la longitud correcta
    if (cuerpo.length < 7 || cuerpo.length > 8 || isNaN(Number(cuerpo))) {
      return false;
    }

    // Calcular el dígito verificador
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i)) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    // Comparar el dígito verificador calculado con el ingresado
    return dvCalculado === dv;
  }

  /* Alertas */
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