import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( 
    private adminService: AdminService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> | boolean {
    return this.adminService.revalidarToken()
      .pipe(
        tap(valid => {
          if(valid){
            this.router.navigateByUrl('/admin/home')
          }
        }),
        map(valid => !valid)
      )
  }
  
}
