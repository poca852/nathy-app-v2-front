export interface CreditosResponse {
  ok:       boolean;
  creditos: Credito[];
}

export interface CreditoResponse{
  ok: boolean;
  credito: Credito
}

export interface Credito {
  pagos:         Pagos[];
  status:        boolean;
  valor_credito: number;
  interes:       number;
  total_cuotas:  number;
  total_pagar:   number;
  abonos:        number;
  saldo:         number;
  valor_cuota:   number;
  fecha_inicio:  string;
  cliente:       Cliente;
  ruta:          string;
  id:            string;
  ultimo_pago: string;
}

export interface Pagos{
  _id: string;
  valor: number;
  fecha: string;
}

export interface Cliente {
  _id:       string;
  alias:     string;
  ciudad:    string;
  direccion: string;
  telefono:  string;
  nombre: string;
}

export interface PagoResponse {
  ok: boolean,
  pago: Pago
}

export interface Pago {
  id: string;
  fecha: string;
  valor: number;
  ruta: string;
  credito: string;
  cliente: string;
}


export interface ClienteResponse {
  ok: boolean;
  clientes: [{
    id: string;
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
    creditos: Credito[]
  }]
}

