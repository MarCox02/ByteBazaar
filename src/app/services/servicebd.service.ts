import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexion a la BD
  public database!: SQLiteObject;

  //variables de las tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol VARCHAR(5) PRIMARY KEY, nom_rol VARCHAR(20) NOT NULL);";
  tablaTipoProducto: string = "CREATE TABLE IF NOT EXISTS tipoproducto(id_tipo VARCHAR(5) PRIMARY KEY, nom_tipo VARCHAR(20) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna VARCHAR(5) PRIMARY KEY, nom_comuna VARCHAR(20) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(rut VARCHAR(20) PRIMARY KEY, user VARCHAR(20) UNIQUE NOT NULL,\
  nombre VARCHAR(40), apellido VARCHAR(40), correo VARCHAR(40) UNIQUE, telefono VARCHAR(12),foto_perfil BLOB NOT NULL,\
  id_rol VARCHAR(5), direccion VARCHAR(40), id_comuna(5),FOREIGN KEY (id_rol) REFERENCES rol(id_rol),FOREIGN KEY (id_comuna) REFERENCES\
  id_comuna(id_comuna));";

  //falta producto, img producto, venta y su detalle

  //variables de observables para las consultas de base de datos
  listaUsuario = new BehaviorSubject([]);

  //variable observable para el estado de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);



  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController) {
    this.crearBD();
  }

  crearBD(){
    //verificar si la plataforma esta lista
    this.platform.ready().then(()=>{
      //crear la base de datos
      this.sqlite.create({
        name: 'bdnoticia.db',
        location: 'default'
      }).then((bd: SQLiteObject)=>{
        //guardar la conexion
        this.database = bd;
        //llamar a la funcion de crear tablas
        this.crearTablas();
        //modificar el estatus de la base de datos
        this.isDBReady.next(true);
      }).catch(e=>{
        this.presentAlert('Crear BD', 'Error: ' + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{

      await this.database.executeSql(this.tablaRol, []);

      await this.database.executeSql(this.tablaTipoProducto, []);

      await this.database.executeSql(this.tablaComuna, []);

      await this.database.executeSql(this.tablaUsuario, []);

    }catch(e){
      this.presentAlert('Crear Tablas', 'Error: ' + JSON.stringify(e));
    }
  }

//no hay fetch, lo quite por no tener la clase noticias aca

  dbState(){
    return this.isDBReady.asObservable();
  }

  async presentAlert(titulo:string, msj:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
