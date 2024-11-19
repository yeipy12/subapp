import { Vehiculo } from './vehiculo';

describe('Vehiculo', () => {
  it('se crea la validacion del objeto del vehiculo', () => {
    const vehiculo: Vehiculo = {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      km: 50000,
      combustible: 'Gasolina',
      transmision: 'Automática',
      precio: 10000,
      foto: 'foto_url'
    };
    expect(vehiculo).toBeTruthy();
    expect(vehiculo.id).toBe(1);
    expect(vehiculo.marca).toBe('Toyota');
    expect(vehiculo.modelo).toBe('Corolla');
  });
});

