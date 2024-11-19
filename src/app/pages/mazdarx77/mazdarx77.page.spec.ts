import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mazdarx77Page } from './mazdarx77.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';



class SQLiteMock {
  executeSql() {
    return Promise.resolve(); 
  }
}

describe('Mazdarx77Page', () => {
  let component: Mazdarx77Page;
  let fixture: ComponentFixture<Mazdarx77Page>;

  beforeEach(() => {
    const mockActivatedRoute = {
      snapshot: { params: { id: 123 } },  
      params: of({ id: 123 })  
    };

    TestBed.configureTestingModule({
      declarations: [Mazdarx77Page],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SQLite, useClass: SQLiteMock }  
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Mazdarx77Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



