import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { RuteroComponent } from './pages/rutero/rutero.component';
import { RenovacionesComponent } from './pages/renovaciones/renovaciones.component';
import { ClienteNuevoComponent } from './pages/cliente-nuevo/cliente-nuevo.component';
import { PagoComponent } from './pages/pago/pago.component';
import { OficinaComponent } from './pages/oficina/oficina.component';
import { PrimengModule } from '../primeng/primeng.module';
import { SearchComponent } from './components/search/search.component';
import { CreditoComponent } from './pages/credito/credito.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CajaComponent } from './pages/caja/caja.component';
import { PagoFijoComponent } from './components/pago-fijo/pago-fijo.component';
import { PagoVariableComponent } from './components/pago-variable/pago-variable.component';
import { VerificadosComponent } from './pages/verificados/verificados.component';
import { RenovarComponent } from './pages/renovar/renovar.component';


@NgModule({
  declarations: [
    HomeComponent,
    RuteroComponent,
    RenovacionesComponent,
    ClienteNuevoComponent,
    PagoComponent,
    OficinaComponent,
    SearchComponent,
    CreditoComponent,
    ClienteComponent,
    CajaComponent,
    PagoFijoComponent,
    PagoVariableComponent,
    VerificadosComponent,
    RenovarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    PrimengModule
  ]
})
export class MainModule { }
