import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User, AuthResponse } from '../interfaces/auth.interfaces';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string = localStorage.getItem('token') || '';
  private baseUrl: string = environment.baseUrl;

  private _user: User | null;

  get user(): User {
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login({username, password}){
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, {username, password})
      .pipe(
        tap( ({token}) => {
          if(token){
            localStorage.setItem('token', token);
          }
        } ),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  };

  revalidarToken(): Observable<boolean>{
    const headers = new HttpHeaders()
      .set('x-token', this.token);

    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/revalidar`, {headers})
      .pipe(
        tap(({token, user}) => {
          this._user = user;
          localStorage.setItem('token', token);
        }),
        map(resp => resp.ok),
        catchError(err => of(false))
      )
  }

  logout() {
    this._user = null;
    localStorage.clear();
  }
}
