import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NissanzPage } from './nissanz.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from 'src/app/services/servicebd.service';

class SQLiteMock {
  openDatabase() {
    return of({});
  }
}

class ActivatedRouteMock {
  
  snapshot = { paramMap: of({ id: '123' }) };
}

describe('NissanzPage', () => {
  let component: NissanzPage;
  let fixture: ComponentFixture<NissanzPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NissanzPage],
      imports: [IonicModule.forRoot()],
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: SQLiteMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NissanzPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});

