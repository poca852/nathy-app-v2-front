import { Ruta } from 'src/app/interfaces/main.interfaces';
import { Rol } from './admin.interfaces';
// esta es la respuesta cuando se hace un login, obtenemos el ok, el usuario y el token
export interface AuthResponse {
  ok: boolean;
  user: User;
  token: string;
}

export interface User {
  id: string;
  _id?: string;
  nombre: string;
  rol: Rol;
  estado: boolean;
  ruta: string;
  username: string;
}

// esta interfaces me ayuda a ver como luce la informacion que tengo que enviar para hacer el login correctamente
export interface UserLogin {
  username: string;
  password: string;
}