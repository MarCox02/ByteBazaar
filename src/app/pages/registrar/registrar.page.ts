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
  rol: string; // Agregar rol a la interfaz
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false, 'vendedor');
    this.menuCtrl.enable(false, 'comprador');
  }

  // Variables del formulario
  rol: string = '';
  rut!: string;
  nombre!: string;
  apellido!: string;
  usuario!: string;
  correo!: string;
  contrasena!: string;
  confirmarContrasena!: string;

    // Mensajes de error
  errorRut: string = '';
  errorNombre: string = '';
  errorApellido: string = '';
  errorUsuario: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorConfirmarContrasena: string = '';
  errorRol: string = '';

  // Lista de usuarios
  listaUsuarios: Usuario[] = [];
  

  formulario() {

    // Resetear mensajes de error
    this.resetearErrores();

     // Validaciones de campos
     let hayErrores = false; // Bandera para verificar si hay errores

  // Validaciones de campos
  if (!this.rol) {
    this.errorRol = "Rol es obligatorio";
    hayErrores = true;
  }
  if (!this.rut) {
    this.errorRut = "Rut es obligatorio";
    hayErrores = true;
  }
  if (!this.nombre) {
    this.errorNombre = "Nombre es obligatorio";
    hayErrores = true;
  }
  if (!this.apellido) {
    this.errorApellido = "Apellido es obligatorio";
    hayErrores = true;
  }
  if (!this.usuario) {
    this.errorUsuario = "Usuario es obligatorio";
    hayErrores = true;
  }
  if (!this.correo) {
    this.errorCorreo = "Correo es obligatorio";
    hayErrores = true;
  }
  if (!this.contrasena) {
    this.errorContrasena = "Contraseña es obligatoria";
    hayErrores = true;
  }
  if (!this.confirmarContrasena) {
    this.errorConfirmarContrasena = "Confirmar contraseña es obligatorio";
    hayErrores = true;
  }

  // Validar si hay errores antes de continuar
  if (hayErrores) {
    return; // Si hay errores, no continuar
  }


    if (!this.validarRUT(this.rut)) {
      this.errorRut = "El RUT ingresado no es válido";
      hayErrores = true;
    }

    const patronEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!patronEmail.test(this.correo)) {
      this.errorCorreo = "Por favor, ingrese un correo electrónico válido.";
      hayErrores = true;
    }

    const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d.,@$!%*?&]{6,20}$/;
    if (!patronContrasena.test(this.contrasena)) {
      this.errorContrasena = "El formato de la contraseña no es correcta  ";
      hayErrores = true;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.errorConfirmarContrasena = "Las contraseñas no coinciden";
      hayErrores = true;
    }

    if (hayErrores) {
      return;
    }
    // Crear el nuevo usuario
    const nuevoUsuario: Usuario = {
      rut: this.rut,
      nombre: this.nombre,
      apellido: this.apellido,
      usuario: this.usuario,
      correo: this.correo,
      contrasena: this.contrasena,
      rol: this.rol // Asignar rol
    };

    // Agregar el nuevo usuario a la lista
    this.listaUsuarios.push(nuevoUsuario);

    // Preparar los datos para enviarlos al login
    let navigationExtras: NavigationExtras = {
      state: {
        rol: this.rol,
        datosUsuario: nuevoUsuario
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


  /* Resetear mensajes de error */
  resetearErrores() {
    this.errorRut = '';
    this.errorNombre = '';
    this.errorApellido = '';
    this.errorUsuario = '';
    this.errorCorreo = '';
    this.errorContrasena = '';
    this.errorConfirmarContrasena = '';
    this.errorRol = '';
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
