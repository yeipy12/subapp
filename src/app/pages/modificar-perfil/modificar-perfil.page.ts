import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {
  usuario: User | null = null;
  pnombre: string = '';
  apellido: string = '';
  nom_usuario: string = '';
  correo: string = '';

  constructor(private bd: ServicebdService, private router: Router) {}

  ngOnInit() {
    const iduser2 = Number(localStorage.getItem('id_usuario'));
  
    if (iduser2) {
      this.bd.getUserPerfil(iduser2).then(() => {
        this.bd.fetchUsuario().subscribe((data: any) => {
          this.usuario = data;
          if (this.usuario) {
            this.pnombre = this.usuario.pnombre;
            this.apellido = this.usuario.apellido;
            this.nom_usuario = this.usuario.nom_usuario;
            this.correo = this.usuario.correo;
          }
        });
      });
    }
  }

  actualizarPerfil() {
    if (this.usuario) {
      this.bd.actualizarUsuario(this.usuario.id_usuario, this.pnombre, this.apellido, this.nom_usuario, this.correo)
        .then(() => {
          this.router.navigate(['/inicio']);
        });
    }
  }
}

