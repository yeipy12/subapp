import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.page.html',
  styleUrls: ['./subasta.page.scss'],
})
export class SubastaPage implements OnInit {

  usuario: string = "";
  contrasena: string ="";

  constructor(public alertcontroller : AlertController,private router: Router,private activedroute: ActivatedRoute) { 
    addIcons({ library, playCircle, radio, search });

    //verificar la recepcion de los elementos
    this.activedroute.queryParams.subscribe(param =>{
      //validamos si recibe la informacion
      if(this.router.getCurrentNavigation()?.extras.state){
        //capturar la informacion
        this.contrasena = this.router.getCurrentNavigation()?.extras?.state?.['con'];
        this.usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
        
      }
    });
  }
  async alertabasica(){
  const Alert =  await this.alertcontroller.create({
    header:'Su compra fue aceptada',
    message:'se le enviara un comprobante de la Compra',
    buttons:['Entendido']

  });
 await Alert.present();
 }
  ngOnInit() {
  }


  async presentAlertn(){
    const alert = await this.alertcontroller.create({
      header:'El vehiculo sea gregado correctramente',
      message:'Puedes ver este Producto en el Perfil.',
      buttons: ['Aceptar']
    });

    await alert.present();
    
  }
  async presentAlertn2() {
    const alert = await this.alertcontroller.create({
      header: 'eliminar Vehiculo',
      inputs: [
        {
          name: 'nombre del Vehiculo',
          type: 'text',
          placeholder: 'Nombre'
        }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'aceptar',
      }
    ],
    });
    await alert.present();

  }
  async presentAlertn3() {
    const alert = await this.alertcontroller.create({
      header: 'Editar Vehiculo',
      inputs: [
        {
          name: 'nombre del vehiculo',
          type: 'text',
          placeholder: 'Nombre'
        }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'aceptar',
        handler: () => {
          this.presentAlertn4('Editar producto');
        }
      }
    ],
    });
    await alert.present();

}
agregar(){

  this.presentAlertn4('Agregar Vehiculo')
}
async presentAlertn4(titulo:string) {
const alert = await this.alertcontroller.create({
  header: titulo,
  inputs: [
    {
      name: 'nombre del Vehiculo',
      type: 'text',
      placeholder: 'Nombre'
    },
    {
      name: 'cantidad',
      type: 'number',
      placeholder: 'cantidad'
    },
    {
      name: 'Precio',
      type: 'number',
      placeholder: 'precio'
    },
  ],
  buttons: [{
    text: 'Cancelar',
    role: 'cancel',
  },
  {
    text: 'aceptar',
  }
],
});
await alert.present();

}
}
