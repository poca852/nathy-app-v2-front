export interface User {
  id?: string;
  _id?: string;
  nombre: string;
  username: string;
  ruta?: string;
  rutas: string[];
  estado: boolean;
  rol: Rol;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Rol {
  id?: string;
  _id?: string;
  rol: string;
}

export interface LoginResponse {
  ok: boolean;
  user: User;
  token: string;
}

// ruta
export interface Ruta {
  id?: string;
  _id?: string;
  nombre: string;
  clientes: number;
  gastos: number;
  inversiones: number;
  retiros: number;
  ciudad: string;
  cartera: number;
  total_cobrado: number;
  total_prestado: number;
  status: boolean;
  ultimo_cierre: string;
  ultima_apertura : string;
}

export interface GetRutaResponse {
  ok: boolean;
  ruta: Ruta;
}

export interface GetRutasResponse {
  ok: boolean;
  rutas: Ruta[]
}

export interface CloseRuta{
  ok: boolean;
}