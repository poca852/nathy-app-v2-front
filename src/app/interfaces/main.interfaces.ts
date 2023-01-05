// INTERFACES DE CREDITOSW
export interface Credito {
  id: string;
  _id?: string;
  pagos: Pago[];
  status: boolean;
  valor_credito: number;
  interes: number;
  total_cuotas: number;
  total_pagar: number;
  abonos: number;
  saldo: number;
  valor_cuota: number;
  fecha_inicio: string;
  cliente: Cliente;
  ruta: string;
  ultimo_pago: string;
  notas?: string;
}

export interface ResponseSearchCliente {
  results: Credito[]
}

export interface ResponseGetAllCreditos {
  ok:       boolean;
  creditos: Credito[];
}

export interface ResponseGetOneCredito{
  ok: boolean;
  credito: Credito
}

export interface FormularioNuevoCredito{
  interes?: number;
  total_cuotas: number;
  notas?: string;
  valor_cuota?: number;
  fecha_inicio: string;
  valor_credito: number;
}

// =========== FIN DE INTERFACES DE CREDITOS

// ========== INTERFACES DE CAJA ============

export interface Caja {
  id: string;
  _id?: string;
  fecha: string;
  base: number;
  inversion: number;
  retiro: number;
  gasto: number;
  cobro: number;
  prestamo: number;
  total_clientes: number;
  clientes_pendientes: number;
  renovaciones: number;
  caja_final: number
  pretendido: number
  extra: number;
  ruta: Ruta;
}

export interface ResponseGetOneCaja {
  ok: boolean;
  caja: Caja;
}

// FIN DE INTERFACES DE CAJA ==============

// PAGOS ==============
export interface Pago{
  id: string;
  _id?: string;
  fecha: string;
  valor: number;
  ruta: string;
  credito: Credito;
  cliente: Cliente;
}

export interface ResponseGetPago {
  ok: boolean;
  pago: Pago;
}

export interface ResponseGetAllPagos {
  ok: boolean;
  pagos: Pago[];
}

export interface CrearPagoInterface{
  valor: number;
  fecha: string;
  idRuta: string;
  idCredito: string;
}

export interface ActualizarPago {
  credito: string; 
  idPago: string;
  cliente: string; 
  valor: number;
  fecha: string; 
  ruta: string
}

export interface GetAllPagos {
  idRuta: string;
  credito?: string;
  fecha?: string;
}

// =?======  PAGOS

// =?======  CLEINTES
export interface Cliente {
  id: string;
  _id?: string;
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

export interface ResponseGetOneCliente {
  ok: boolean;
  cliente: Cliente
}

export interface ResponseGetAllCliente {
  ok: boolean;
  clientes: Cliente[]
}
// =?======  CLIENTES

// inversion 
export interface Inversion {
  id: string;
  _id?: string;
  fecha: string;
  valor: number;
  nota?: string;
  ruta: string;
}

export interface CrearInversion {
  valor: number;
  nota?: string;
  idRuta: string;
  fecha: string;
}

export interface ResponseGetOneInversion {
  ok: true;
  inversion: Inversion;
}

export interface ResponseGetAllInversiones {
  ok: boolean;
  inversiones: Inversion[]
}

// INVERSIONES

// GATOS

export interface ListaDeGastos {
  id: string;
  _id?: string;
  gasto: string;
}

export interface ResponseGetListaDeGastos {
  ok: boolean;
  gastos: ListaDeGastos[]
}

export interface Gasto{
  id: string;
  _id?: string;
  gasto: string;
  fecha: string;
  valor: number;
  nota?: string;
  ruta: Ruta | string;
}

export interface CrearGasto {
  gasto: string,
  fecha: string,
  valor: number,
  nota?: string,
  idRuta: string
}

export interface ResponseGetOneGasto {
  ok: boolean;
  gasto: Gasto;
}

export interface ResponseGetAllGastos {
  ok: boolean;
  gastos: Gasto[];
}

// GASTOS

// RETIROS
export interface Retiro {
  id: string;
  _id?: string;
  fecha: string;
  valor: number;
  nota: string;
  ruta: Ruta | string;
}

export interface CrearRetiro {
  fecha: string,
  valor: number,
  nota?: string,
  idRuta: string;
}

export interface ResponseGetOneRetiro {
  ok: boolean;
  retiro: Retiro;
}

export interface ResponseGetAllRetiro {
  ok: boolean;
  retiros: Retiro[];
}
// RETIROS

// RUTA
export interface Ruta {
  id: string;
  _id?: string;
  nombre: string;
  clientes: number;
  clientes_activos: number;
  gastos: number;
  inversiones: number;
  retiros: number;
  ciudad: string; 
  cartera: number;
  total_cobrado: number
  total_prestado: number;
  status: boolean;
  ultimo_cierre: string;
  ultima_apertura: string;
  ingresar_gastos_cobrador: boolean;
  caja_actual: string | Caja;
  ultima_caja: string | Caja;
}

export interface ResponseGetOneRuta {
  ok: boolean;
  ruta: Ruta;
}

export interface ResponseGetAllRutas {
  ok: boolean;
  rutas: Ruta[];
}

export interface RutaClose {
  ok: boolean
}
// RUTA



