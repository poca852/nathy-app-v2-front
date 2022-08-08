import { Injectable } from '@angular/core';
import { User, AuthResponse } from '../../auth/interface/auth.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private _user: User;
  private baseUrl: string = environment.baseUrl;

  get user(): User{
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

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
}
