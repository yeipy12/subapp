import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service'; 


@Component({
  selector: 'app-nissanz',
  templateUrl: './nissanz.page.html',
  styleUrls: ['./nissanz.page.scss'],
})
export class NissanzPage implements OnInit {
  tiempoRestante: number = 7200; 
  oferta: number = 500000; 
  totalPuja: number = 0; 
  mensaje: string = ''; 
  historialPujas: any[] = []; // Array para almacenar las pujas realizadas
  usuario: any;

  // Variable para almacenar el usuario logueado


  constructor(private route: ActivatedRoute, private servicebd: ServicebdService) {}

  ngOnInit() {
    // Aquí puedes obtener el usuario logueado desde el servicio o localStorage
    
    this.iniciarCronometro();
  }

  // Inicia el cronómetro para la subasta
  iniciarCronometro() {
    setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      }
    }, 1000);
  }

  // Formatea el tiempo restante para mostrarlo en el formato HH:MM:SS
  get tiempoFormateado(): string {
    const horas = Math.floor(this.tiempoRestante / 3600);
    const minutos = Math.floor((this.tiempoRestante % 3600) / 60);
    const segundos = this.tiempoRestante % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
  }

  // Función para realizar una puja
  pujar() {
    if (this.oferta >= 500000) {
      // Actualizar el total de la puja
      this.totalPuja += this.oferta; 
  
      // Agregar la puja al historial
      this.historialPujas.push({
        oferta: this.oferta,
        fecha: new Date(),
        tipo: 'Puja',  // Tipo de acción 'Puja'
        totalPuja: this.totalPuja,  // Añadir el total acumulado
      });
  
      // Mensaje de éxito
      this.mensaje = `Has pujado un total de: $${this.totalPuja.toLocaleString()} CLP. ¡El auto es casi tuyo!`;
  
      // Llamar al servicio para almacenar la puja en la base de datos si es necesario
      this.servicebd.asignarPuja(this.totalPuja, 'Nissan 370z');
  
      console.log(`Puja realizada por: ${this.oferta} CLP`);
    } else {
      console.log('La puja debe ser de al menos 500.000 CLP.');
      this.mensaje = 'La puja debe ser de al menos 500.000 CLP.';
    }
  }

  // Función para registrar una acción administrativa
  registrarAccionAdministrador(accion: string) {
    if (this.usuario.rol === 'administrador') {
      // Registrar la acción del administrador en el historial
      this.historialPujas.push({
        usuario: this.usuario.nombre,
        id_usuario: this.usuario.id_usuario,
        accion: accion,
        fecha: new Date(),
        tipo: 'Administrador', // Tipo 'Administrador' para las acciones
      });

      console.log(`Acción de administrador registrada: ${accion}`);
    }
  }

  // Función para obtener el historial de pujas y acciones
  obtenerHistorialPujas() {
    console.log(this.historialPujas);
    return this.historialPujas;
  }
}




