import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  latitud: number | undefined;
  longitud: number | undefined;

  subastaItems = [
    { label: 'INSPECCIONADOS', count: 59 },
    { label: 'CAMIONES Y AUTOBUSES', count: 110 },
    { label: 'NO DAÑADOS', count: 188 },
    { label: 'DAÑADOS', count: 143 },
    { label: 'NO CONDUCIBLE', count: 101 },
    { label: 'SUBASTA DE AUTOS DE RENTA', count: 0 },
  ];
  constructor() { }

  ngOnInit() {
    this.obtenerUbicacion();
  }

  async obtenerUbicacion() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Ubicación actual: ', coordinates);
    
    
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;
  }
}
