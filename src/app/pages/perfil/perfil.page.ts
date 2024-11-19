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
  public usuario!: User | null;
   
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
    private bd: ServicebdService,
  ) { 
    this.activedroute.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.nom_usuario = this.router.getCurrentNavigation()?.extras?.state?.['user'];
      }
    });
  }

  ngOnInit() {
    const iduser2 = Number(localStorage.getItem('id_usuario'));  
    this.ls1 = localStorage.getItem('nom_usuario');  

    
    if (this.ls1) {
      this.nom_usuario = this.ls1;
    }
    if (iduser2) {
      this.photo = localStorage.getItem(`user_photo_${iduser2}`);
    }
    if (iduser2) {
      
      this.bd.getUserPerfil(iduser2);

      
      this.bd.usuario$.subscribe(usuario => {
        this.usuario = usuario;
        if (this.usuario?.foto_perfil) {
          this.photo = this.usuario.foto_perfil;
          
          localStorage.setItem(`user_photo_${this.usuario.id_usuario}`, this.photo);
        }
      });
    }
  }


  
  get usuarioData() {
    return this.usuario;
  }

  
  get serviceBd() {
    return this.bd;
  }
  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    if (image.webPath) {
      
      this.photo = image.webPath;
      
      if (this.usuario) {
        localStorage.setItem(`user_photo_${this.usuario.id_usuario}`, this.photo);
      }
    } else {
      console.error("No se pudo obtener la imagen.");
    }
  };

  
  guardarFoto = async () => {
    if (this.usuario?.id_usuario && this.photo) {
      try {
        
        await this.bd.updateUserPhoto(this.usuario.id_usuario, this.photo);
        console.log("Foto guardada en la base de datos correctamente");

        
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

  
  async showAlert(title: string, message: string) {
    const alert = await this.alertcontroller.create({
      header: title,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  
}






