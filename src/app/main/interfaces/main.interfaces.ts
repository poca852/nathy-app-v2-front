export interface CreditosResponse {
  ok:       boolean;
  creditos: Credito[];
}

export interface CreditoResponse{
  ok: boolean;
  credito: Credito
}

export interface CajaResponse {
  ok: boolean;
  caja: Caja;
}

export interface Caja {
  fecha:               string;
  base:                number;
  inversion:           number;
  retiro:              number;
  gasto:               number;
  cobro:               number;
  prestamo:            number;
  total_clientes:      number;
  clientes_pendientes: number;
  renovaciones:        number;
  caja_final:          number;
  ruta:                string;
  pretendido: number;
  efectividad: number;
  id:                  string;
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

export interface GetPagosInterface {
  ok: boolean;
  pagos: Pago[]
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

export interface InversionResponse {
  ok: boolean;
  inversion: Inversion
}

export interface Inversion {
  fecha:  string;
  id:     string;
  valor:  number;
  nota:   string;
  ruta:   string;
}

export interface ListaGastoResponse {
  ok: boolean;
  gastos: Gasto[];
}

export interface Gasto{
  id: string;
  gasto: string;
}

export interface GastoResponse {
  ok: boolean;
  gato: Gasto;
}

export interface Gasto {
  id: string;
  gasto: string;
  valor: number;
  nota?: string;
  ruta: string;
}

export interface RetiroResponse {
  ok: boolean;
  retiro: Retiro;
}

export interface Retiro {
  id: string;
  valor: number;
  fecha: string;
  nota?: string;
  ruta: string;
}

export interface GetCliente {
  ok: boolean,
  cliente: {
    dpi: string;
    nombre: string;
    alias: string;
    ciudad: string;
    direccion: string;
    telefono: string;
    ruta: string;
    creditos: string[];
    id: string;
  }
}

export interface RutaResponse {
    ok: boolean,
    ruta: Ruta
}

export interface Ruta {
  nombre: string;
  ciudad: string;
  cartera: number;
  total_cobrado: number;
  total_prestado: number;
  gastos: string[];
  inversiones: string[];
  empleados: string[];
  creditos: string[];
  clientes: [];
  id: string;
}