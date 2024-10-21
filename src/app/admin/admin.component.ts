import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  vehiculos: any[] = []; // Array para almacenar los vehículos

  constructor(private servicebd: ServicebdService, private router: Router) {}

  ngOnInit() {
    this.cargarVehiculos();
  }

  async cargarVehiculos() {
    this.vehiculos = await this.servicebd.obtenerVehiculos();
  }

  agregarVehiculo() {
    const nuevoVehiculo = { marca: 'Mazda', modelo: 'RX-7', km: 45000, combustible: 'Gasolina', transmision: 'Manual', precio: 15000000 };
    this.servicebd.insertarVehiculo(nuevoVehiculo.marca, nuevoVehiculo.modelo, nuevoVehiculo.km, nuevoVehiculo.combustible, nuevoVehiculo.transmision, nuevoVehiculo.precio);
  }

  editarVehiculo(id: number) {
    
    const actualizado = { marca: 'Mazda', modelo: 'RX-7', km: 50000, combustible: 'Gasolina', transmision: 'Manual', precio: 14000000 };
    this.servicebd.actualizarVehiculo(id, actualizado.marca, actualizado.modelo, actualizado.km, actualizado.combustible, actualizado.transmision, actualizado.precio);
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

