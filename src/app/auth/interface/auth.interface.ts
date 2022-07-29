export interface AuthResponse {
  ok: boolean;
  user: User;
  token: string;
}

export interface User {
  id: string;
  nombre: string;
  rol: string;
  estado: boolean;
  ruta: string;
  username: string;
}

export interface Ruta {
 _id: string;
 nombre: string;
 ciudad: string
}

export interface UserLogin {
  username: string;
  password: string;
}