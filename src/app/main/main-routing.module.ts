// modulos
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './pages/home/home.component';
import { RuteroComponent } from './pages/rutero/rutero.component';
import { RenovacionesComponent } from './pages/renovaciones/renovaciones.component';
import { ClienteNuevoComponent } from './pages/cliente-nuevo/cliente-nuevo.component';
import { PagoComponent } from './pages/pago/pago.component';
import { OficinaComponent } from './pages/oficina/oficina.component';
import { CreditoComponent } from './pages/credito/credito.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { CajaComponent } from './pages/caja/caja.component';
import { VerificadosComponent } from './pages/verificados/verificados.component';
import { RenovarComponent } from './pages/renovar/renovar.component';
import { InversionesComponent } from './components/inversiones/inversiones.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { RetirosComponent } from './components/retiros/retiros.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'rutero',
        component: RuteroComponent
      },
      {
        path: 'renovaciones',
        component: RenovacionesComponent
      },
      {
        path: 'cliente-nuevo',
        component: ClienteNuevoComponent
      }, 
      {
        path: 'caja',
        component: CajaComponent
      },
      {
        path: 'verificados',
        component: VerificadosComponent
      },
      {
        path: 'renovar/:id',
        component: RenovarComponent
      },
      {
        path: 'credito/:id',
        component: CreditoComponent
      },
      {
        path: 'cliente/:id',
        component: ClienteComponent
      },
      {
        path: 'pago/:id',
        component: PagoComponent
      },
      {
        path: 'oficina',
        component: OficinaComponent,
        children: [
          {
            path: 'inversiones',
            component: InversionesComponent
          },
          {
            path: 'gastos',
            component: GastosComponent
          },
          {
            path: 'retiros',
            component: RetirosComponent
          },
          {
            path: '**',
            redirectTo: 'gastos'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'rutero'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
