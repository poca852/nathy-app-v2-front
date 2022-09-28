import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminService } from '../../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate, CanLoad {

  constructor(private router: Router,
              private adminService: AdminService){}

  canActivate(): Observable<boolean> | boolean {

    return this.adminService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/admin/login')
          }
        })
      )

  }
  canLoad(): Observable<boolean> | boolean {
    return this.adminService.revalidarToken()
      .pipe(
        tap(valid => {
          if(!valid){
            this.router.navigateByUrl('/admin/login')
          }
        })
      )
  }
}
