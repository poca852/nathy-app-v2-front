import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ResumenComponent } from './pages/resumen/resumen.component';

const routes: Routes = [
  {
    path: '',
    component: ResumenComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent
      },

      {
        path: 'rutas',
        component: RutasComponent
      },

      {
        path: '**',
        redirectTo: 'clientes'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAdminRoutingModule { }
