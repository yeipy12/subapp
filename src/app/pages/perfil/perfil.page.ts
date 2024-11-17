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
  photo: string | null = null;
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
    this.obtenerPerfil();
    const iduser2 = Number(this.idUsuario = localStorage.getItem('id_usuario'));
    this.ls1 = localStorage.getItem('nom_usuario');

    if (this.ls1) {
      this.nom_usuario = this.ls1; 
    }

    
    this.photo = localStorage.getItem('user_photo');

    if (iduser2) {
      this.bd.getUserPerfil(iduser2).then(() => {
        this.bd.fetchUsuario().subscribe(usuario => {
          this.usuario = usuario;
          
          if (this.usuario?.foto_perfil) {
            this.photo = this.usuario.foto_perfil;
          }
        });
      });
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    if (image.webPath) {
      this.photo = image.webPath; 
      localStorage.setItem('user_photo', this.photo); 
    } else {
      console.error("No se pudo obtener la imagen."); 
    }
  };
  
  guardarFoto = async () => {
    if (this.usuario?.id_usuario && this.photo) {
      try {
        await this.bd.updateUserPhoto(this.usuario.id_usuario, this.photo);
        console.log("Foto guardada en la base de datos correctamente");
      } catch (error) {
        console.error("Error al guardar la foto:", error);
        this.showAlert("Error al guardar la foto", JSON.stringify(error));
      }
    } else {
      console.error("ID de usuario o foto no disponible.");
      this.showAlert("Error", "No se pudo guardar la foto, falta información.");
    }
  };

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

  obtenerPerfil() {
    const userId = 1; 
    this.bd.getUserPerfil(userId).then(() => {
      this.bd.fetchUsuario().subscribe(usuario => {
        this.usuario = usuario;
      });
    });
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}




