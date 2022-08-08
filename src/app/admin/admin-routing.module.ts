import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { AdminLoginGuard } from './guard/admin.login.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [AdminLoginGuard]
      },

      {
        path: '',
        loadChildren: () => import('./main-admin/main-admin.module').then(m => m.MainAdminModule),
        canActivate: [AdminGuard],
        canLoad: [AdminGuard]
      },

      {
        path: '**',
        redirectTo: 'auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
