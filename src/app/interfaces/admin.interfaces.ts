import { Credito } from './main.interfaces';

export interface User {
  id: string;
  _id?: string;
  nombre: string;
  username: string;
  rutas: Ruta[];
  estado: boolean;
  rol: Rol;
  img?: string;
  ruta?: Ruta;
}

export interface Empleado{
  nombre: string;
  username: string;
  password: string;
  ruta: string;
  rol: string;
  img?: string;
  estado?: boolean;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface Rol {
  id: string;
  _id?: string;
  rol: string;
}

export interface RolResponse {
  ok: boolean;
  roles: Rol[];
}

export interface LoginResponse {
  ok: boolean;
  user: User;
  token: string;
}

export interface AddUsuarioResponse {
  ok: boolean;
  usuario: User;
}

// ruta
export interface Ruta {
  id: string;
  _id?: string;
  nombre: string;
  clientes: string;
  clientes_activos: number;
  gastos: number;
  inversiones: number;
  retiros: number;
  ciudad: string;
  cartera: number;
  total_cobrado: number;
  total_prestado: number;
  status: boolean;
  ultimo_cierre: string;
  ultima_apertura: string;
  ingresar_gastos_cobrador: boolean;
  cajas: string[];
  caja_actual: string;
  ultima_caja: string;
}

export interface Cliente {
  status: boolean; 
  state: boolean;
  dpi: string;
  nombre: string;
  alias: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  img?: string;
  ruta: string;
  creditos: Credito[];
}

export interface GetClienteResponse {
  ok: boolean;
  clientes: Cliente[]
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

