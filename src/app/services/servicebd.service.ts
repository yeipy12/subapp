import { Injectable } from '@angular/core'; 
import { SQLiteObject, SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicebdService {
  public database!: SQLiteObject;

  tablaVehiculo: string = `CREATE TABLE IF NOT EXISTS vehiculo(id_vehiculo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,marca VARCHAR(20) NOT NULL,modelo VARCHAR(20) NOT NULL,km INTEGER NOT NULL,combustible VARCHAR(10) NOT NULL,transmision VARCHAR(10) NOT NULL,precio INTEGER NOT NULL)`;
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(id_rol INTEGER PRIMARY KEY NOT NULL, nom_rol VARCHAR(20) NOT NULL)";
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS estado(id_estado INTEGER PRIMARY KEY autoincrement NOT NULL, nom_estado VARCHAR(20) NOT NULL)";
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS categoria(id_categoria INTEGER PRIMARY KEY NOT NULL, nomb_categoria VARCHAR(20) NOT NULL)";
  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id_usuario INTEGER PRIMARY KEY autoincrement NOT NULL, pnombre VARCHAR(20) NOT NULL, apellido VARCHAR(30) NOT NULL, nom_usuario VARCHAR(30) NOT NULL UNIQUE, correo VARCHAR(40) NOT NULL UNIQUE, contrasena VARCHAR(16), id_rol INTEGER, FOREIGN KEY (id_rol) REFERENCES rol(id_rol))";

  
  registroRolA: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (1, 'Admin')";
  registroRolU: string = "INSERT or IGNORE INTO rol(id_rol, nom_rol) VALUES (2, 'Usuario')";
  registroAdmin: string = "INSERT OR IGNORE INTO usuario(id_usuario, pnombre, apellido, nom_usuario, correo, contrasena, id_rol) VALUES (1,'juan', 'iribarren','Yeipy', 'yeipy@gmail.com', '123456@Lol', 1)";

  
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private usuarioBD = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private sqlite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
    private alert: ServicebdService
  ) {
    this.crearBD();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'bdSubasta.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('CrearBD', 'Error: ' + JSON.stringify(e));
      });
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

    } catch (e) {
      this.presentAlert('CrearTabla', 'Error: ' + JSON.stringify(e));
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
  async getUserPerfil(id: number): Promise<void> {
    return this.database.executeSql('SELECT * FROM usuario WHERE id_usuario = ?;', [id]).then(res => {
      if (res.rows.length > 0) {
        const user: User = new User(
          res.rows.item(0).id_usuario,
          res.rows.item(0).pnombre,
          res.rows.item(0).apellido,
          res.rows.item(0).nom_usuario,
          res.rows.item(0).correo,
          res.rows.item(0).id_rol,
        );
        this.usuarioBD.next(user); 
      }
    });
  }
  async insertarVehiculo(marca: string, modelo: string, km: number, combustible: string, transmision: string, precio: number) {
    const sql = 'INSERT INTO vehiculo(marca, modelo, km, combustible, transmision, precio) VALUES (?, ?, ?, ?, ?, ?)';
    return this.database.executeSql(sql, [marca, modelo, km, combustible, transmision, precio]).then(res => {
      if (res.rowsAffected > 0) {
        this.presentAlert('Éxito', 'Vehículo agregado correctamente.');
      } else {
        this.presentAlert('Error', 'Error al agregar el vehículo.');
      }
    }).catch(e => {
      this.presentAlert('Error', 'Error: ' + JSON.stringify(e));
    });
  }

  async actualizarVehiculo(id_vehiculo: number, marca: string, modelo: string, km: number, combustible: string, transmision: string, precio: number) {
    const sql = 'UPDATE vehiculo SET marca = ?, modelo = ?, km = ?, combustible = ?, transmision = ?, precio = ? WHERE id_vehiculo = ?';
    return this.database.executeSql(sql, [marca, modelo, km, combustible, transmision, precio, id_vehiculo]).then(() => {
      this.presentAlert('Éxito', 'Vehículo actualizado correctamente.');
    }).catch(e => {
      this.presentAlert('Error', 'Error: ' + JSON.stringify(e));
    });
  }

  async eliminarVehiculo(id_vehiculo: number) {
    const sql = 'DELETE FROM vehiculo WHERE id_vehiculo = ?';
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
  async obtenerVehiculos(): Promise<any[]> {
    const sql = 'SELECT * FROM vehiculo';
    const res = await this.database.executeSql(sql, []);
    const vehiculos = [];
    for (let i = 0; i < res.rows.length; i++) {
      vehiculos.push(res.rows.item(i));
    }
    return vehiculos;
  }

//actualiza el perfil
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

  async modificarContrasena(id_usuario: number, nuevaContrasena: string): Promise<void> {
    try {
      await this.database.executeSql('UPDATE usuario SET contrasena = ? WHERE id_usuario = ?', [nuevaContrasena, id_usuario]);
      this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
    } catch (e) {
      console.error('Error al actualizar la contraseña:', e);
      this.presentAlert('Error', 'No se pudo actualizar la contraseña.');
    }
  }

  
  async verificarUsuario(nom_usuario: string, correo: string): Promise<boolean> {
    const res = await this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? OR correo = ?', [nom_usuario, correo]);
    return res.rows.length > 0; 
  }

  getUsuario(nom_usuario: string, contrasena: string) {
    return this.database.executeSql('SELECT * FROM usuario WHERE nom_usuario = ? AND contrasena = ?', [nom_usuario, contrasena]).then(res => {
      let items: Usuario[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          const usuario = res.rows.item(i);
          console.log(usuario); // Agrega este console.log para ver el objeto del usuario
          
          items.push({
            id_usuario: usuario.id_usuario,
            pnombre: usuario.pnombre,
            apellido: usuario.apellido,
            nom_usuario: usuario.nom_usuario,
            correo: usuario.correo,
            contrasena: usuario.contrasena,
            id_rol: Number(usuario.id_rol) // Aquí es donde puede estar fallando
          });
        }
      }
      return items.length > 0 ? items[0] : null;
    }).catch(e => {
      console.error('Error al obtener el usuario:', e);
      return null;
    });
  }
  
  
  
  
  fetchUsuario(): Observable<User| null>{
    return this.usuarioBD.asObservable();

  }

  logoutUsuario() {
    localStorage.removeItem('id_rol');
    localStorage.removeItem('nom_usuario');
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
  
  asignarPuja(totalPuja: number, auto: string) {
    console.log(`Actualizando la base de datos: Auto - ${auto}, Total de Puja - ${totalPuja} CLP`);
    
    
}
}