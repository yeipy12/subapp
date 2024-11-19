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

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('carga los vehiculos en la inicializacion', async () => {
    await component.cargarVehiculos();
    expect(mockServicebd.obtenerVehiculos).toHaveBeenCalled();
    expect(component.vehiculos).toEqual([]);
  });


  it('cargar los vehiculos para eliminarlos', () => {
    component.eliminarVehiculo(1);
    expect(mockServicebd.eliminarVehiculo).toHaveBeenCalledWith(1);
  });

  it('viajar hacia el inicio dependiendo si es administrador', async () => {
    mockNativeStorage.getItem.and.returnValue(Promise.resolve('2'));
    await component.verificarAcceso();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
  });
});











