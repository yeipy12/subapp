import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

import { User } from 'src/app/models/user';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario!: User | null;
  nom_usuario: string = "";
  pnombre: string = "";
  apellido: string = "";
  correo: string = "";
  ls1!: any;
  idUsuario: string | null = null;
  photo: string | null = null;  // Foto de perfil actual
  perfil: any;

  constructor(
    public alertcontroller: AlertController, 
    private router: Router, 
    private activedroute: ActivatedRoute, 
    private bd: ServicebdService
  ) { 
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    });
  }

  ngOnInit() {
    // Obtener el id_usuario desde localStorage
    const iduser2 = Number(this.idUsuario = localStorage.getItem('id_usuario'));
    this.ls1 = localStorage.getItem('nom_usuario');

    if (this.ls1) {
      this.nom_usuario = this.ls1; 
    }

    // Recuperar la foto desde localStorage si existe para el usuario actual
    if (iduser2) {
      this.photo = localStorage.getItem(`user_photo_${iduser2}`);
    }

    if (iduser2) {
      // Obtener el perfil del usuario desde la base de datos
      this.bd.getUserPerfil(iduser2).then(() => {
        this.bd.fetchUsuario().subscribe(usuario => {
          this.usuario = usuario;
          
          // Asocia la foto desde la base de datos
          if (this.usuario?.foto_perfil) {
            this.photo = this.usuario.foto_perfil;
            // Guardar la foto de la base de datos en localStorage
            localStorage.setItem(`user_photo_${this.usuario.id_usuario}`, this.photo);
          }
        });
      });
    }
  }

  // Función para tomar una foto
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      // Asignar la foto tomada a la variable photo
      this.photo = image.webPath;
      // Guardar la foto en localStorage para el usuario actual
      if (this.usuario) {
        localStorage.setItem(`user_photo_${this.usuario.id_usuario}`, this.photo);
      }
    } else {
      console.error("No se pudo obtener la imagen.");
    }
  };

  // Función para guardar la foto en la base de datos
  guardarFoto = async () => {
    if (this.usuario?.id_usuario && this.photo) {
      try {
        // Guardar la foto en la base de datos asociada al usuario
        await this.bd.updateUserPhoto(this.usuario.id_usuario, this.photo);
        console.log("Foto guardada en la base de datos correctamente");

        // Guardar la foto también en localStorage para el usuario actual
        localStorage.setItem(`user_photo_${this.usuario.id_usuario}`, this.photo);
      } catch (error) {
        console.error("Error al guardar la foto:", error);
        this.showAlert("Error al guardar la foto", JSON.stringify(error));
      }
    } else {
      console.error("ID de usuario o foto no disponible.");
      this.showAlert("Error", "No se pudo guardar la foto, falta información.");
    }
  };

  // Función para actualizar otros datos del perfil
  actualizarPerfil() {
    if (this.usuario) {
      this.bd.actualizarUsuario(
        this.usuario.id_usuario,
        this.usuario.pnombre,
        this.usuario.apellido,
        this.usuario.nom_usuario,
        this.usuario.correo
      );
    }
  }

  // Función para mostrar alertas
  async showAlert(title: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}






