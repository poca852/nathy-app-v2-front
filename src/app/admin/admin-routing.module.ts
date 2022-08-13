import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';
import { RutasComponent } from './pages/rutas/rutas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { CajaComponent } from './pages/caja/caja.component';
import { MainRutaComponent } from './pages/main-ruta/main-ruta.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },

  {
    path: 'home',
    component: ResumenComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'ruta/:id',
    component: MainRutaComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'clientes',
        component: ClientesComponent
      },
      {
        path: 'gastos',
        component: GastosComponent
      },
      {
        path: '**',
        redirectTo: 'clientes'
      }
    ]
  },

  {
    path: 'rutas',
    component: RutasComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AdminGuard],
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
