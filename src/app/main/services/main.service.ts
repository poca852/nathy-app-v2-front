import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreditosResponse, Credito, CreditoResponse, PagoResponse, ClienteResponse } from '../interfaces/main.interfaces';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseUrl: string = environment.baseUrl;
  private token: string = localStorage.getItem('token') || '';

  constructor(private router: Router,
              private http: HttpClient) { }

  getCreditos(): Observable<CreditosResponse>{
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.get<CreditosResponse>(`${this.baseUrl}/creditos`, {headers})
  }

  getCreditoByName(query: string): Observable<CreditosResponse>{
    const headers = new HttpHeaders()
      .set('x-token', this.token)

    return this.http.get<CreditosResponse>(`${this.baseUrl}/buscar/creditos`)
  }

  getCredito(id: string): Observable<CreditoResponse>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<CreditoResponse>(`${this.baseUrl}/creditos/${id}`, {headers})
  }

  addPago(credito: string, valor: number): Observable<PagoResponse> {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')
    return this.http.post<PagoResponse>(`${this.baseUrl}/pagos`, {credito, valor}, {headers})
  }

  addCliente(cliente: any){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.post<ClienteResponse>(`${this.baseUrl}/clientes`, cliente, {headers})
      .pipe(
        map(resp => resp.ok),
        catchError(err => err.errors.error)
      )
  }

  getClientes(q: boolean){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<ClienteResponse>(`${this.baseUrl}/clientes?status=${q}`, {headers})
  }

  addCredito(credito: any){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.post<CreditoResponse>(`${this.baseUrl}/creditos`, credito, {headers})
      .pipe(
        map(resp => resp.ok),
        catchError(err => err.errors.error.msg)
      )
  }

}
