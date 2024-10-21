import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.page.html',
  styleUrls: ['./modificar-contrasena.page.scss'],
})
export class ModificarContrasenaPage implements OnInit {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  constructor(private bd: ServicebdService, private router: Router) {}

  ngOnInit() {}

  async actualizarContrasena() {
    const id_usuario = Number(localStorage.getItem('id_usuario'));
    if (id_usuario && this.nuevaContrasena === this.confirmarContrasena && this.nuevaContrasena.length >= 8) {
      await this.bd.modificarContrasena(id_usuario, this.nuevaContrasena);
      this.router.navigate(['/perfil']);
    } else {
      this.bd.presentAlert('Error', 'Las contraseñas deben coincidir y tener al menos 8 caracteres.');
    }
  }

  get isButtonDisabled(): boolean {
    return this.nuevaContrasena !== this.confirmarContrasena || this.nuevaContrasena.length < 8 || this.nuevaContrasena.length === 0;
  }
}


