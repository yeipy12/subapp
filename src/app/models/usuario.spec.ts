import { Usuario } from './usuario';

describe('Usuario', () => {
  it('se crea la instancia', () => {
    expect(new Usuario()).toBeTruthy();
  });
});
