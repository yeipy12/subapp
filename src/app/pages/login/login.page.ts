import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  [x: string]: any;

  usuarioAdmin: String = "admin";
  ContrasenaAdmin: String = "admin1";

  usucli: String = "yeipy";
  usucontra: String = "12345"

  usuario: String = "";
  contrasena: String = "";
  

  constructor(public alertController: AlertController, private router: Router, private toastController: ToastController) { }

  ngOnInit() {
  }
  async presentAlert( titulo:string,texto:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: texto,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  valiusuario(){
    if(this.usuario===this.usuarioAdmin && this.contrasena===this.ContrasenaAdmin){
      let NavigationExtras: NavigationExtras ={
        state:{
          user:this.usuarioAdmin,
          con: this.ContrasenaAdmin
        }
      }
      this.presentAlert('Bienvenido sr', 'inicio de sesión correctamente.');
      this.router.navigate(['/subasta'], NavigationExtras)
    }
    if(this.usuario===this.usucli && this.contrasena===this.usucontra){
      let NavigationExtras: NavigationExtras ={
        state:{
          user: this.usucli,
          con: this.usucontra
        }
      }
      this.presentAlert('Bienvenido', 'inicio de sesión correctamente.');
      this.router.navigate(['/inicio'], NavigationExtras)
    }
    if (this.usuario==="" || this.contrasena===""){

      this.presentAlert('Los campos están vacíos','Por favor, ingrese sus datos correctamente');
      return;
    }if (this.contrasena!==this.ContrasenaAdmin && this.usuario!==this.usuarioAdmin && this.contrasena!==this.usucontra && this.usuario!==this.usucli){
      
      this.presentAlert('El usuario no existe','Por favor, ingrese sus datos nuevamente');
      return;
    }
  }
  async presentToast(position: 'middle', texto:string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1700,
      position: position,
    });

    await toast.present();
  }
}
