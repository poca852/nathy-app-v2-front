// interfaces para obtener las rutas
export interface RutasResponse {
  ok: boolean,
  rutas: Ruta[]
};

export interface GetRutaResponse{
  ok: boolean;
  ruta: Ruta
};

export interface Ruta {
  id: string;
  nombre: string;
  clientes: number;
  gastos: number;
  inversiones: number;
  cartera: number;
  retiros: number;
  ciudad: string;
  total_cobrado: number;
  total_prestado: number;
  status: boolean;
  ultimo_cierre?: string;
  ultima_apertura?: string;
}