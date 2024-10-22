import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute para obtener parámetros
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';
import { __param } from 'tslib';

@Component({
  selector: 'app-edittarjeta',
  templateUrl: './edittarjeta.page.html',
  styleUrls: ['./edittarjeta.page.scss'],
})
export class EdittarjetaPage implements OnInit {
  isEditMode: boolean = false; // Determina si estamos en modo de edición
  tarjetaId: number | null = null; // ID de la tarjeta a editar, si corresponde
  tarjetas: any[] = [];
  rutUsuario: string = '';

  constructor(private route: ActivatedRoute,private userService: UserService, private router: Router,private servicesbd: ServicebdService) {
  }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
    } else {
      console.error('Error: ', '');
    }
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'edit' && params['tar']) {
        this.isEditMode = true;
        this.tarjetaId = +params['tar'];
        this.cargarTarjetas();
      } else {
        this.isEditMode = false;
      }
    });
  }

  // Variables del formulario
  numero_tarjeta!: string;
  CVC!: string;
  FE_mes!:  string;
  FE_anio!: string;


    // Mensajes de error
  errornum_tarjeta: string = '';
  errorCVC: string = '';
  errorFE_anio: string = '';
  errorFE_mes: string = '';


  async formulario() {

    // Resetear mensajes de error
    this.resetearErrores();

     // Validaciones de campos
     let hayErrores = false; // Bandera para verificar si hay errores

  // Validaciones de campos
  if (!this.numero_tarjeta && !this.isEditMode) {
    this.errornum_tarjeta = "El numero de Tarjeta es Obligatorio";
    hayErrores = true;
  }
  if (!this.CVC) {
    this.errorCVC = "el CVC es Obligatorio";
    hayErrores = true;
  }
  if (!this.FE_anio) {
    this.errorFE_anio = "El Año es CVCobligatorio";
    hayErrores = true;
  }
  if (!this.FE_mes) {
    this.errorFE_mes = "El Mes es obligatorio";
    hayErrores = true;
  }
  // Validar si hay errores antes de continuar
  if (hayErrores) {
    return; // Si hay errores, no continuar
  }

    const patrontarjeta = /^[0-9]{16}$/;
    if(this.isEditMode){this.numero_tarjeta = String(this.tarjetaId)}
    this.numero_tarjeta = this.numero_tarjeta.replace(/\./g, '').replace(/-/g, '').replace(/ /g, '');
    if (!patrontarjeta.test(this.numero_tarjeta)) {
      this.errornum_tarjeta = "Por favor, un numero de tarjeta valido.";
      hayErrores = true;
    }
    const patronCVC = /^[0-9]{3}$/; 
    if (!patronCVC.test(this.CVC)) {
      this.errorCVC = "CVC invalido. debe tener ser un codigo de 3 digitos.";
      hayErrores = true;
    }

    const patronFE_mes = /^[0-9]{1,2}$/; 
    if (!patronFE_mes.test(this.FE_mes)) {
      this.errorFE_mes= "Mes invalido, Como maximo debe tener 2 digitos";
      hayErrores = true;
    }
    if(Number(this.FE_mes) < 1 || Number(this.FE_mes) > 12){
      this.errorFE_mes= "Mes invalido, tiene que estar entre 1 y 12";
      hayErrores = true;
    }
    const patronFE_anio = /^[0-9]{4}$/;
    if (!patronFE_anio.test(this.FE_anio)) {
      this.errorFE_anio= "Año invalido, tiene que tener 4 digitos";
      hayErrores = true;
    }
    if(Number(this.FE_anio) < 2024 || Number(this.FE_anio) > 2080){
      this.errorFE_anio= "Año invalido, tiene que encontrase entre 2024 y 2080";
      hayErrores = true;
    }

    if (hayErrores) {
      return;
    }


    const Ctarjeta :any = {
      numero_tarjeta: this.numero_tarjeta,
      CVC: this.CVC,
      FE_mes: this.FE_mes,
      FE_anio: this.FE_anio
    };
    const Mtarjeta :any = {
      numero_tarjeta: String(this.tarjetaId),
      CVC: this.CVC,
      FE_mes: this.FE_mes,
      FE_anio: this.FE_anio
    };
   // tiene que tener rut, tarjeta.numero_tarjeta, tarjeta.CVC, tarjeta.FE_mes, tarjeta.FE_anio para crear la tarjeta
   try {
    if(this.isEditMode){
      this.servicesbd.presentAlert('Datos de la tarjeta a modificar:', Mtarjeta);
      this.servicesbd.modificarTarjeta(Mtarjeta,this.rutUsuario);
      this.router.navigate(['/tarjeta']);
    }else{
      this.servicesbd.presentAlert('Datos de la tarjeta a modificar:', Ctarjeta);
      await this.servicesbd.crearTarjeta(this.rutUsuario,Ctarjeta);
      this.router.navigate(['/tarjeta']);
    }
  } catch (error) {
      this.servicesbd.presentAlert('Error ', 'Error:'+ JSON.stringify(error));
    }
  }

  /* Resetear mensajes de error */
  resetearErrores() {
    this.errornum_tarjeta = '';
    this.errorCVC = '';
    this.errorFE_anio= '';
    this.errorFE_mes = '';
    
  }

  /* Alertas */
  // Cargar tarjeta para edición
  cargarTarjetas() {
    this.servicesbd.getTarjetasByRUT(this.rutUsuario)
      .then(data => {
        this.tarjetas = data;
        const tarjetaEdit = this.tarjetas.find(tarjeta => tarjeta.numero_tarjeta === this.tarjetaId);
        if (tarjetaEdit) {
          this.numero_tarjeta = tarjetaEdit.numero_tarjeta;  // Esto debería cargar el número correcto
          this.CVC = tarjetaEdit.CVC;
          this.FE_mes = tarjetaEdit.FE_mes;
          this.FE_anio = tarjetaEdit.FE_anio;
        }
      }).catch(error => {
        console.log('Error al cargar las tarjetas:', error);
      });
  }
}