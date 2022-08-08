import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: ResumenComponent,
    canActivate: [AdminGuard]
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
