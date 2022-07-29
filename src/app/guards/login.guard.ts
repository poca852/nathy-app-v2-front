import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(): Observable<boolean> | boolean {

    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(valid){
            this.router.navigateByUrl('/main')
          }
        }),
        map(valid => !valid)
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/main')
          }
        })
      )
  }
}
