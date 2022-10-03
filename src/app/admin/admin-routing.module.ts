import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardAdmin } from './guards/authAdmin.guard';
import { LoginGuardAdmin } from './guards/loginAdmin.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuardAdmin]
  },

  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuardAdmin],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
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
