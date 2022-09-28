import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(): Observable<boolean> | boolean {

    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/auth')
          }
        })
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/auth')
          }
        })
      )
  }
}
