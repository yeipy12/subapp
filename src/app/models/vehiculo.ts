export interface Vehiculo {
  id?: number; 
  marca: string;
  modelo: string;
  km: number;
  combustible: string;
  transmision: string;
  precio: number | null;
  foto: string; 
  
}