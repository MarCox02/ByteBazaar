import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-historial-compras',
  templateUrl: './historial-compras.page.html',
  styleUrls: ['./historial-compras.page.scss'],
})
export class HistorialComprasPage implements OnInit {
  historialCompleto: any[] = [];
  historialCompras: any[] = [];
  rutUsuario: string = ''; 
  cargando: boolean = true;
  limite: number = 7; // Cantidad de productos a cargar por vez
  offset: number = 0; // Controla desde dónde cargar en la base de datos


  constructor(private servicebd: ServicebdService,
    private userService: UserService, private menuCtrl: MenuController) {}

    async ngOnInit() {
      const usuario = await this.userService.obtenerUsuario();
      if (usuario) {
        this.rutUsuario = usuario.rut;
        await this.cargarHistorialCompras(true); // Carga inicial
      }
    }
  
  async cargarHistorialCompras(inicial: boolean = false) {
  this.cargando = true;

  try {
    // Llamada al servicio para obtener un rango de productos
    const compras = await this.servicebd.obtenerHistorialComprasPaginado(this.rutUsuario, this.limite, this.offset);
    
    if (inicial) {
      this.historialCompras = compras; // Carga inicial
    } else {
      this.historialCompras = [...this.historialCompras, ...compras]; // Añade más productos al historial existente
    }

    // Actualizamos el offset solo si hemos recibido productos
    if (compras.length > 0) {
      this.offset += this.limite;
    }

    // Verificamos si aún hay más productos para cargar
    if (compras.length < this.limite) {
      // Si la cantidad de productos cargados es menor que el límite,
      // significa que no hay más productos para cargar.
      this.cargando = false;
    }
  } catch (error) {
    console.error('Error al cargar el historial de compras:', error);
  }
  this.cargando = false;
}
    // Método para cargar más productos al hacer clic en el botón "Cargar más"
    cargarMas() {
      this.cargarHistorialCompras();
    }
  }