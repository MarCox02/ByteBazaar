import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuario } from 'src/app/services/Modelo/usuario';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  usuarios: Usuario[] = [];



  constructor(
    private menuCtrl: MenuController,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private sqlite: SQLite,
    private servicesbd: ServicebdService
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false, 'vendedor');
    this.menuCtrl.enable(false, 'comprador');
    this.servicesbd.fetchUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });

  }

  // Variables del formulario
  rol: string = '';
  rut!: string;
  nombre!: string;
  apellido!: string;
  user!: string;
  telefono!: string;
  correo!: string;
  contrasena!: string;
  confirmarContrasena!: string;

    // Mensajes de error
  errorRut: string = '';
  errorNombre: string = '';
  errorApellido: string = '';
  errorUsuario: string = '';
  errorTelefono: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorConfirmarContrasena: string = '';
  errorRol: string = '';

  // Lista de usuarios
  listaUsuarios: Usuario[] = [];


  async formulario() {

    this.user = this.user.trim();
    this.nombre = this.nombre.trim();
    this.apellido = this.apellido.trim();
    this.telefono = this.telefono.trim();
    this.correo = this.correo.trim();
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
  if (!this.user || this.user.length < 3) {
    this.errorUsuario = "El nombre de usuario debe tener al menos 3 letras";
    hayErrores = true;
  }
  if (!this.telefono) {
    this.errorTelefono = "Teléfono es obligatorio";
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

    const patronTelefono = /^9\d{8}$/; // Expresión regular para validar número de teléfono chileno
    if (!patronTelefono.test(this.telefono)) {
      this.errorTelefono = `Teléfono inválido. 
      Debe comenzar con 9 y tener 9 dígitos.`;
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
      user: this.user,
      rut: this.rut,
      nombre: this.nombre,
      apellido: this.apellido,
      correo: this.correo,
      telefono: this.telefono,
      foto_perfil: 'assets/foto perfil.jpg', // Imagen de usuario por defecto
      contrasena: this.contrasena,
      id_rol: this.rol // Manteniendo 'rol' como un string
    };

    // Agregar el nuevo usuario a la lista
    //this.listaUsuarios.push(nuevoUsuario);

   // Llamar al servicio para registrar el usuario en la base de datos
   try {
    await this.servicesbd.registrarUsuario(nuevoUsuario);
    this.alerta_t("Registro exitoso", "Te has registrado correctamente, ahora puedes iniciar sesión");
    this.router.navigate(['/home']);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    
    // Mostrar alertas para cada error específico
    if (errorMessage.includes('El RUT ya está registrado.')) {
      this.alerta("Registro Fallido", "El RUT ingresado ya está registrado en el sistema.");
    }
    if (errorMessage.includes('El correo ya está registrado.')) {
      this.alerta("Registro Fallido", "El correo ingresado ya está registrado en el sistema.");
    }
    if (errorMessage.includes('El nombre de usuario ya está registrado.')) {
      this.alerta("Registro Fallido", "El nombre de usuario ingresado ya está registrado en el sistema.");
    }
    
    // Manejar cualquier otro error
    else {
      console.error('Error al registrar usuario: ', errorMessage);
      this.alerta("Error", "No se pudo registrar el usuario. Intenta nuevamente.");
    }
  }
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
    this.errorTelefono = '';
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
