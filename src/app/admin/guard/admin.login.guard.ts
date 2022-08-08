import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate, CanLoad {

  constructor(private router: Router,
    private authService: AuthService) { }

  canActivate(): Observable<boolean> | boolean {

    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if (valid) {
            this.router.navigateByUrl('/admin')
          }
        }),
        map(valid => !valid)
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.revalidarToken()
      .pipe(
        tap(valid => {
          if (valid) {
            this.router.navigateByUrl('/admin')
          }
        }),
        map(valid => !valid)
      )
  }
}
