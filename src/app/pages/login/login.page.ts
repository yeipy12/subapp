import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { eye, lockClosed } from 'ionicons/icons';
import { AlertController, NavController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  nom_usuario: string = "";
  contrasena: string = "";
  rolUsuario: string | null = null;

  constructor(public alertController: AlertController,private navcontroller: NavController, private bd: ServicebdService) {

    addIcons({ eye, lockClosed });

   }

  ngOnInit() {
    const username = localStorage.getItem('nom_usuario');
    this.rolUsuario = localStorage.getItem('id_rol');

    if (username) {
      this.navcontroller.navigateForward('/producto');
    }
  }
  loginUsuario() {
    this.bd.getUsuario(this.nom_usuario, this.contrasena)
      .then((usuario) => {
        if (usuario) {
          localStorage.setItem('id_rol', usuario.id_rol.toString()); 
          localStorage.setItem('nom_usuario', usuario.nom_usuario);
          localStorage.setItem('id_usuario', usuario.id_usuario.toString()); 
  
          if (Number(usuario.id_rol) === 1) { 
            this.navcontroller.navigateForward('/admin'); 
          } else {
            this.navcontroller.navigateForward('/inicio'); 
          }
  
          alert('Bienvenido a Bid Drive!');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(e => {
        console.error('Error en el login', e);
        alert('Ocurrió un error en el inicio de sesión.');
      });
  }
}  
