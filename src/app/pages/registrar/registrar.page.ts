import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario: String = "";
  email: String = "";
  contrasena: String = "";
  contrasena1: String = "";

  constructor(public alertcontroller : AlertController, private router : Router, private toastController: ToastController) { }

  ngOnInit() {
  }
  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: 'Se a Registrado correctamente',
      message: '',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  valiusuarios(){
    if (this.usuario===""){
      this.presentToast('middle','El campo "Usuario" está vacío.');
      return;

    }
    if (this.email===""){

      this.presentToast('middle','El campo "Correo electrónico" está vacío.');
      return;
    }
    if (this.contrasena===""){

      this.presentToast('middle','El campo "Contraseña" está vacío.');
      return;
    }if (this.contrasena1===""){

        this.presentToast('middle','El campo "Confirmar contraseña" está vacío.');
        return;
      }if (this.contrasena!=this.contrasena1){

        this.presentToast('middle','Las contraseñas no coinciden.');
        return;
      }else{
        this.presentAlert;
        this.router.navigate(['/login']);
      }
    }
    async presentToast(position: 'middle', texto:string) {
      const toast = await this.toastController.create({
        message: texto,
        duration: 1500,
        position: position,
      });
  
      await toast.present();
    }
  }
  
    
