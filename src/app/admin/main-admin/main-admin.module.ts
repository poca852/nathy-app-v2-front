import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainAdminRoutingModule } from './main-admin-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { ResumenComponent } from './pages/resumen/resumen.component';


@NgModule({
  declarations: [
    ClientesComponent,
    RutasComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    MainAdminRoutingModule
  ]
})
export class MainAdminModule { }
