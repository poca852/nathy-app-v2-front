import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(): Observable<boolean> | boolean {

    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/admin/auth/login')
          }
        })
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/admin/auth/login')
          }
        })
      )
  }
}
