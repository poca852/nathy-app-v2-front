import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

// interfaces
import { ResponseGetAllCreditos, ResponseGetOneCredito, ResponseGetPago, ResponseGetOneCliente, ResponseGetAllCliente, ResponseGetOneCaja, ResponseGetOneInversion, ResponseGetListaDeGastos, ResponseGetOneGasto, ResponseGetOneRetiro, ResponseGetAllPagos, ResponseGetOneRuta, RutaClose, FormularioNuevoCredito, ResponseSearchCliente, CrearPagoInterface, CrearInversion, CrearRetiro, CrearGasto, ActualizarPago, GetAllPagos } from '../interfaces/main.interfaces';




@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: string = environment.baseUrl;
  // private ruta: string = ''

  constructor(private http: HttpClient) {
    // this.ruta = this.authService.user.ruta;
  }

  getCreditos(status: boolean, ruta: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const params = new HttpParams()
      .append('status', status)
      .append('idRuta', ruta)

    return this.http.get<ResponseGetAllCreditos>(`${this.baseUrl}/creditos`, { headers, params })
  }

  getCreditoByName(query: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    if(query === ''){
      query = 'all'
    }

    return this.http.get<ResponseSearchCliente>(`${this.baseUrl}/buscar/creditos/${query}`, {headers});
  }

  getCredito(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<ResponseGetOneCredito>(`${this.baseUrl}/creditos/${id}`, { headers })
  }

  addPago(pago: CrearPagoInterface){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.post<ResponseGetPago>(`${this.baseUrl}/pagos/${pago.idCredito}`, pago, { headers })
  }

  addCliente(cliente: any) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<ResponseGetOneCliente>(`${this.baseUrl}/clientes`, cliente, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  getClientes(status: boolean, idRuta: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const params = new HttpParams()
      .append('status', status);

    return this.http.get<ResponseGetAllCliente>(`${this.baseUrl}/clientes/${idRuta}`, { headers, params })
  }

  addCredito(credito: FormularioNuevoCredito) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.post<ResponseGetOneCredito>(`${this.baseUrl}/creditos/${credito.idCliente}`, credito, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  getCaja(ruta: string, fecha: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const params = new HttpParams()
      .append('fecha', fecha)

    return this.http.get<ResponseGetOneCaja>(`${this.baseUrl}/caja/${ruta}`, { headers, params })
  }

  addInversion(inversion: CrearInversion) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<ResponseGetOneInversion>(`${this.baseUrl}/inversiones`, inversion, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  getListaGastos() {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ResponseGetListaDeGastos>(`${this.baseUrl}/lista-gastos`, { headers })
      .pipe(
        map(resp => resp.gastos)
      )
  }

  addGasto(gasto: CrearGasto) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');


    return this.http.post<ResponseGetOneGasto>(`${this.baseUrl}/gastos`, gasto, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  addRetiro(retiro: CrearRetiro) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.post<ResponseGetOneRetiro>(`${this.baseUrl}/retiros`, retiro, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  getCliente(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ResponseGetOneCliente>(`${this.baseUrl}/clientes/one/${id}`, { headers });
  }

  getPagos(idCliente: string, idCredito: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ResponseGetAllPagos>(`${this.baseUrl}/pagos/getPagos/${idCliente}/${idCredito}`, { headers })
  }

  // get pago de un cliente
  getPago(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ResponseGetPago>(`${this.baseUrl}/pagos/one/${id}`, {headers})
  }

  // para actualizar el pago
  updatePago(pago: ActualizarPago){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.put<ResponseGetPago>(`${this.baseUrl}/pagos/update/${pago.idPago}`, pago, {headers})
      .pipe(
        map(resp => resp.ok),
        catchError(err => of(err))
      )
  }

  getAllPagos(ruta: string, fecha: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const params = new HttpParams()
      .append('fecha', fecha)

    return this.http.get<ResponseGetAllPagos>(`${this.baseUrl}/pagos/verificados/${ruta}`, {headers, params})
  }

  getRuta(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<ResponseGetOneRuta>(`${this.baseUrl}/rutas/${id}`, { headers })
  }

  closeRuta(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.patch<RutaClose>(`${this.baseUrl}/rutas/close/${id}`, {}, { headers });
  }
}
