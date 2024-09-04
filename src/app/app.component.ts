import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController) {}
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cierre de Sesión',
      message: ' Su sesión se ha cerrado correctamente',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }
}
