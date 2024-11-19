import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilPage } from './modificar-perfil.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 
import { ServicebdService } from 'src/app/services/servicebd.service';


class MockSQLite {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve({ rows: { length: 0 } }),
    });
  }
}

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarPerfilPage],
      providers: [
        ServicebdService, 
        { provide: SQLite, useClass: MockSQLite }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

