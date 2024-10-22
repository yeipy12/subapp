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
    public alertController: AlertController,
    private navController: NavController,
    private bd: ServicebdService
  ) {
    addIcons({ eye, lockClosed });
  }

  ngOnInit() {
    const username = localStorage.getItem('nom_usuario');
    this.rolUsuario = localStorage.getItem('id_rol');

    if (username) {
      this.navController.navigateForward('/producto');
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
          this.navController.navigateForward('/admin');
        } else {
          this.navController.navigateForward('/inicio');
        }

        alert('Bienvenido a Bid Drive!');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (e) {
      console.error('Error en el login', e);
      alert('Ocurrió un error en el inicio de sesión.');
    }
  }
}
