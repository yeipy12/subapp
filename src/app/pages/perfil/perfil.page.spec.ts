import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { User } from 'src/app/models/user';


class ActivatedRouteMock {
  queryParams = of({});
}


class RouterMock {
  getCurrentNavigation = () => {
    return {
      extras: {
        state: {
          user: 'usuario_prueba'  
        }
      }
    };
  };
}


class ServicebdServiceMock {
  getUserPerfil(id: number) {
    return Promise.resolve(); 
  }

  fetchUsuario() {
    
    return of({
      id_usuario: 1,
      nom_usuario: 'usuario_prueba',
      pnombre: 'Juan',
      apellido: 'Perez',
      correo: 'juan.perez@example.com',
      foto_perfil: 'fake-photo-url.jpg'
    } as User);  
  }

  updateUserPhoto(id: number, photo: string) {
    return Promise.resolve(); 
  }

  actualizarUsuario(id: number, pnombre: string, apellido: string, nom_usuario: string, correo: string) {
    return Promise.resolve(); 
  }
}


describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;
  let servicebdServiceMock: ServicebdServiceMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilPage],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useClass: RouterMock },
        { provide: ServicebdService, useClass: ServicebdServiceMock }
      ]
    });

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
   

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user from router state', () => {
    component.ngOnInit();  

    expect(component.nom_usuario).toBe('usuario_prueba');  
  });
  });








