import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';


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
    this.isAdmin = this.bd.esAdmin(); 
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

  irAAdmin() {
    this.router.navigate(['/admin']);
}

eliminarVehiculo(id: number) {
  this.vehiculos = this.vehiculos.filter(vehiculo => vehiculo.id !== id);
  this.bd.eliminarVehiculo(id).then(() => {
    alert('Vehículo eliminado exitosamente');
  }).catch((e) => {
    console.error('Error al eliminar vehículo:', e);
    alert('Error al eliminar vehículo');
  });
}

}
