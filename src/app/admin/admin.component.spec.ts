import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin.component';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { Router } from '@angular/router';

class MockServicebdService {
  obtenerVehiculos = jasmine.createSpy().and.returnValue(Promise.resolve([]));
  insertarVehiculo = jasmine.createSpy().and.returnValue(Promise.resolve());
  actualizarVehiculo = jasmine.createSpy();
  eliminarVehiculo = jasmine.createSpy();
}

class MockCamera {
  getPicture = jasmine.createSpy().and.returnValue(Promise.resolve('fake_image_data'));
}

class MockNativeStorage {
  getItem = jasmine.createSpy().and.returnValue(Promise.resolve('1'));
}

class MockRouter {
  navigate = jasmine.createSpy();
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockServicebd: MockServicebdService;
  let mockCamera: MockCamera;
  let mockNativeStorage: MockNativeStorage;
  let mockRouter: MockRouter;

  beforeEach(waitForAsync(() => {
    mockServicebd = new MockServicebdService();
    mockCamera = new MockCamera();
    mockNativeStorage = new MockNativeStorage();
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: ServicebdService, useValue: mockServicebd },
        { provide: Camera, useValue: mockCamera },
        { provide: NativeStorage, useValue: mockNativeStorage },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles on initialization', async () => {
    await component.cargarVehiculos();
    expect(mockServicebd.obtenerVehiculos).toHaveBeenCalled();
    expect(component.vehiculos).toEqual([]);
  });

  it('should add a new vehicle when all fields are complete', (done) => {
    component.nuevoVehiculo = {
      id: 0,
      marca: 'Toyota',
      modelo: 'Corolla',
      km: 50000,
      combustible: 'Gasolina',
      transmision: 'Automática',
      precio: 20000,
      foto: ''
    };
  
    
    component.agregarVehiculo().then(() => {
      
      expect(mockServicebd.insertarVehiculo).toHaveBeenCalledWith(component.nuevoVehiculo);
      done();  
    });
  });

  it('should not add a vehicle if fields are incomplete', async () => {
    spyOn(window, 'alert');  
    component.nuevoVehiculo = { ...component.nuevoVehiculo, marca: '', precio: null }; 
    await component.agregarVehiculo();
    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
    expect(mockServicebd.insertarVehiculo).not.toHaveBeenCalled();  
  });

  it('should update a vehicle when editarVehiculo is called', () => {
    component.editarVehiculo(1);
    expect(mockServicebd.actualizarVehiculo).toHaveBeenCalledWith(
      1,
      'Mazda',
      'RX-7',
      50000,
      'Gasolina',
      'Manual',
      14000000
    );
  });

  it('should delete a vehicle when eliminarVehiculo is called', () => {
    component.eliminarVehiculo(1);
    expect(mockServicebd.eliminarVehiculo).toHaveBeenCalledWith(1);
  });

  it('should navigate to /inicio if the user does not have admin access', async () => {
    mockNativeStorage.getItem.and.returnValue(Promise.resolve('2'));
    await component.verificarAcceso();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});











