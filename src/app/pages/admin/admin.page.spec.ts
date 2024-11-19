import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminPage } from './admin.page';
import { ServicebdService } from 'src/app/services/servicebd.service';  
import { NavController } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


class SQLiteMock {
  openDatabase() {
    return Promise.resolve(); 
  }
}

class ServicebdServiceMock {
  verificarTablass() {
    
  }

  obtenerVehiculos() {
    return Promise.resolve([
      { id: 1, marca: 'Toyota', modelo: 'Corolla', km: 100000, precio: 15000, foto: '', estado: '' }
    ]);
  }

  insertarVehiculo(vehiculo: any) {
    return Promise.resolve();
  }
}

describe('AdminPage', () => {
  let component: AdminPage;
  let fixture: ComponentFixture<AdminPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPage],
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },  
        { provide: SQLite, useClass: SQLiteMock },  
        NavController 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vehicles', async () => {
    await component.cargarVehiculos();
    expect(component.vehiculos.length).toBeGreaterThan(0); 
  });

  it('should add a new vehicle with null price', async () => {
    component.nuevoVehiculo = {
      id: 0,
      marca: 'Honda',
      modelo: 'Civic',
      km: null,    
      combustible: 'Gasolina',
      transmision: 'Manual',
      precio: null,  
      foto: '',
      estado: '',
      imagen: ''
    };
  
    await component.agregarVehiculo();
    expect(component.nuevoVehiculo.precio).toBeNull();  
    expect(component.nuevoVehiculo.km).toBeNull();     
  });
  
  
  
  
});

