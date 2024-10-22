import { Component, OnInit } from '@angular/core';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Vehiculo } from 'src/app/models/vehiculo';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  nuevoVehiculo = {
    marca: '',
    modelo: '',
    km: null,
    combustible: '',
    transmision: '',
    precio: null,
    foto: '' 
  };
  
  constructor(private bd: ServicebdService, private navCtrl: NavController) {}

  ngOnInit() {
    this.bd.verificarTablass();
  }

  async cargarVehiculos() {
    try {
      this.vehiculos = await this.bd.obtenerVehiculos();
      console.log('Vehículos obtenidos:', this.vehiculos);
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
    }
  }

  agregarVehiculo() {
    if (this.nuevoVehiculo.marca && 
        this.nuevoVehiculo.modelo && 
        this.nuevoVehiculo.km !== null && 
        this.nuevoVehiculo.precio !== null) {
      
      const vehiculo = {
        marca: this.nuevoVehiculo.marca,
        modelo: this.nuevoVehiculo.modelo,
        km: this.nuevoVehiculo.km,
        combustible: this.nuevoVehiculo.combustible,
        transmision: this.nuevoVehiculo.transmision,
        precio: this.nuevoVehiculo.precio,
        foto: this.nuevoVehiculo.foto 
      };
  
      this.bd.insertarVehiculo(vehiculo).then(() => {
        alert('Vehículo agregado exitosamente!');
        this.navCtrl.navigateForward('/subasta');  
      }).catch((e) => {
        console.error('Error al agregar vehículo:', e); 
        alert('Error al agregar vehículo: ' + JSON.stringify(e));
      });
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri 
    });
  
    if (image.webPath) {
      this.nuevoVehiculo.foto = image.webPath; 
    } else {
      console.error("No se pudo obtener la imagen."); 
    }
  };
  
}  

