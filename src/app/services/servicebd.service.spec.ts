import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';

class MockSQLiteObject {
  executeSql(query: string, params: any[]): Promise<any> {
    if (query === 'SELECT * FROM usuario WHERE id_usuario = ?' && params[0] === 1) {
      return Promise.resolve({
        rows: {
          length: 1,
          item: (index: number) => ({
            id_usuario: 1,
            pnombre: 'Juan',
            apellido: 'Pérez',
            nom_usuario: 'juanp',
            correo: 'juanp@example.com',
            id_rol: 1,
            foto_perfil: null, 
          }),
        },
      });
    }
    return Promise.resolve({
      rows: { length: 0, item: () => null },
    });
  }
}


class MockSQLite {
  create(): Promise<SQLiteObject> {
    return Promise.resolve(new MockSQLiteObject() as any);
  }
}

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicebdService,
        { provide: SQLite, useClass: MockSQLite },
      ],
    });

    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile correctly', fakeAsync(() => {
    const userId = 1;
  
    service.getUserPerfil(userId);
  
    let usuario: any;
    service.fetchUsuario().subscribe((data) => (usuario = data));
  
    tick(); 
  
    expect(usuario).toEqual({
      id_usuario: 1,
      pnombre: 'Juan',
      apellido: 'Pérez',
      nom_usuario: 'juanp',
      correo: 'juanp@example.com',
      id_rol: 1,
      foto_perfil: 'path_to_photo.jpg',
    });
  }));
});




