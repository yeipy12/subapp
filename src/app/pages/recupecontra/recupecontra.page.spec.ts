import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecupecontraPage } from './recupecontra.page';
import { ToastController } from '@ionic/angular';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

export class MockSQLite {
  openDatabase() {
    return Promise.resolve({
      transaction: () => {},
      executeSql: () => {},
    });
  }
}

describe('RecupecontraPage', () => {
  let component: RecupecontraPage;
  let fixture: ComponentFixture<RecupecontraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecupecontraPage],
      providers: [
        ToastController,
        ServicebdService,
        { provide: SQLite, useClass: MockSQLite }, 
      ],
    });

    fixture = TestBed.createComponent(RecupecontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show toast when email is empty', async () => {
    component.email = ''; 
    await component.recoverPassword();
    
  });

  it('should show toast when email is empty', async () => {
    const toastSpy = spyOn(component, 'presentToast');
    component.email = ''; 
    await component.recoverPassword();
    expect(toastSpy).toHaveBeenCalledWith('Por favor, ingresa tu correo electrónico.');
  });
  
});

