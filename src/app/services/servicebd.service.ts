import { Injectable } from '@angular/core'; 
import { SQLiteObject, SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Vehiculo } from '../models/vehiculo';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';





@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  getData(): Observable<any> {
    return of('real data');  
  }
  
  http: any;
  public database!: SQLiteObject;

  tablaVehiculo: string = `CREATE TABLE IF NOT EXISTS vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT, marca TEXT, modelo TEXT, km INTEGER, combustible TEXT, transmision TEXT, precio REAL, foto TEXT);`;
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY NOT NULL, nom_rol VARCHAR(20) NOT NULL)";
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nom_estado VARCHAR(20) NOT NULL)";
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY NOT NULL, nomb_categoria VARCHAR(20) NOT NULL)";
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, pnombre VARCHAR(20) NOT NULL, apellido VARCHAR(30) NOT NULL,nom_usuario VARCHAR(30) NOT NULL UNIQUE, correo VARCHAR(40) NOT NULL UNIQUE,contrasena VARCHAR(16), id_rol INTEGER, foto TEXT,FOREIGN KEY (id_rol) REFERENCES rol(id_rol))`;
  

  registroRolA: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (1, 'Admin')";
  registroRolU: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (2, 'Usuario')";
  registroAdmin: string = "INSERT OR IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (1,'juan', 'iribarren','Yeipy', 'yeipy@gmail.com', '123456@Lol', 1)";
  registroUsuario: string = "INSERT OR IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (2,'karla', 'barrientos','Karli', 'karli@gmail.com', 'Karli1234.', 2)";

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private usuarioBD = new BehaviorSubject<User | null>(null);
  nativeStorage: any;

  constructor(
    private router: Router,
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
  ) {
    this.crearBD();
  }

  public getDatabase(): Promise<SQLiteObject> {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
  }

  crearBD() {
    this.platform.ready().then(() => {
      console.log('Base de datos lista');
      this.sqlite.create({
        name: 'bdSubasta.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas().then(() => {
          this.verificarTablass();
        });
      }).catch(e => {
        this.presentAlert('CrearBD', 'Error: ' + JSON.stringify(e));
      });
    }).catch(e => {
      this.presentAlert('Platform Ready', 'Error: ' + JSON.stringify(e));
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.registroRolA, []);
      await this.database.executeSql(this.registroRolU, []);
      await this.database.executeSql(this.registroAdmin, []);
      await this.database.executeSql(this.tablaVehiculo, []);
      console.log('Todas las tablas creadas correctamente.');
    } catch (e) {
      console.error('Error al crear las tablas: ', e); 
      this.presentAlert('CrearTabla', 'Error: ' + JSON.stringify(e));
    }
  }

  logoutUsuario() {
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nom_usuario');
    localStorage.removeItem('id_usuario');
  }

  initializeDatabase() {
    return this.database.executeSql(this.tablaRol, []).then(() => {
      return this.database.executeSql(this.tablaUsuario, []);
    }).then(() => {
      return this.database.executeSql(this.registroRolA, []);
    }).then(() => {
      return this.database.executeSql(this.registroAdmin, []);
    }).then(() => {
      return this.database.executeSql(this.registroUsuario, []);
    });
  }
  
  async crearTablasAuto() {
    try {
      const sql = `CREATE TABLE IF NOT EXISTS vehiculos (id INTEGER PRIMARY KEY AUTOINCREMENT,marca TEXT,modelo TEXT,km INTEGER,combustible TEXT,transmision TEXT,precio REAL,foto TEXT)`;
      await this.database.executeSql(sql, []);
      console.log('Tabla vehiculos creada correctamente'); 
    } catch (e) {
      console.error('Error al crear la tabla vehiculos: ', e);
      this.presentAlert('CrearTablAuto', 'Error: ' + JSON.stringify(e));
    }
  };

  async updateUserPhoto(id_usuario: number, photo: string) {
    const sql = 'UPDATE usuarios SET foto = ? WHERE id_usuario = ?';
    return this.database.executeSql(sql, [photo, id_usuario]).then(res => {
      if (res.rowsAffected > 0) {
        console.log('Foto actualizada correctamente.');
      } else {
        console.error('No se encontró el usuario para actualizar la foto.');
      }
    }).catch(e => {
      console.error('Error al actualizar la foto', e);
      throw e; 
    });
  };

  esAdmin(): boolean {
    const idRol = localStorage.getItem('id_rol');
    return idRol === '1'; 
  }
// subastas pero para ver que personas se logea
  async obtenerUsuarioPorId(id_usuario: number): Promise<Usuario> {
    const sql = 'SELECT id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol, foto_perfil FROM usuario WHERE id_usuario = ?';
    try {
      const res = await this.database.executeSql(sql, [id_usuario]);
      if (res.rows.length > 0) {
        const usuario = res.rows.item(0);
        const usuarioObj = new Usuario();
        usuarioObj.id_usuario = usuario.id_usuario;
        usuarioObj.pnombre = usuario.pnombre;
        usuarioObj.apellido = usuario.apellido;
        usuarioObj.nom_usuario = usuario.nom_usuario;
        usuarioObj.correo = usuario.correo;
        usuarioObj.contrasena = usuario.contrasena;
        usuarioObj.id_rol = usuario.id_rol;
        usuarioObj.foto_perfil = usuario.foto_perfil || '';  
  
        return usuarioObj;
      } else {
        throw new Error('Usuario no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener el usuario', error);
      throw error;
    }
  }
  
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async verificarTablass() {
    try {
      const res = await this.database.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='vehiculos'", []);
      if (res.rows.length > 0) {
        console.log("La tabla 'vehiculos' existe.");
      } else {
        console.log("La tabla 'vehiculos' no existe.");
      }
    } catch (error) {
      console.error("Error al verificar las tablas:", error);
    }
  };

  async obtenerVehiculos(): Promise<Vehiculo[]> {
    const sql = 'SELECT * FROM vehiculos';
    try {
      const res = await this.database.executeSql(sql, []);
      const vehiculos: Vehiculo[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        vehiculos.push(res.rows.item(i));
      }
      return vehiculos;
    } catch (error) {
      console.error('Error al obtener vehículos:', error);
      throw error; 
    }
  }

  async insertarVehiculo(vehiculo: Vehiculo) {
    return this.database.executeSql(
      'INSERT INTO vehiculos (marca, modelo, km, combustible, transmision, precio, foto) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [vehiculo.marca, vehiculo.modelo, vehiculo.km, vehiculo.combustible, vehiculo.transmision, vehiculo.precio, vehiculo.foto]
    ).then((res) => {
      if (res.rowsAffected > 0) {
        this.presentAlert("Vehículo agregado exitosamente", "El vehículo ha sido añadido a la subasta.");
        
      } else {
        this.presentAlert('Error', 'Error al insertar el vehículo.');
      }
    }).catch(e => {
      this.presentAlert('Error', 'Error: ' + JSON.stringify(e));
    });
  }
  
  async eliminarVehiculo(id_vehiculo: number) {
    const sql = 'DELETE FROM vehiculos WHERE id = ?';
    return this.database.executeSql(sql, [id_vehiculo]).then(res => {
      if (res.rowsAffected > 0) {
        this.presentAlert('Éxito', 'Vehículo eliminado correctamente.');
      } else {
        this.presentAlert('Error', 'No se encontró el vehículo a eliminar.');
      }
    }).catch(e => {
      this.presentAlert('Error', 'Error: ' + JSON.stringify(e));
    });
  }
  
async verificarTablas(): Promise<void> {
  const sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='vehiculos';";
  const res = await this.database.executeSql(sql, []);
  if (res.rows.length === 0) {
    console.error("La tabla 'vehiculos' no existe.");
  } else {
    console.log("La tabla 'vehiculos' existe.");
  }
}


  actualizarUsuario(id_usuario: number, pnombre: string, apellido: string, nom_usuario: string, correo: string) {
    const sql = `UPDATE usuario SET pnombre = ?, apellido = ?, nom_usuario = ?, correo = ? WHERE id_usuario = ?`;
    return this.database.executeSql(sql, [pnombre, apellido, nom_usuario, correo, id_usuario])
      .then(() => {
        this.presentAlert('Perfil actualizado', 'Tus datos han sido actualizados correctamente.');
      })
      .catch(e => {
        this.presentAlert('Error al actualizar', 'Error: ' + JSON.stringify(e));
      });
  }

  async actualizarVehiculo(id_vehiculo: number, marca: string, modelo: string, km: number, combustible: string, transmision: string, precio: number) {
    const sql = 'UPDATE vehiculos SET marca = ?, modelo = ?, km = ?, combustible = ?, transmision = ?, precio = ? WHERE id = ?';
    return this.database.executeSql(sql, [marca, modelo, km, combustible, transmision, precio, id_vehiculo]).then(() => {
      this.presentAlert('Éxito', 'Vehículo actualizado correctamente.');
    }).catch(e => {
      this.presentAlert('Error', 'Error: ' + JSON.stringify(e));
    });
  }

  insertarUsuario(pnombre: string, apellido: string, nom_usuario: string, correo: string, contrasena: string, id_rol: number) {
    return this.database.executeSql('INSERT INTO usuario(pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (?, ?, ?, ?, ?, ?)', [pnombre, apellido, nom_usuario, correo, contrasena, id_rol]).then((res) => {
      if (res.rowsAffected > 0) {
        this.presentAlert("Registro exitoso!", "Inicia sesión en Bid Drive");
        this.router.navigate(['/inicio']);
      } else {
        this.presentAlert('Registrar', 'Error al registrar el usuario.');
      }
    }).catch(e => {
      this.presentAlert('Registrar', 'Error: ' + JSON.stringify(e));
    });
  }

  async modificarContrasena(id_usuario: number, nuevaContrasena: string): Promise<void> {
    try {
      await this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE id_usuario = ?', [nuevaContrasena, id_usuario]);
      this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
    } catch (e) {
      console.error('Error al actualizar la contraseña:', e);
      this.presentAlert('Error', 'No se pudo actualizar la contraseña.');
    }
  }

  getUsuario(nom_usuario: string, contrasena: string): Promise<Usuario[]> {
    return this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? AND contrasena = ?', [nom_usuario, contrasena])
      .then(res => {
        const items: Usuario[] = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const usuario = res.rows.item(i);
            items.push({
              id_usuario: usuario.id_usuario,
              pnombre: usuario.pnombre,
              apellido: usuario.apellido,
              nom_usuario: usuario.nom_usuario,
              correo: usuario.correo,
              contrasena: usuario.contrasena,
              id_rol: usuario.id_rol
            });
          }
        }
        return items; 
      })
      .catch(e => {
        console.error('Error al obtener el usuario:', e);
        throw e; 
      });
  }



  getUserPerfil(userId: number): void {
    this.sqlite.create({ name: 'mydb.db', location: 'default' })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM usuario WHERE id_usuario = ?', [userId])
          .then((res) => {
            if (res.rows.length > 0) {
              const usuario = res.rows.item(0); 
              this.usuarioBD.next({
                id_usuario: usuario.id_usuario,
                pnombre: usuario.pnombre,
                apellido: usuario.apellido,
                nom_usuario: usuario.nom_usuario,
                correo: usuario.correo,
                id_rol: usuario.id_rol,
                foto_perfil: usuario.foto_perfil || 'path_to_photo.jpg', 
              });
            } else {
              this.usuarioBD.next(null);
            }
          })
          .catch((error) => {
            console.error('Error al obtener el perfil del usuario:', error);
            this.usuarioBD.next(null); 
          });
      });
  }

  fetchUsuario(): Observable<any> {
    return this.usuarioBD.asObservable();
  }


  

  getUser(nom_usuario: string, contrasena: string): Observable<Usuario | null> {
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? AND contrasena = ?', [nom_usuario, contrasena])
        .then(res => {
          if (res.rows.length > 0) {
            const usuario = res.rows.item(0); 
            const usuarioObj: Usuario = {
              id_usuario: usuario.id_usuario,
              pnombre: usuario.pnombre,
              apellido: usuario.apellido,
              nom_usuario: usuario.nom_usuario,
              correo: usuario.correo,
              contrasena: usuario.contrasena,
              id_rol: usuario.id_rol
            };
            observer.next(usuarioObj);
          } else {
            observer.next(null);
          }
          observer.complete();
        })
        .catch(e => {
          console.error('Error al obtener el usuario:', e);
          observer.error(e);
        });
    });
  }
  
  async verificarUsuario(nom_usuario: string, correo: string): Promise<boolean> {
    const res = await this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? OR correo = ?', [nom_usuario, correo]);
    return res.rows.length > 0; 
  }
  
  get usuario$(): Observable<User | null> {
    return this.usuarioBD.asObservable(); 
  }
asignarPuja(totalPuja: number, auto: string) {
    console.log(`Actualizando la base de datos: Auto - ${auto}, Total de Puja - ${totalPuja} CLP`);
    
    
}

}