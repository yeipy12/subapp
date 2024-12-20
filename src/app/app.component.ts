import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { ServicebdService } from './services/servicebd.service';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private bd: ServicebdService
  ) {
    addIcons({ add });
  }

  async logoutUsuario() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar sesión',
          handler: async () => {
            this.bd.logoutUsuario(); 
            await this.presentAlert(); 
            this.router.navigate(['/login']); 
          }
        }
      ]
    });
  
    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hasta pronto, Usuario!',
      message: 'Su sesión se ha cerrado exitosamente.',
      buttons: ['Aceptar'],
    });
  
    await alert.present();
  }
}

