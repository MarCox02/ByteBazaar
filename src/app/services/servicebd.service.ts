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
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol VARCHAR (5) PRIMARY KEY, nom_rol VARCHAR(20) NOT NULL);";
  tablaTipoProducto: string = "CREATE TABLE IF NOT EXISTS tipoproducto(id_tipo VARCHAR(5) PRIMARY KEY, nom_tipo VARCHAR(20) NOT NULL);";
  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna VARCHAR(5) PRIMARY KEY, nom_comuna VARCHAR(20) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(rut VARCHAR(20) PRIMARY KEY, user VARCHAR (20) UNIQUE NOT NULL,nombre VARCHAR(40), apellido VARCHAR (40), correo VARCHAR(40) UNIQUE, telefono VARCHAR(12),foto_perfil TEXT NOT NULL,id_rol VARCHAR(5), direccion TEXT, id_comuna VARCHAR(5),FOREIGN KEY (id_rol) REFERENCES rol(id_rol),FOREIGN KEY (id_comuna) REFERENCES comuna(id_comuna));";

  //falta producto, img producto, venta y su detalle
  tablaProductos: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY, nom_producto VARCHAR(20) NOT NULL,desc_producto TEXT ,rut_v VARCHAR(10), precio REAL,stock INTEGER, id_tipo VARCHAR(10),FOREIGN KEY(rut_v) REFERENCES vendedores(rut_v))";

  tablaImagenProducto: string = "CREATE TABLE IF NOT EXISTS img_productos(id_producto INTEGER, imagen_prod TEXT, FOREIGN KEY (id_producto) REFERENCES producto(id_producto));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta (id_venta INTEGER PRIMARY KEY, rut_c VARCHAR(10), rut_v VARCHAR(10), fecha_venta DATE, total REAL,  FOREIGN KEY (rut_c) REFERENCES usuario(rut),FOREIGN KEY (rut_v) REFERENCES usuario(rut));";

  tablaDetalleVenta: string = "CREATE TABLE IF NOT EXISTS detalle_venta (id_detalle INTEGER PRIMARY KEY, id_producto INTEGER, id_venta INTEGER, cantidad INTEGER, precio_unitario REAL, FOREIGN KEY (id_producto) REFERENCES producto(id_producto),FOREIGN KEY (id_venta) REFERENCES venta(id_venta));";

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
        name: 'Bytebazaar .db',
        location: 'default'
      }).then((bd: SQLiteObject)=>{
        //guardar la conexion
        this.database = bd;
        //llamar a la funcion de crear tablas
        this.crearTablas();
        //modificar el estatus de la base de datos
        this.isDBReady.next(true);
        this.presentAlert('Éxito', 'La base de datos se creó correctamente.');
      }).catch(e=>{
        this.presentAlert('Crear BD', 'Error en crear la BD: ' + JSON.stringify(e));
      })
    })
  }

  async crearTablas(){
    try{

      await this.database.executeSql(this.tablaRol, []);

      await this.database.executeSql(this.tablaTipoProducto, []);

      await this.database.executeSql(this.tablaComuna, []);

      await this.database.executeSql(this.tablaUsuario, []);

      await this.database.executeSql(this.tablaProductos, []);

      await this.database.executeSql(this.tablaImagenProducto, []);

      await this.database.executeSql(this.tablaVenta, []);

      await this.database.executeSql(this.tablaDetalleVenta, []);


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
