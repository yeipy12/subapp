import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubastaPage } from './subasta.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class SQLiteMock {
  create() {
    return Promise.resolve();
  }
}


class ActivatedRouteMock {
  snapshot = {
    paramMap: of({})  
  };
}

describe('SubastaPage', () => {
  let component: SubastaPage;
  let fixture: ComponentFixture<SubastaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubastaPage],
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: SQLiteMock },
        { provide: ActivatedRoute, useClass: ActivatedRouteMock }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubastaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});

