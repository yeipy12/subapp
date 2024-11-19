import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaptorrrrPage } from './raptorrrr.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; 
import { ServicebdService } from 'src/app/services/servicebd.service';


class MockServicebdService {
  asignarPuja(totalPuja: number, item: string) {
    console.log(`Mock: asignarPuja(${totalPuja}, ${item})`);
  }
}

describe('RaptorrrrPage', () => {
  let component: RaptorrrrPage;
  let fixture: ComponentFixture<RaptorrrrPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaptorrrrPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mockedValue' }), 
          },
        },
        { provide: ServicebdService, useClass: MockServicebdService }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RaptorrrrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('se crea', () => {
    expect(component).toBeTruthy();
  });

  it('iniciar cronometro', () => {
    component.tiempoRestante = 7200; 
    expect(component.tiempoRestante).toBe(7200); 

    
    jasmine.clock().install();
  
   
    component.iniciarCronometro();
  
    
    jasmine.clock().tick(1000);  
  
    
    expect(component.tiempoRestante).toBe(7199); 
  
    
    jasmine.clock().uninstall();
  });
  
  

  it('formatear la hora correctamente', () => {
    component.tiempoRestante = 3661; 
    expect(component.tiempoFormateado).toBe('01:01:01');
  });

  it('registra la oferta de (puja)', () => {
    component.oferta = 500000;
    component.pujar();
    expect(component.totalPuja).toBe(500000);
    expect(component.historialPujas.length).toBe(1);
    expect(component.historialPujas[0].oferta).toBe(500000);
    expect(component.mensaje).toContain('El auto es casi tuyo');
  });

  it('que no se registre una oferta inferior a 500,000', () => {
    component.oferta = 499999;
    component.pujar();
    expect(component.totalPuja).toBe(0);
    expect(component.historialPujas.length).toBe(0);
    expect(component.mensaje).toBe('La puja debe ser de al menos 500.000 CLP.');
  });
});

