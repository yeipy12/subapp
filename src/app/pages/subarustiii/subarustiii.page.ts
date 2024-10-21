import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subarustiii',
  templateUrl: './subarustiii.page.html',
  styleUrls: ['./subarustiii.page.scss'],
})
export class SubarustiiiPage implements OnInit {
  tiempoRestante: number = 3600; // 1 hora en segundos
  oferta: number = 500000; // Oferta inicial

  constructor(private route: ActivatedRoute) {}

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
      console.log(`Puja realizada por: ${this.oferta} CLP`);
    } else {
      console.log('La puja debe ser de al menos 500.000 CLP.');
    }
  }
}

