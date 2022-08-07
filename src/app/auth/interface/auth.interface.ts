// esta es la respuesta cuando se hace un login, obtenemos el ok, el usuario y el token
export interface AuthResponse {
  ok: boolean;
  user: User;
  token: string;
}

export interface User {
  id: string;
  nombre: string;
  rol: {
    _id: string;
    rol: string;
  };
  estado: boolean;
  ruta: string;
  username: string;
}

export interface Ruta {
 _id: string;
 nombre: string;
 ciudad: string
}


// esta interfaces me ayuda a ver como luce la informacion que tengo que enviar para hacer el login correctamente
export interface UserLogin {
  username: string;
  password: string;
}