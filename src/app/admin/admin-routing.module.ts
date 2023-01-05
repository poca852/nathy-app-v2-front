import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardAdmin } from './guards/authAdmin.guard';
import { LoginGuardAdmin } from './guards/loginAdmin.guard';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { RutaComponent } from './pages/ruta/ruta.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CajasComponent } from './pages/cajas/cajas.component';
import { CreditosComponent } from './pages/creditos/creditos.component';

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
      },
      {
        path: 'empleados',
        component: EmpleadosComponent
      },
      {
	      path: 'perfil',
	      component: PerfilComponent,
      },
      {
	      path: 'rutas',
	      component: RutasComponent,
      },
      {
        path: 'ruta/:id',
        component: RutaComponent
      },
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'cajas',
        component: CajasComponent
      },
      {
        path: 'creditos',
        component: CreditosComponent
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
