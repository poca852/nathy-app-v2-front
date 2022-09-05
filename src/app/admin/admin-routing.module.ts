import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardAdmin } from './guards/authAdmin.guard';
import { LoginGuardAdmin } from './guards/loginAdmin.guard';
import { ResumenComponent } from './pages/resumen/resumen.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardAdmin]
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      {
        path: 'resumen',
        component: ResumenComponent
      },

      {
        path: '**',
        redirectTo: 'resumen'
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
