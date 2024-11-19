import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { Vehiculo } from '../models/vehiculo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  [x: string]: any;
  vehiculos: Vehiculo[] = [];
  nuevoVehiculo: Vehiculo = {
    id: 0,
    marca: '',
    modelo: '',
    km: 0,
    combustible: '',
    transmision: '',
    precio: 0, 
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
    try {
      this.vehiculos = await this.servicebd.obtenerVehiculos();
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
      alert('Error al cargar los vehículos.');
    }
  }

  
  async agregarVehiculo() {
    if (
      this.nuevoVehiculo.marca?.trim() &&  
      this.nuevoVehiculo.modelo?.trim() &&  
      !isNaN(this.nuevoVehiculo.km) &&      
      this.nuevoVehiculo.precio !== null &&  
      !isNaN(this.nuevoVehiculo.precio) &&  
      this.nuevoVehiculo.foto?.trim() !== undefined &&  
      this.nuevoVehiculo.foto?.trim() !== ""  
    ) {
      console.log('Campos completos, llamando insertarVehiculo');
      try {
        await this.servicebd.insertarVehiculo(this.nuevoVehiculo);
        alert('Vehículo agregado exitosamente!');
      } catch (e) {
        alert('Error al agregar vehículo: ' + JSON.stringify(e));
      }
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }
  
  
  

  
async tomarFoto() {
  try {
    const imageData = await this.camera.getPicture({
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
    });
    this.nuevoVehiculo.foto = 'data:image/jpeg;base64,' + imageData;
  } catch (error) {
    console.error('Error al tomar la foto', error);
    alert('Error al tomar la foto');
  }
}


  
  async editarVehiculo(id: number) {
    try {
      const actualizado = { 
        marca: 'Mazda', 
        modelo: 'RX-7', 
        km: 50000, 
        combustible: 'Gasolina', 
        transmision: 'Manual', 
        precio: 14000000 
      };
      await this.servicebd.actualizarVehiculo(
        id,
        actualizado.marca,
        actualizado.modelo,
        actualizado.km,
        actualizado.combustible,
        actualizado.transmision,
        actualizado.precio
      );
      alert('Vehículo actualizado exitosamente!');
    } catch (error) {
      console.error('Error al actualizar vehículo:', error);
      alert('Error al actualizar el vehículo.');
    }
  }
  
  async eliminarVehiculo(id: number) {
    try {
      await this.servicebd.eliminarVehiculo(id);
      alert('Vehículo eliminado exitosamente!');
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      alert('Error al eliminar el vehículo.');
    }
  }
  

  
  async verificarAcceso() {
    try {
      const rol = await this.nativeStorage.getItem('id_rol');
      if (rol !== '1') {
        this.router.navigate(['/inicio']);
      }
    } catch (error) {
      console.error('Error al verificar acceso:', error);
      this.router.navigate(['/inicio']);
    }
  }
  
}




