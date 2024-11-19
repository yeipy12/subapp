import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-raptorrrr',
  templateUrl: './raptorrrr.page.html',
  styleUrls: ['./raptorrrr.page.scss'],
})
export class RaptorrrrPage implements OnInit {
  tiempoRestante: number = 7200; 
  oferta: number = 500000; 
  totalPuja: number = 0; 
  mensaje: string = ''; 
  historialPujas: any[] = []; 
  usuario: any;

  


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
  
      
      this.historialPujas.push({
        oferta: this.oferta,
        fecha: new Date(),
        tipo: 'Puja',  
        totalPuja: this.totalPuja, 
      });
  
      
      this.mensaje = `Has pujado un total de: $${this.totalPuja.toLocaleString()} CLP. ¡El auto es casi tuyo!`;
  
      
      this.servicebd.asignarPuja(this.totalPuja, 'Nissan 370z');
  
      console.log(`Puja realizada por: ${this.oferta} CLP`);
    } else {
      console.log('La puja debe ser de al menos 500.000 CLP.');
      this.mensaje = 'La puja debe ser de al menos 500.000 CLP.';
    }
  }

 
  registrarAccionAdministrador(accion: string) {
    if (this.usuario.rol === 'administrador') {
      
      this.historialPujas.push({
        usuario: this.usuario.nombre,
        id_usuario: this.usuario.id_usuario,
        accion: accion,
        fecha: new Date(),
        tipo: 'Administrador',
      });

      console.log(`Acción de administrador registrada: ${accion}`);
    }
  }

  
  obtenerHistorialPujas() {
    console.log(this.historialPujas);
    return this.historialPujas;
  }
}

