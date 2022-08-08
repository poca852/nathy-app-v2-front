export interface AuthResponse {
  ok:   boolean;
  user: User;
  token: string;
}

export interface User {
  id:       string;
  estado:   boolean;
  nombre:   string;
  username: string;
  rol: {
    _id:    string;
    rol:    string
  },
  token:    string;
}