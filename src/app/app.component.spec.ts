import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ServicebdService } from './services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';  
import { of } from 'rxjs';  

class SQLiteMock {
  create() {
    return Promise.resolve();  
  }
}


class ServicebdServiceMock {
  insertarVehiculo() {
    return of(true);  
  }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule],  
      providers: [
        { provide: ServicebdService, useClass: ServicebdServiceMock },  
        { provide: SQLite, useClass: SQLiteMock }  
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();  
  });
});


