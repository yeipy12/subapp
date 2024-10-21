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

  constructor(public alertcontroller: AlertController, private router: Router, private activedroute: ActivatedRoute) { }

  ngOnInit() { }

  // Funciones para navegar a las otras páginas
  irANissanz(){
  this.router.navigate(['/nissanz']);
}
  irARaptorrrr() {
    this.router.navigate(['/raptorrrr']); // Navega a la página raptorrrr
  }
  irASubarustiii() {
    this.router.navigate(['/subarustiii']); // Navega a la página subarustiii
  }

  irAMazdarx77() {
    this.router.navigate(['/mazdarx77']); // Navega a la página mazdarx77
  }
}