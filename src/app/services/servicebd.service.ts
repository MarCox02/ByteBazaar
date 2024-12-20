import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AlertController, Platform } from '@ionic/angular';
import { Usuario } from './Modelo/usuario';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { UserService } from './user.service';
import { Producto } from './Modelo/producto';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  //variable de conexion a la BD
  public database!: SQLiteObject;
  private tarjetasSubject = new BehaviorSubject<any[]>([]);
  tarjetas$ = this.tarjetasSubject.asObservable();
  private direccionesSubject = new BehaviorSubject<any[]>([]);
  direcciones$ = this.direccionesSubject.asObservable();

  constructor(private sqlite: SQLite, private platform: Platform, private alertController: AlertController,
    private nativeStorage: NativeStorage,
    private userService: UserService
  ) {
    this.crearBD();
  }

  //variables de las tablas
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol VARCHAR(5) PRIMARY KEY, nom_rol VARCHAR(20) NOT NULL);";
  tablaTipoProducto: string = "CREATE TABLE IF NOT EXISTS tipoproducto(id_tipo VARCHAR(5) PRIMARY KEY, nom_tipo VARCHAR(20) NOT NULL);";
    tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna(id_comuna VARCHAR(5) PRIMARY KEY, nom_comuna VARCHAR(20) NOT NULL, costo_envio INTEGER NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(user VARCHAR(20) UNIQUE NOT NULL, rut VARCHAR(20) PRIMARY KEY, nombre VARCHAR(40), apellido VARCHAR(40), correo VARCHAR(40) UNIQUE, telefono INTEGER, foto_perfil BLOB NOT NULL, contrasena TEXT NOT NULL, id_rol VARCHAR(5), FOREIGN KEY (id_rol) REFERENCES rol(id_rol));";
  tablaProducto: string = "CREATE TABLE IF NOT EXISTS producto(id_producto INTEGER PRIMARY KEY AUTOINCREMENT, nom_producto VARCHAR(20) NOT NULL, desc_producto TEXT, rut_v VARCHAR(20), precio NUMBER, stock INTEGER, id_tipo VARCHAR(5), FOREIGN KEY(rut_v) REFERENCES usuario(rut), FOREIGN KEY(id_tipo) REFERENCES tipoproducto(id_tipo));";

  tablaImagenProducto: string = "CREATE TABLE IF NOT EXISTS img_producto(id_producto INTEGER, imagen_prod BLOB, FOREIGN KEY (id_producto) REFERENCES producto(id_producto));";

  tablaDirecciones: string = "CREATE TABLE IF NOT EXISTS direcciones(id_direccion INTEGER PRIMARY KEY autoincrement, nom_direccion TEXT, id_comuna VARCHAR(5), rut_usuario VARCHAR(20), FOREIGN KEY(id_comuna) REFERENCES comuna(id_comuna), FOREIGN KEY(rut_usuario) REFERENCES usuario(rut));";

  tablaVenta: string = "CREATE TABLE IF NOT EXISTS venta(id_venta INTEGER PRIMARY KEY AUTOINCREMENT, rut VARCHAR(10), fecha_venta TEXT, costo_envio REAL, total number, FOREIGN KEY (rut) REFERENCES usuario(rut));";

  tablaDetalleVenta: string = "CREATE TABLE IF NOT EXISTS detalle_venta(id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, id_producto INTEGER, id_venta INTEGER, cantidad INTEGER, precio_unitario REAL, FOREIGN KEY (id_producto) REFERENCES producto(id_producto), FOREIGN KEY (id_venta) REFERENCES venta(id_venta));";

  tablaTarjetas: string = "CREATE TABLE IF NOT EXISTS tarjeta(id_tarjeta INTEGER PRIMARY KEY AUTOINCREMENT, rut_usuario VARCHAR(20), numero_tarjeta INTEGER UNIQUE NOT NULL, CVC INTEGER, FE_mes INTEGER, FE_anio INTEGER, FOREIGN KEY(rut_usuario) REFERENCES usuario(rut));";


  //variables para insert por defectos en nuestra tabla

  registroRoles: string = "INSERT OR IGNORE INTO rol(id_rol, nom_rol) VALUES ('1', 'vendedor'), ('2', 'comprador');";

  registroComunas: string = "INSERT OR IGNORE INTO comuna(id_comuna, nom_comuna, costo_envio) VALUES ('0','Otra',14000), ('1', 'Huechuraba', 5000), ('2', 'La Cisterna', 10000), ('3', 'La Reina', 6000), ('4', 'Lo Barnechea', 12000), ('5', 'Maipu', 8000), ('6', 'Providencia', 9000);";
  registroUsuario: string = "INSERT OR IGNORE INTO usuario(user, rut, nombre, apellido, correo, telefono, foto_perfil, id_rol, contrasena) VALUES ('usuario1', '12345678-9', 'Juan', 'Pérez', 'juan.perez@mail.com', 912345678, '/assets/icon/ppp.png', '1', 'Contrasena1'), ('usuario2', '22222222-2', 'John', 'Smith', 'John.smith@mail.com', 912345678, '/assets/icon/ppp.png', '2', 'Contrasena2');";
  registroTarjeta: string = "INSERT OR IGNORE INTO tarjeta(rut_usuario, numero_tarjeta, CVC, FE_mes, FE_anio) VALUES ('12345678-9','4567456745674567',666,6,2026),('22222222-2','4222222222222222',222,2,2026);";
  registroDirecciones: string =  "INSERT OR IGNORE INTO direcciones(nom_direccion, id_comuna, rut_usuario) VALUES ('Calle Alabastro 554','1','12345678-9'), ('Santo Granito 2373','1','12345678-9'), ('Santo Granito 2353','1','22222222-2'), ('La Pizarra','4','22222222-2');";
  //variables de observables para las consultas de base de datos
  listaUsuario = new BehaviorSubject<Usuario[]>([]); // Asegúrate de que tenga el tipo correcto

  //variable observable para el estado de la Base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

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
      }).catch(e=>{
        console.error('Error:', e);
      })
    })
  }

  async crearTablas() {
    try {
      // Crear las tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaTipoProducto, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaProducto, []);
      await this.database.executeSql(this.tablaImagenProducto, []);
      await this.database.executeSql(this.tablaDirecciones, []);
      await this.database.executeSql(this.tablaVenta, []);
      await this.database.executeSql(this.tablaDetalleVenta, []);
      await this.database.executeSql(this.tablaTarjetas, []);

      // Insertar tipos de productos
      const registroTiposProductos = `
      INSERT OR IGNORE INTO tipoproducto(id_tipo, nom_tipo) VALUES 
      ('1', 'Laptop'), 
      ('2', 'Accesorio'), 
      ('3', 'Monitor'), 
      ('4', 'Teclado'), 
      ('5', 'Mouse');
    `;
    await this.database.executeSql(registroTiposProductos, []);
    } catch (e) {
      console.error('Error:', e);
      return; // Si falla la creación de tablas, detener el flujo
    }
    try {
      // Insertar los registros por defecto
      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroComunas, []);
      await this.database.executeSql(this.registroUsuario, []); // Inserta el usuario por defecto
      await this.database.executeSql(this.registroTarjeta, []);
      await this.database.executeSql(this.registroDirecciones,[]);
    } catch (e) {
    }
    // Cambiar el estado de la base de datos como lista
    this.isDBReady.next(true);
  }

  async dropearTablas() {
    try {
      // Eliminar las tablas en el orden correcto (las que tienen dependencias van al final)
      await this.database.executeSql('DROP TABLE IF EXISTS detalle_venta', []);
      await this.database.executeSql('DROP TABLE IF EXISTS venta', []);
      await this.database.executeSql('DROP TABLE IF EXISTS img_producto', []);
      await this.database.executeSql('DROP TABLE IF EXISTS producto', []);
      await this.database.executeSql('DROP TABLE IF EXISTS direcciones', []);
      await this.database.executeSql('DROP TABLE IF EXISTS tarjetas', []);
      await this.database.executeSql('DROP TABLE IF EXISTS usuario', []);
      await this.database.executeSql('DROP TABLE IF EXISTS comuna', []);
      await this.database.executeSql('DROP TABLE IF EXISTS tipoproducto', []);
      await this.database.executeSql('DROP TABLE IF EXISTS rol', []);
      console.log('Todas las tablas fueron eliminadas correctamente.');
    } catch (error) {
      console.error('Error al dropear tablas: ', error);
    }
  }

  async consultarUsuario(user: string, contra: string): Promise<Usuario | null> {
    const sql = 'SELECT rut, nombre, apellido, user, telefono, foto_perfil, correo, contrasena, id_rol FROM usuario WHERE user = ? AND contrasena = ?';
    try {
        const res = await this.database.executeSql(sql, [user, contra]);
        if (res.rows.length > 0) {
            // Crea un objeto Usuario a partir de los datos recuperados
            const usuarioEncontrado: Usuario = {
                rut: res.rows.item(0).rut,
                nombre: res.rows.item(0).nombre,
                apellido: res.rows.item(0).apellido,
                user: res.rows.item(0).user,
                telefono: res.rows.item(0).telefono,
                foto_perfil: res.rows.item(0).foto_perfil,
                correo: res.rows.item(0).correo,
                contrasena: res.rows.item(0).contrasena,
                id_rol: res.rows.item(0).id_rol,
            };
            return usuarioEncontrado; // Retorna el objeto Usuario completo
        } else {
            return null; // Cambia el retorno en caso de error
        }
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Error al acceder a la base de datos.'); // Mensaje genérico para la UI
    }
  }

  // Función para verificar si un correo existe en la tabla usuario
  verificarCorreo(correo: string): Observable<boolean> {
    const query = `SELECT COUNT(*) AS count FROM usuario WHERE correo = ?`;
    
    // Convierte la promesa en un observable usando 'from'
    return from(this.database.executeSql(query, [correo])
      .then((result) => {
        // Si hay al menos una coincidencia, el correo existe
        return result.rows.item(0).count > 0;
      })
      .catch((error) => {
        console.error('Error verificando el correo:', error);
        throw new Error('Error al verificar el correo');
      })
    );
  }

  async cambiarContrasenaPorCorreo(correo: string, nuevaContrasena: string): Promise<void> {
    const sql = 'UPDATE usuario SET contrasena = ? WHERE correo = ?';
    try {
      const result = await this.database.executeSql(sql, [nuevaContrasena, correo]);
      
      if (result.rowsAffected === 0) {
        throw new Error('No se encontró el usuario con ese correo');
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  }

  async cambiarContrasena(rut: string, nuevaContrasena: string): Promise<void> {
    try {
        // Actualiza la contraseña en la tabla de usuarios
        await this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE rut = ?', [nuevaContrasena, rut]);
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw error; // Lanza el error para manejarlo más tarde
    }
}

  getTarjetasByRUT(rut: string): Promise<any[]> {
    return this.database.executeSql('SELECT * FROM tarjeta WHERE rut_usuario = ?', [rut])
      .then((res) => {
        let tarjetas: any[] | PromiseLike<any[]> = [];
        for (let i = 0; i < res.rows.length; i++) {
          tarjetas.push(res.rows.item(i));
        }
        return tarjetas;
      })
      .catch(error => {
        console.error('Error:', error);
        return [];
      });
  } 

  getDireccionesByRUT(rut: string): Promise<any[]> {
    return this.database.executeSql('SELECT * FROM direcciones LEFT JOIN comuna ON direcciones.id_comuna = comuna.id_comuna WHERE rut_usuario = ?', [rut])
      .then((res) => {
        let direcciones: any[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          direcciones.push(res.rows.item(i));
        }
        return direcciones;
      })
      .catch(error => {
        console.error('Error:', error);
        return [];
      });
  } 
  getComunaById(id_comuna: number) {
    return this.database.executeSql('SELECT * FROM comuna WHERE id_comuna = ?', [id_comuna])
      .then(res => {
        return res.rows.item(0); // Retorna la comuna
      });
  }
  getComunas():Promise<any[]>{
    return this.database.executeSql('SELECT * FROM comuna ORDER BY (comuna_id = 0), id;')
    .then((res) => {
      let comunas = [];
      for (let i = 0; i < res.rows.length; i++) {
        comunas.push(res.rows.item(i));
      }
      return comunas;
    })
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
  }
  crearTarjeta(rut:any,tarjeta:any){
    return this.database.executeSql('INSERT OR IGNORE INTO tarjeta(rut_usuario, numero_tarjeta, CVC, FE_mes, FE_anio) VALUES(?,?,?,?,?)',[rut, tarjeta.numero_tarjeta, tarjeta.CVC, tarjeta.FE_mes, tarjeta.FE_anio]).then(()=>{
      this.cargarTarjetas(rut);
    });
  }
  modificarTarjeta(tarjeta:any,rutUsuario:any){
    const sql = 'UPDATE tarjeta SET CVC = ?, FE_mes = ?, FE_anio = ? WHERE numero_tarjeta = ?';
    const params = [tarjeta.CVC, tarjeta.FE_mes, tarjeta.FE_anio, tarjeta.numero_tarjeta];
    return this.database.executeSql(sql, params).then(()=>{
      this.cargarTarjetas(rutUsuario);
    });
    
  }

  eliminarTarjeta(numero_tarjeta: any,rutUsuario:any){
    return this.database.executeSql('DELETE FROM tarjeta WHERE numero_tarjeta = ?;',[numero_tarjeta])
    .then(() => {
      this.cargarTarjetas(rutUsuario);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }


  cargarTarjetas(rutUsuario: string) {
    this.database.executeSql('SELECT * FROM tarjeta WHERE rut_usuario = ?', [rutUsuario])
      .then(data => {
        const tarjetas = [];
        for (let i = 0; i < data.rows.length; i++) {
          tarjetas.push(data.rows.item(i));
        }
        this.tarjetasSubject.next(tarjetas); // Emite las tarjetas cargadas
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  cargarDirecciones(rutUsuario: string) {
    this.database.executeSql('SELECT * FROM direcciones LEFT JOIN comuna ON direcciones.id_comuna = comuna.id_comuna WHERE rut_usuario = ?', [rutUsuario])
      .then(data => {
        const direcciones = [];
        for (let i = 0; i < data.rows.length; i++) {
          direcciones.push(data.rows.item(i));
        }
        this.direccionesSubject.next(direcciones); // Emite las direcciones cargadas
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  crearDireccion(direccion:any,rut:any){
    return this.database.executeSql('INSERT OR IGNORE INTO direcciones(nom_direccion, id_comuna, rut_usuario) VALUES (?,?,?)',[direccion.nom_direccion,direccion.id_comuna,rut]).then(()=>{
      this.cargarDirecciones(rut);
    });
  }
  modificarDireccion(direccion:any,rutUsuario:any){
    const sql = 'UPDATE direcciones SET nom_direccion = ?, id_comuna = ?, rut_usuario = ? WHERE id_direccion = ?';
    const params = [direccion.nom_direccion, direccion.id_comuna, rutUsuario, direccion.id_direccion];
    
    return this.database.executeSql(sql, params).then(()=>{
      this.cargarDirecciones(rutUsuario);
    });

  }
  eliminarDireccion(id_direccion: any,rutUsuario:any){
    return this.database.executeSql('DELETE FROM direcciones WHERE id_direccion = ?;',[id_direccion])
    .then(() => {
      this.cargarDirecciones(rutUsuario);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  
  async resetearBaseDeDatos() {
    await this.dropearTablas();   // Elimina las tablas
    await this.crearTablas();     // Crea las tablas nuevamente
  }

//USUARIOS

  async verUsuario() {
    try {
        const res = await this.database.executeSql('SELECT * FROM usuario', []);
        const usuarios: Usuario[] = []; // Array para almacenar los usuarios

        if (res.rows.length > 0) {
            for (let i = 0; i < res.rows.length; i++) {
                const usuario: Usuario = {
                    user: res.rows.item(i).user,
                    rut: res.rows.item(i).rut,
                    nombre: res.rows.item(i).nombre,
                    apellido: res.rows.item(i).apellido,
                    correo: res.rows.item(i).correo,
                    telefono: res.rows.item(i).telefono.toString(), // Asegúrate de que sea un string
                    foto_perfil: res.rows.item(i).foto_perfil,
                    contrasena: '', // Este campo no se recupera de la base de datos
                    id_rol: res.rows.item(i).id_rol
                };
                usuarios.push(usuario);
            }
            this.listaUsuario.next(usuarios); // Enviar la lista de usuarios a BehaviorSubject
        }
    } catch (error) {
      console.error('Error:', error);
    }
}

async registrarUsuario(usuario: Usuario): Promise<any> {
  try {
    // Inicializar un array para almacenar mensajes de error
    const errores: string[] = [];

    // Verificar si el RUT ya está registrado
    const queryRut = 'SELECT COUNT(*) as count FROM usuario WHERE rut = ?';
    const resultRut = await this.database.executeSql(queryRut, [usuario.rut]);
    if (resultRut.rows.item(0).count > 0) {
      errores.push('El RUT ya está registrado.');
    }

    // Verificar si el correo ya está registrado
    const queryCorreo = 'SELECT COUNT(*) as count FROM usuario WHERE correo = ?';
    const resultCorreo = await this.database.executeSql(queryCorreo, [usuario.correo]);
    if (resultCorreo.rows.item(0).count > 0) {
      errores.push('El correo ya está registrado.');
    }

    // Verificar si el nombre de usuario ya está registrado
    const queryUser = 'SELECT COUNT(*) as count FROM usuario WHERE user = ?';
    const resultUser = await this.database.executeSql(queryUser, [usuario.user]);
    if (resultUser.rows.item(0).count > 0) {
      errores.push('El nombre de usuario ya está registrado.');
    }

    // Si hay errores, lanzar un error que contenga todos los mensajes
    if (errores.length > 0) {
      throw new Error(errores.join(' ')); // Unir mensajes con un espacio
    }

    // Si no está registrado, inserta el nuevo usuario
    const insertQuery = `
      INSERT INTO usuario (user, rut, nombre, apellido, correo, telefono, foto_perfil, contrasena, id_rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await this.database.executeSql(insertQuery, [
      usuario.user,
      usuario.rut,
      usuario.nombre,
      usuario.apellido,
      usuario.correo,
      usuario.telefono,
      usuario.foto_perfil,
      usuario.contrasena,
      usuario.id_rol
    ]);

    // Después de registrar, llama a verUsuario para actualizar la lista
    await this.verUsuario();

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}



async verificarNombreUsuario(nombreUsuario: string, rut: string): Promise<boolean> {
  const query = `SELECT COUNT(*) AS count FROM usuario WHERE user = ? AND rut != ?`;
  const valores = [nombreUsuario, rut];

  const res = await this.database.executeSql(query, valores);
  const count = res.rows.item(0).count;

  return count > 0; // Retorna true si el nombre de usuario ya está en uso
}

async actualizarUsuario(usuario: Usuario): Promise<void> {
  const nombreUsuarioExiste = await this.verificarNombreUsuario(usuario.user, usuario.rut);
  
  if (nombreUsuarioExiste) {
    // Lanza un error específico si el nombre de usuario ya está en uso
    throw new Error('El nombre de usuario ya existe');
  }

  const query = `
    UPDATE usuario 
    SET correo = ?, 
        user = ?, 
        foto_perfil = ?, 
        id_rol = ?
    WHERE rut = ?`;

  const valores = [
    usuario.correo,
    usuario.user,
    usuario.foto_perfil,
    usuario.id_rol,
    usuario.rut
  ];

  try {
    await this.database.executeSql(query, valores);
    console.log('Usuario actualizado correctamente en la base de datos.');
  } catch (error) {
    console.error('Error al actualizar el usuario en la base de datos:', error);
    throw error;
  }
}

async eliminarUsuario(rut: string): Promise<void> {
  try {
    const query = `DELETE FROM usuario WHERE rut = ?`;
    await this.database.executeSql(query, [rut]);
    console.log(`Usuario con RUT ${rut} eliminado exitosamente.`);
  } catch (error) {
    console.error(`Error al eliminar el usuario con RUT ${rut}:`, error);
    throw new Error('Error al eliminar el usuario. Intenta nuevamente.');
  }
}
//Producto

async registrarProducto(producto: Producto): Promise<any> {
  try {
    if (!producto.rut_v) {
      return Promise.reject('RUT no definido');
    }

    const insertQuery = `
      INSERT INTO producto (nom_producto, desc_producto, precio, stock, id_tipo, rut_v)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const imagenInsertQuery = `
      INSERT INTO img_producto (id_producto, imagen_prod)
      VALUES (?, ?)
    `;

    const result = await this.database.executeSql(insertQuery, [
      producto.nom_producto,
      producto.desc_producto,
      producto.precio,
      producto.stock,
      producto.id_tipo,
      producto.rut_v
    ]);

    const productId = result.insertId;

    if (producto.imagen) {
      await this.database.executeSql(imagenInsertQuery, [productId, producto.imagen]);
    }

    return Promise.resolve();
  } catch (error) {
    console.error('Error:', error); // Log detallado
    return Promise.reject(error);
  }
}

async actualizarProducto(producto: Producto): Promise<void> {
  try {
    // Verificar que el producto tenga un ID válido
    if (!producto.id_producto) {
      return Promise.reject('ID no definido');
    }

    // Actualizar la información del producto en la tabla producto
    const updateQuery = `
      UPDATE producto
      SET nom_producto = ?, desc_producto = ?, precio = ?, stock = ?, id_tipo = ?, rut_v = ?
      WHERE id_producto = ?
    `;

    const updateValues = [
      producto.nom_producto,
      producto.desc_producto,
      producto.precio,
      producto.stock,
      producto.id_tipo,
      producto.rut_v, // Asegúrate de incluir el RUT aquí
      producto.id_producto
    ];

    await this.database.executeSql(updateQuery, updateValues);

    // Actualizar la imagen en la tabla img_producto
    if (producto.imagen) {
      const imagenUpdateQuery = `
        UPDATE img_producto
        SET imagen_prod = ?
        WHERE id_producto = ?
      `;

      await this.database.executeSql(imagenUpdateQuery, [producto.imagen, producto.id_producto]);
    }

    return Promise.resolve();
  } catch (error) {
    console.error('Error en actualizarProducto:', error);
    return Promise.reject(error);
  }
}

async eliminarProducto(idProducto: number): Promise<void> {
  try {
    // Primero, eliminar las imágenes asociadas en la tabla img_producto
    const eliminarImagenQuery = `
      DELETE FROM img_producto WHERE id_producto = ?
    `;
    await this.database.executeSql(eliminarImagenQuery, [idProducto]);

    // Ahora, eliminar el producto de la tabla producto
    const eliminarProductoQuery = `
      DELETE FROM producto WHERE id_producto = ?
    `;
    await this.database.executeSql(eliminarProductoQuery, [idProducto]);

    return Promise.resolve();
  } catch (error) {
    console.error('Error en eliminarProducto:', error); // Log detallado
    return Promise.reject(error);
  }
}

async verProductos(): Promise<Producto[]> {
  try {
    const res = await this.database.executeSql(`
      SELECT p.*, i.imagen_prod, t.nom_tipo, u.user 
      FROM producto p 
      LEFT JOIN img_producto i ON p.id_producto = i.id_producto
      LEFT JOIN tipoproducto t ON p.id_tipo = t.id_tipo
      LEFT JOIN usuario u ON p.rut_v = u.rut
      WHERE p.stock > 0;
    `, []);
    
    const productos: Producto[] = [];

    for (let i = 0; i < res.rows.length; i++) {
      const item = res.rows.item(i);

      const producto: Producto = {
        id_producto: item.id_producto,
        nom_producto: item.nom_producto,
        desc_producto: item.desc_producto,
        stock: item.stock,
        precio: item.precio,
        id_tipo: item.id_tipo,
        rut_v: item.rut_v,
        imagen: item.imagen_prod, // Ahora la imagen se obtiene directamente
        nom_tipo: item.nom_tipo, // Aquí agregas el nombre del tipo
        usuario_vendedor: item.user // Agrega el nombre del vendedor aquí
      };

      productos.push(producto);
    }
    return productos;
  } catch (error) {
    console.error('Error al ver productos:', error);
    return []; // Retorna un array vacío en caso de error
  }
}
async obtenerImagen(id_producto: number): Promise<string | null> {
  try {
    const res = await this.database.executeSql('SELECT imagen_prod FROM img_producto WHERE id_producto = ?', [id_producto]);
    if (res.rows.length > 0) {
      return res.rows.item(0).imagen_prod; // Retorna la imagen
    }
    return null; // Retorna null si no hay imagen
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null; // Retorna null en caso de error
  }
}

async verProductosPorVendedor(rutVendedor: string | null): Promise<Producto[]> {
  if (!rutVendedor) {
    throw new Error("El RUT del vendedor no puede ser nulo.");
  }

  const query = `
    SELECT p.*, i.imagen_prod, t.nom_tipo, u.user
    FROM producto p
    LEFT JOIN img_producto i ON p.id_producto = i.id_producto
    LEFT JOIN tipoproducto t ON p.id_tipo = t.id_tipo
    LEFT JOIN usuario u ON p.rut_v = u.rut  -- Unión con la tabla de usuarios
    WHERE p.rut_v = ?
  `;

  try {
    const result = await this.database.executeSql(query, [rutVendedor]);

    const productos: Producto[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      const item = result.rows.item(i);

      const producto: Producto = {
        id_producto: item.id_producto,
        nom_producto: item.nom_producto,
        desc_producto: item.desc_producto,
        stock: item.stock,
        precio: item.precio,
        id_tipo: item.id_tipo,
        rut_v: item.rut_v,
        imagen: item.imagen_prod, // Obtiene la imagen desde la tabla img_producto
        nom_tipo: item.nom_tipo,
        usuario_vendedor: item.user // Agrega el nombre del vendedor aquí
      };

      productos.push(producto);
    }
    return productos;
  } catch (error) {
    console.error('Error: ', error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
}
async crearVenta(rut: string, fecha: string, costo_envio: number, total: number) {
  const sql = `
    INSERT INTO venta (rut, fecha_venta, costo_envio, total) 
    VALUES (?, ?, ?, ?);
  `;
  return this.database.executeSql(sql, [rut, fecha, costo_envio, total])
    .then((result: any) => {
      return result.insertId; // Devuelve el ID de la boleta recién creada
    });
}

async agregarDetalleVenta(id_venta: number, productos: any[]) {
  const sql = `
    INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) 
    VALUES (?, ?, ?, ?);
  `;
  
  for (const producto of productos) {
    await this.database.executeSql(sql, [id_venta, producto.id_producto, producto.cantidad, producto.precio]);
  }
}


async obtenerHistorialComprasPaginado(rut: string, limite: number, offset: number): Promise<any[]> {
  const sql = `SELECT v.id_venta, v.fecha_venta, v.total, 
                      dv.id_producto, dv.cantidad, dv.precio_unitario, 
                      p.nom_producto, p.id_tipo, 
                      ip.imagen_prod 
             FROM venta v
             INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
             INNER JOIN producto p ON dv.id_producto = p.id_producto
             LEFT JOIN img_producto ip ON p.id_producto = ip.id_producto
             WHERE v.rut = ?
             ORDER BY v.id_venta ASC, dv.id_producto ASC
             LIMIT ? OFFSET ?`;

  try {
    const result = await this.database.executeSql(sql, [rut, limite, offset]);
    const historial: any[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      const compra = result.rows.item(i);

      // Busca si la venta ya existe en el historial
      let venta = historial.find(v => v.id_venta === compra.id_venta);

      // Si la venta no existe, la crea y la añade al historial
      if (!venta) {
        venta = {
          id_venta: compra.id_venta,
          fecha_venta: compra.fecha_venta,
          total: compra.total,
          detalles: []
        };
        historial.push(venta);
      }

      // Añade el detalle del producto a la venta correspondiente
      venta.detalles.push({
        id_producto: compra.id_producto,
        nom_producto: compra.nom_producto,
        cantidad: compra.cantidad,
        precio_unitario: compra.precio_unitario,
        imagen_producto: compra.imagen_prod || 'url_default_image'
      });
    }

    return historial; // Retorna las ventas agrupadas con sus productos
  } catch (error) {
    console.error('Error: ', error);
    throw error; // Lanza el error para manejarlo en el lugar donde se llama
  }
}
async obtenerHistorialVentasPaginado(rut: string, limite: number, offset: number): Promise<any[]> {
  const sql = `SELECT v.id_venta, v.fecha_venta, v.total, 
                      dv.id_producto, dv.cantidad, dv.precio_unitario, 
                      p.nom_producto, p.id_tipo, 
                      ip.imagen_prod, u.nombre AS comprador_nombre
               FROM venta v
               INNER JOIN detalle_venta dv ON v.id_venta = dv.id_venta
               INNER JOIN producto p ON dv.id_producto = p.id_producto
               LEFT JOIN img_producto ip ON p.id_producto = ip.id_producto
               INNER JOIN usuario u ON v.rut = u.rut
               WHERE p.rut_v = ?  -- Filtramos solo los productos del vendedor
               ORDER BY v.id_venta ASC, dv.id_producto ASC
               LIMIT ? OFFSET ?`;

  try {
    const result = await this.database.executeSql(sql, [rut, limite, offset]);
    const historial: any[] = [];

    for (let i = 0; i < result.rows.length; i++) {
      const venta = result.rows.item(i);

      // Busca si la venta ya existe en el historial
      let ventaExistente = historial.find(v => v.id_venta === venta.id_venta);

      // Si no existe, la crea
      if (!ventaExistente) {
        ventaExistente = {
          id_venta: venta.id_venta,
          fecha_venta: venta.fecha_venta,
          total: venta.total,
          comprador: venta.comprador_nombre, // Nombre del comprador
          detalles: []
        };
        historial.push(ventaExistente);
      }

      // Añade el detalle del producto a la venta correspondiente
      ventaExistente.detalles.push({
        id_producto: venta.id_producto,
        nom_producto: venta.nom_producto,
        cantidad: venta.cantidad,
        precio_unitario: venta.precio_unitario,
        imagen_producto: venta.imagen_prod || 'url_default_image'
      });
    }
    return historial;
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}



async obtenerTiposProducto(): Promise<{ id_tipo: string; nom_tipo: string }[]> {
  const sql = `SELECT id_tipo, nom_tipo FROM tipoproducto`; // Consulta para obtener tipos de productos
  const result = await this.database.executeSql(sql, []);
  const tipos = [];
  for (let i = 0; i < result.rows.length; i++) {
    tipos.push(result.rows.item(i));
  }
  return tipos;
}

async obtenerProductoPorId(idProducto: number): Promise<Producto | null> {
  const query = `
    SELECT p.*, i.imagen_prod, t.nom_tipo, u.user
    FROM producto p
    LEFT JOIN img_producto i ON p.id_producto = i.id_producto
    LEFT JOIN tipoproducto t ON p.id_tipo = t.id_tipo
    LEFT JOIN usuario u ON p.rut_v = u.rut  -- Unir con la tabla de usuarios
    WHERE p.id_producto = ?;
  `;
  
  const result = await this.database.executeSql(query, [idProducto]);
  
  if (result.rows.length > 0) {
    const item = result.rows.item(0);
    return {
      id_producto: item.id_producto,
      nom_producto: item.nom_producto,
      desc_producto: item.desc_producto,
      precio: item.precio,
      stock: item.stock,
      id_tipo: item.id_tipo,
      imagen: item.imagen_prod, // Asegurar que se obtiene la imagen correcta
      rut_v: item.rut_v,
      nom_tipo: item.nom_tipo, // Incluir el nombre del tipo de producto
      usuario_vendedor: item.user // Agregar el nombre del vendedor aquí
    };
  }
  return null; // Devolver null si no se encuentra el producto
}
  async sumarStock(id_producto:number, cnt:number){
    const query = 'SELECT * FROM producto where id_producto = ?;';
    const result = await this.database.executeSql(query, [id_producto]);
    const stock = result.rows.item(0).stock;
    const newStock = stock + cnt;
    return this.database.executeSql('UPDATE producto SET stock = ? WHERE id_producto = ?',[newStock,id_producto])

  }

  async obtenerVentas(rut_usuario:any) {
    const query = 'SELECT id_venta, fecha_venta, total FROM venta WHERE rut = ?';
    const res = await this.database.executeSql(query, [rut_usuario]);
    let ventas = [];
    for (let i = 0; i < res.rows.length; i++) {
      ventas.push(res.rows.item(i));
    }
    return ventas;
  }

  async obtenerDetalleBoleta(id_venta: number) {
    const query = `SELECT * FROM detalle_venta LEFT JOIN producto ON producto.id_producto = detalle_venta.id_producto, LEFT JOIN img_producto ON img_producto.id_producto = producto.id_producto WHERE id_venta = ?`;
    const res = await this.database.executeSql(query, [id_venta]);
    let detalles = [];
    for (let i = 0; i < res.rows.length; i++) {
      detalles.push(res.rows.item(i));
    }
    return detalles;
  }

  async restarStock(id_producto:number, cnt:number){
    const query = 'SELECT * FROM producto where id_producto = ?;';
    const result = await this.database.executeSql(query, [id_producto]);
    const stock = result.rows.item(0).stock;
    const newStock = stock - cnt;
    return this.database.executeSql('UPDATE producto SET stock = ? WHERE id_producto = ?',[newStock,id_producto])
  }
  obtenerFecha() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
    
    const newfecha = `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
    return newfecha;
  }




  fetchUsuarios(): Observable<Usuario[]> {
    const sql = 'SELECT * FROM usuario';
    return new Observable(observer => {
      this.database.executeSql(sql, []).then(res => {
        const usuarios: Usuario[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          usuarios.push(res.rows.item(i));
        }
        observer.next(usuarios);
        observer.complete();
      }).catch(err => observer.error(err));
    });
  }


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
