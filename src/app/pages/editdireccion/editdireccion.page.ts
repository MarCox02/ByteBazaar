import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoute para obtener parámetros
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
import { Usuario } from 'src/app/services/usuario';
import { __param } from 'tslib';

@Component({
  selector: 'app-editdireccion',
  templateUrl: './editdireccion.page.html',
  styleUrls: ['./editdireccion.page.scss'],
})
export class EditdireccionPage implements OnInit{
  isEditMode: boolean = false; // Determina si estamos en modo de edición
  id_direccion: number | null = null; // ID 
  direcciones: any[] = [];
  rutUsuario: string = '';

  constructor(private route: ActivatedRoute,private userService: UserService, private router: Router,private servicesbd: ServicebdService) {
  }

  async ngOnInit() {
    const usuario = await this.userService.obtenerUsuario();
    if (usuario) {
      this.rutUsuario = usuario.rut;
    } else {
      this.servicesbd.presentAlert('Error', 'No se pudo obtener el RUT del usuario.');
    }
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'edit' && params['dir']) {
        this.isEditMode = true;
        this.id_direccion = +params['dir'];
        this.cargarDirecciones();
      } else {
        this.isEditMode = false;
      }
    });
  }

  // Variables del formulario
  nom_direccion!: string;
  id_comuna!: string;


    // Mensajes de error
  errordireccion: string = '';
  errorcomuna: string = '';

  async formulario() {

    // Resetear mensajes de error
    this.resetearErrores();

     // Validaciones de campos
     let hayErrores = false; // Bandera para verificar si hay errores

  // Validaciones de campos

  if (!this.id_comuna) {
    this.errorcomuna = "La Comuna es Obligatoria";
    hayErrores = true;
  }
  if (!this.nom_direccion) {
    this.errordireccion = "El nombre de la direccion es Obligatoria";
    hayErrores = true;
  }
    if (hayErrores) {
      return;
    }

    const CDireccion :any = {
      id_direccion: this.id_direccion,
      nom_direccion: this.nom_direccion,
      id_comuna: this.id_comuna
    };

    const MDireccion :any = {
      id_direccion: this.id_direccion,
      nom_direccion: this.nom_direccion,
      id_comuna: this.id_comuna
    };
  
   try {
    if(this.isEditMode){
      this.servicesbd.presentAlert('Datos de la direccion a modificar:', MDireccion);
      this.servicesbd.modificarDireccion(MDireccion,this.rutUsuario);
      this.router.navigate(['/direccion']);
    }else{
      this.servicesbd.presentAlert('Datos de la direccion a crear:', CDireccion);
      await this.servicesbd.crearDireccion(CDireccion,this.rutUsuario);
      this.router.navigate(['/direccion']);
    }
  } catch (error) {
      this.servicesbd.presentAlert('Error ', 'Error:'+ JSON.stringify(error));
    }
  }

  /* Resetear mensajes de error */
  resetearErrores() {
    this.errordireccion = '';
    this.errorcomuna = '';

  }

  /* Alertas */
  cargarDirecciones() {
    this.servicesbd.getDireccionesByRUT(this.rutUsuario)
      .then(data => {
        this.direcciones = data;
        const direccionEdit = this.direcciones.find(direccion => direccion.id_direccion === this.id_direccion);
        if (direccionEdit) {
          this.id_direccion = direccionEdit.id_direccion;  // Esto debería cargar el número correcto
          this.nom_direccion = direccionEdit.nom_direccion;
          this.id_comuna = direccionEdit.id_comuna;
        }
      }).catch(error => {
        console.log('Error al cargar las Direcciones:', error);
      });
  }
}