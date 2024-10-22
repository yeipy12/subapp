import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Vehiculo } from '../models/vehiculo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  nuevoVehiculo: Vehiculo = {
    marca: '',
    modelo: '',
    km: 0,
    combustible: '',
    transmision: '',
    precio: null,
    foto: '' 
  };

  constructor(
    private servicebd: ServicebdService, 
    private camera: Camera, 
    private nativeStorage: NativeStorage,
    private router: Router 
  ) {}

  ngOnInit() {
    this.cargarVehiculos();
    this.verificarAcceso();
  }

  async cargarVehiculos() {
    this.vehiculos = await this.servicebd.obtenerVehiculos();
  }

  agregarVehiculo() {
    
    if (this.nuevoVehiculo.marca && this.nuevoVehiculo.modelo && this.nuevoVehiculo.km && this.nuevoVehiculo.precio && this.nuevoVehiculo.foto) {
      this.servicebd.insertarVehiculo(this.nuevoVehiculo).then(() => {
        alert('Vehículo agregado exitosamente!');
        
      }).catch((e) => {
        alert('Error al agregar vehículo: ' + JSON.stringify(e));
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

cargarVehiculoss() {
  this.servicebd.obtenerVehiculos().then((vehiculos) => {
    console.log(vehiculos); 
    this.vehiculos = vehiculos;
    this.vehiculos.forEach(v => console.log(v.foto)); 
  }).catch(e => {
    console.error('Error al cargar vehículos', e);
  });
}

  editarVehiculo(id: number) {
    const actualizado = { 
      marca: 'Mazda', 
      modelo: 'RX-7', 
      km: 50000, 
      combustible: 'Gasolina', 
      transmision: 'Manual', 
      precio: 14000000 
    };
    this.servicebd.actualizarVehiculo(
      id, 
      actualizado.marca, 
      actualizado.modelo, 
      actualizado.km, 
      actualizado.combustible, 
      actualizado.transmision, 
      actualizado.precio
    );
  }

  eliminarVehiculo(id: number) {
    this.servicebd.eliminarVehiculo(id);
  }

  verificarAcceso() {
    const rol = localStorage.getItem('id_rol');
    if (rol !== '1') {
      
      this.router.navigate(['/inicio']);
    }
  }
}

