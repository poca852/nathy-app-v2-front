import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse, UserLogin, User } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _user!: User;

  get user(){
    return {...this._user};
  }

  constructor(private http: HttpClient) { }

  login(body: UserLogin){
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, body)
      .pipe(
        tap(({token}) => {
          if(token){
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

    return this.http.get<AuthResponse>(`${this.baseUrl}/auth/revalidar`, {headers})
      .pipe(
        tap( ({token, user}) =>{
          this._user = user;
          localStorage.setItem('token', token)
        }),
        map( resp => resp.ok),
        catchError(err => of(false))
      )
  }

  logout(){
    localStorage.clear();
  }
}