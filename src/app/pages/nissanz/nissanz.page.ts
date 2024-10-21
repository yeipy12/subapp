import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service'; // Importa tu servicio aquí

@Component({
  selector: 'app-nissanz',
  templateUrl: './nissanz.page.html',
  styleUrls: ['./nissanz.page.scss'],
})
export class NissanzPage implements OnInit {
  tiempoRestante: number = 7200; 
  oferta: number = 500000; 
  totalPuja: number = 0; // Total de la puja acumulada
  mensaje: string = ''; // Mensaje para el usuario

  constructor(private route: ActivatedRoute, private servicebd: ServicebdService) {}

  ngOnInit() {
    this.iniciarCronometro();
  }

  iniciarCronometro() {
    setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      }
    }, 1000);
  }

  get tiempoFormateado(): string {
    const horas = Math.floor(this.tiempoRestante / 3600);
    const minutos = Math.floor((this.tiempoRestante % 3600) / 60);
    const segundos = this.tiempoRestante % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  }

  pujar() {
    if (this.oferta >= 500000) {
      this.totalPuja += this.oferta; 
      this.mensaje = `Has pujado un total de: ${this.totalPuja} CLP. El auto es casi tuyo!`; 

      
      this.servicebd.asignarPuja(this.totalPuja, 'Mazda RX-7'); 

      console.log(`Puja realizada por: ${this.oferta} CLP`);
    } else {
      console.log('La puja debe ser de al menos 500.000 CLP.');
    }
  }
}
