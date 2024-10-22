import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import emailjs from 'emailjs-com';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-recupecontra',
  templateUrl: './recupecontra.page.html',
  styleUrls: ['./recupecontra.page.scss'],
})
export class RecupecontraPage implements OnInit {
  email: string = '';
  constructor(private toastController: ToastController, private servicebd: ServicebdService) {
    emailjs.init('tu_user_id');
   }
  ngOnInit()
   {
  }
  async recoverPassword() {
    if (!this.email) {
      this.presentToast('Por favor, ingresa tu correo electrónico.');
      return;
    }

    const templateParams = {
      email: this.email,
    };

    try {
      await emailjs.send('tu_service_id', 'tu_template_id', templateParams); 
      this.presentToast('Se ha enviado un correo de recuperación.');
    } catch (error) {
      this.presentToast('Error al enviar el correo de recuperación. Inténtalo nuevamente.');
      console.error(error);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
