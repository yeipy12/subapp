import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModificarContrasenaPage } from './modificar-contrasena.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Router } from '@angular/router';

class MockServicebdService {
  async modificarContrasena(id_usuario: number, nuevaContrasena: string): Promise<void> {
    console.log(`MockServicebdService: modificarContrasena(${id_usuario}, ${nuevaContrasena})`);
    return Promise.resolve(); 
  }

  presentAlert(title: string, message: string): void {
    console.log(`MockServicebdService: presentAlert(${title}, ${message})`);
  }
}

class MockRouter {
  navigate(url: string[]): Promise<boolean> {
    console.log(`MockRouter: navigate(${url})`);
    return Promise.resolve(true); 
  }
}

describe('ModificarContrasenaPage', () => {
  let component: ModificarContrasenaPage;
  let fixture: ComponentFixture<ModificarContrasenaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarContrasenaPage],
      providers: [
        { provide: ServicebdService, useClass: MockServicebdService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call modificarContrasena when contrasenas match and are valid', fakeAsync(() => {
    
    spyOn(localStorage, 'getItem').and.returnValue('123');

    const service = TestBed.inject(ServicebdService);
    spyOn(service, 'modificarContrasena').and.callThrough();
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.callThrough();

    component.nuevaContrasena = 'nuevaContraseña123';
    component.confirmarContrasena = 'nuevaContraseña123';
    component.actualizarContrasena();
    tick();

   
    expect(service.modificarContrasena).toHaveBeenCalledWith(123, 'nuevaContraseña123');
    
   
    expect(router.navigate).toHaveBeenCalledWith(['/perfil']);
  }));

  it('should show an alert if contrasenas do not match', fakeAsync(() => {
    const service = TestBed.inject(ServicebdService);
    spyOn(service, 'presentAlert').and.callThrough();

    
    component.nuevaContrasena = 'nuevaContraseña123';
    component.confirmarContrasena = 'otraContraseña123';
    component.actualizarContrasena();
    tick();

    
    expect(service.presentAlert).toHaveBeenCalledWith('Error', 'Las contraseñas deben coincidir y tener al menos 8 caracteres.');
  }));

  it('should disable the button when contrasenas do not match or are too short', () => {
    
    component.nuevaContrasena = 'short';
    component.confirmarContrasena = 'mismatch';
    expect(component.isButtonDisabled).toBe(true);

    
    component.nuevaContrasena = 'validPassword123';
    component.confirmarContrasena = 'validPassword123';
    expect(component.isButtonDisabled).toBe(false);
  });
});





