import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Vehiculo } from 'src/app/models/vehiculo';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.page.html',
  styleUrls: ['./subasta.page.scss'],
})
export class SubastaPage implements OnInit {
  vehiculos: any[] = []; 
  isAdmin: boolean = false;

  constructor(
    public alertcontroller: AlertController, 
    private router: Router, 
    private activedroute: ActivatedRoute, 
    private bd: ServicebdService
  ) { }

  ngOnInit() { 
    this.cargarVehiculos();
    this.checkAdminStatus();

  }
  
  cargarVehiculos() {
    this.bd.obtenerVehiculos().then((vehiculos) => {
      console.log(vehiculos); 
      this.vehiculos = vehiculos;
    }).catch(e => {
      console.error('Error al cargar vehículos', e);
    });
  }

  checkAdminStatus() {
    
    const userRole = localStorage.getItem('id_rol');
    this.isAdmin = userRole === 'admin'; 
  }

  onImageError(event: any) {
    console.error('Error cargando imagen:', event);
    event.target.src = 'ruta/por/defecto.jpg'; 
  }

  irANissanz() {
    this.router.navigate(['/nissanz']);
  }

  irARaptorrrr() {
    this.router.navigate(['/raptorrrr']); 
  }

  irASubarustiii() {
    this.router.navigate(['/subarustiii']); 
  }

  irAMazdarx77() {
    this.router.navigate(['/mazdarx77']); 
  }

  modificarVehiculo(vehiculo: any) {
    
    console.log("Modificar vehículo", vehiculo);
    
    this.router.navigate(['/modificar-vehiculo'], { state: { vehiculo } });
  }
}
