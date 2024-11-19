import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nom_usuario: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;

  constructor(
    private alertController: AlertController,
    private navController: NavController,
    private bd: ServicebdService
  ) {
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
    const nomUsuario = localStorage.getItem('nom_usuario');
  const idRol = localStorage.getItem('id_rol');
  
  if (!nomUsuario || !idRol) {
    this.navController.navigateRoot('/login'); 
  }
  }

  async loginUsuario() {
    try {
      const usuarios: Usuario[] = await this.bd.getUsuario(this.nom_usuario, this.contrasena);

      if (usuarios.length > 0) {
        const usuario = usuarios[0]; 

        
        localStorage.setItem('id_rol', usuario.id_rol.toString());
        localStorage.setItem('nom_usuario', usuario.nom_usuario);
        localStorage.setItem('id_usuario', usuario.id_usuario.toString());

        
        if (usuario.id_rol === 1) {
          this.navController.navigateForward('/inicio');
        } else {
          this.navController.navigateForward('/inicio');
        }

        await this.presentAlert('Bienvenido a Bid Drive!');
      } else {
        await this.presentAlert('Usuario o contraseña incorrectos');
      }
    } catch (e) {
      console.error('Error en el login', e);
      await this.presentAlert('Ocurrió un error en el inicio de sesión.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Inicio de Sesión',
      message: message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
  
}

