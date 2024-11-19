import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';

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
  getData() {
    return of('fake data');  
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
    servicebdServiceMock = TestBed.inject(ServicebdService);

    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user from router state', () => {
    component.ngOnInit();  

    
    expect(component.nom_usuario).toBe('usuario_prueba');
  });

  it('should call getData on the service and return fake data', () => {
   
    spyOn(servicebdServiceMock, 'getData').and.returnValue(of('fake data'));

    component.ngOnInit(); 

    
    expect(servicebdServiceMock.getData).toHaveBeenCalled();

    
    expect(component.nom_usuario).toBe('fake data'); 
  });
});







