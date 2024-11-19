import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarPage } from './registrar.page';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { ServicealertService } from 'src/app/services/servicealert.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('RegistrarPage', () => {
  let component: RegistrarPage;
  let fixture: ComponentFixture<RegistrarPage>;

  
  const routerMock = {
    navigate: jasmine.createSpy('navigate')  
  };

  const servicebdMock = {
    someMethod: jasmine.createSpy('someMethod').and.returnValue(Promise.resolve())  
  };

  const servicealertMock = {
    showAlert: jasmine.createSpy('showAlert')  
  };

  const sqliteMock = {
    create: jasmine.createSpy('create').and.returnValue(Promise.resolve({}))  
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarPage],  
      imports: [
        ReactiveFormsModule,  
        IonicModule.forRoot()  
      ],
      providers: [
        { provide: Router, useValue: routerMock },  
        { provide: ServicebdService, useValue: servicebdMock },  
        { provide: ServicealertService, useValue: servicealertMock }, 
        { provide: SQLite, useValue: sqliteMock },  
        FormBuilder  
      ]
    }).compileComponents();

   
    fixture = TestBed.createComponent(RegistrarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();  
  });

  it('should create', async () => {
    await fixture.whenStable();  
    expect(component).toBeTruthy();  
  });

  it('should initialize form', () => {
    
    expect(component.form).toBeDefined();
    
    expect(component.form.controls['nombre']).toBeDefined();
  });
});




