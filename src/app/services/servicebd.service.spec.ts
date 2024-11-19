import { TestBed } from '@angular/core/testing';
import { ServicebdService } from './servicebd.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


// Mock de SQLiteObject
class MockSQLiteObject {
  executeSql(query: string, params: any[]): Promise<any> {
    if (query.startsWith('SELECT * FROM usuario')) {
      // Simulamos una respuesta para una consulta SELECT
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
            foto_perfil: 'path_to_photo.jpg',
          }),
        },
      });
    }
    return Promise.resolve({ rows: { length: 0, item: () => null } });
  }
}

// Mock del servicio SQLite
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
        { provide: SQLite, useClass: MockSQLite }, // Mock del SQLite
      ],
    });

    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile correctly', async () => {
    // Simulamos obtener el usuario por ID
    const userId = 1;
    await service.getUserPerfil(userId);

    // Usamos el BehaviorSubject para comprobar si la respuesta fue correcta
    service.fetchUsuario().subscribe((usuario) => {
      expect(usuario).toEqual({
        id_usuario: 1,
        pnombre: 'Juan',
        apellido: 'Pérez',
        nom_usuario: 'juanp',
        correo: 'juanp@example.com',
        id_rol: 'Number',
        foto_perfil: 'path_to_photo.jpg',
      });
    });
  });
});


