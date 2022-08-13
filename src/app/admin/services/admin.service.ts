import { Injectable } from '@angular/core';
import { User, AuthResponse } from '../../auth/interface/auth.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { of, Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { RutasResponse, GetRutaResponse, Ruta } from '../interfaces/admin.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl: string = environment.baseUrl;
  
  // PROPIEDADES PARA LOS USUARIOS
  private _user: User | null;
  get user(): User{
    return {...this._user};
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  // servicios para login
  login({username, password}) {
    const params = new HttpParams()
      .append('admin', true);

    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, {username, password}, {params})
      .pipe(
        tap(({token}) => {
          if(token){
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  revalidarToken(){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');
    const params = new HttpParams()
      .append('admin', true);

    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/revalidar`, {headers, params})
      .pipe(
        tap( ({user, token}) => {
          this._user = user;
          localStorage.setItem('token', token)
        } ),
        map( resp => resp.ok ),
        catchError(err => of(false))
      )
  }

  logout(){
    this._user = null;
    this.router.navigateByUrl('admin/login')
    localStorage.clear();
  }

  // ================= FIN DEL LOS SERVICIOS PARA LOGIN========================

  //  ==================SERVICIOS PARA LAS PAGES DEL ADMIN==================
  getRutas(){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<RutasResponse>(`${this.baseUrl}/rutas`, {headers})
  }

  getRuta(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<GetRutaResponse>(`${this.baseUrl}/rutas/${id}`, {headers})
  }

  closeRuta(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.patch(`${this.baseUrl}/rutas/close/${id}`, {}, {headers})
  }

  openRuta(id: string){
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.patch(`${this.baseUrl}/rutas/open/${id}`, {}, {headers})
  }
}
