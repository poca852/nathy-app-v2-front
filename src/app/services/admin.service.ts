import { Injectable } from '@angular/core';
import { User, UserLogin, LoginResponse, GetRutaResponse, GetRutasResponse, CloseRuta } from '../interfaces/admin.interfaces';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Caja } from '../interfaces/main.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _user: User | null;
  private baseUrl: string = environment.baseUrl;

  get user() {
    return { ...this._user }
  }

  constructor(
    private http: HttpClient
  ) { }

  login(user: UserLogin) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/admin/login`, user)
      .pipe(
        tap(({ token }) => {
          if (token) {
            localStorage.setItem('token', token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  revalidarToken(): Observable<boolean>{
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.get<LoginResponse>(`${this.baseUrl}/auth/revalidar/admin`, {headers})
      .pipe(
        tap( ({token, user}) =>{
          this._user = user;
          localStorage.setItem('token', token)
        }),
        map( resp => resp.ok),
        catchError(err => of(false))
      )
  }

  logout() {
    this._user = null;
    localStorage.clear();
  }

  // rutas
  getAllRutaByAdmin() {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    const params = new HttpParams()
      .append('status', true)

    return this.http.get<GetRutasResponse>(`${this.baseUrl}/rutas`, {headers, params})
  }

  getCajas(id: string) {
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token'))

    return this.http.get<Caja[]>(`${this.baseUrl}/caja/admin/${id}`, {headers})
  }

  // gestion de rutas
  closeRuta(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.patch<CloseRuta>(`${this.baseUrl}/rutas/close/${id}`, {}, {headers})
  }

  openRuta(id: string, fecha: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '')

    return this.http.put<CloseRuta>(`${this.baseUrl}/rutas/open/${id}`, {fecha}, {headers})
  }
}
