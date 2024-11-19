import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubarustiiiPage } from './subarustiii.page';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
 


class SQLiteMock {
  openDatabase() {
    return Promise.resolve(); 
  }
}

describe('SubarustiiiPage', () => {
  let component: SubarustiiiPage;
  let fixture: ComponentFixture<SubarustiiiPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],  
      declarations: [SubarustiiiPage],
      providers: [
        {
          provide: ActivatedRoute, 
          useValue: { snapshot: { paramMap: of({}) } }  
        },
        { provide: SQLite, useClass: SQLiteMock } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubarustiiiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });
});


