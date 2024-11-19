import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AdminComponent } from './admin.component';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';

class MockCamera {
  getPicture() {
    return Promise.resolve('fake_image_data');  
  }
}

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: Camera, useClass: MockCamera }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();  
  });

  it('should call getPicture from Camera and set photo in nuevoVehiculo', async () => {
    
    const cameraSpy = spyOn(MockCamera.prototype, 'getPicture').and.callThrough();

    
    await component.tomarFoto();  

   
    expect(cameraSpy).toHaveBeenCalled();

    
    expect(component.nuevoVehiculo.foto).toBe('data:image/jpeg;base64,fake_image_data');
  });
});






