import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { CajaResponse, RutaResponse, RutaClose } from '../interfaces/main.interfaces';

// interfaces
import {
  CreditosResponse,
  CreditoResponse,
  PagoResponse,
  ClienteResponse,
  InversionResponse,
  ListaGastoResponse,
  GastoResponse,
  RetiroResponse,
  GetCliente,
  GetPagosInterface
} from '../interfaces/main.interfaces';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: string = environment.baseUrl;
  private token: string = localStorage.getItem('token') || '';
  // private ruta: string = ''

  constructor(private http: HttpClient,
    private authService: AuthService) {
    // this.ruta = this.authService.user.ruta;
  }

  getCreditos(): Observable<CreditosResponse> {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.get<CreditosResponse>(`${this.baseUrl}/creditos`, { headers })
  }

  getCreditoByName(query: string){
    if(query === ''){
      query = 'all';
    }
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<CreditosResponse>(`${this.baseUrl}/buscar/creditos/${query}`, {headers});
  }

  getCredito(id: string): Observable<CreditoResponse> {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.get<CreditoResponse>(`${this.baseUrl}/creditos/${id}`, { headers })
  }

  addPago(credito: string, valor: number): Observable<PagoResponse> {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.post<PagoResponse>(`${this.baseUrl}/pagos/${credito}`, { valor }, { headers })
  }

  addCliente(cliente: any) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.post<ClienteResponse>(`${this.baseUrl}/clientes`, cliente, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => err.errors.error)
      )
  }

  getClientes(q: boolean) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.get<ClienteResponse>(`${this.baseUrl}/clientes?status=${q}`, { headers })
  }

  addCredito(idClinete: string, valor_credito: number, interes: number, total_cuotas: number) {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.post<CreditoResponse>(`${this.baseUrl}/creditos/${idClinete}`, { valor_credito, interes, total_cuotas }, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => err.errors.error.msg)
      )
  }

  getCaja(): Observable<CajaResponse> {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.get<CajaResponse>(`${this.baseUrl}/caja`, { headers })
  }

  addInversion(valor: number, nota: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.post<InversionResponse>(`${this.baseUrl}/inversiones`, { valor, nota }, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => err.errors.error.msg)
      )
  }

  getListaGastos() {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.get<ListaGastoResponse>(`${this.baseUrl}/lista-gastos`, { headers })
      .pipe(
        map(resp => resp.gastos)
      )
  }

  addGasto(valor: number, gasto: string, nota: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    const body = {
      valor, gasto, nota
    }
    console.log(gasto, valor, nota)

    return this.http.post<GastoResponse>(`${this.baseUrl}/gastos`, { ...body }, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => err)
      )
  }

  addRetiro(valor: number, nota: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.post<RetiroResponse>(`${this.baseUrl}/retiros`, { valor, nota }, { headers })
      .pipe(
        map(resp => resp.ok),
        catchError(err => err)
      )
  }

  getCliente(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<GetCliente>(`${this.baseUrl}/clientes/${id}`, { headers });
  }

  getPagos(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.get<GetPagosInterface>(`${this.baseUrl}/pagos?cliente=${id}`, { headers })
  }

  // get pago de un cliente
  getPago(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<PagoResponse>(`${this.baseUrl}/pagos/${id}`, {headers})
  }

  // para actualizar el pago
  updatePago(id: string, valor: number){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.patch<PagoResponse>(`${this.baseUrl}/pagos/${id}`, {valor}, {headers})
  }

  getAllPagos() {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<GetPagosInterface>(`${this.baseUrl}/pagos`, {headers})
  }

  getRuta(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.get<RutaResponse>(`${this.baseUrl}/rutas/${id}`, { headers })
  }

  closeRuta(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.patch<RutaClose>(`${this.baseUrl}/rutas/close/${id}`, {}, { headers });
  }
}
