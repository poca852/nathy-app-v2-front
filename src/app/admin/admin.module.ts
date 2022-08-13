import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ResumenComponent } from './pages/resumen/resumen.component';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RutasComponent } from './pages/rutas/rutas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { CajaComponent } from './pages/caja/caja.component';
import { ResumenRutaComponent } from './components/resumen-ruta/resumen-ruta.component';
import { MainRutaComponent } from './pages/main-ruta/main-ruta.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BtnVolverComponent } from './components/btn-volver/btn-volver.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResumenComponent,
    RutasComponent,
    UsuariosComponent,
    ClientesComponent,
    GastosComponent,
    CajaComponent,
    ResumenRutaComponent,
    MainRutaComponent,
    SidebarComponent,
    BtnVolverComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    PrimengModule
  ]
})
export class AdminModule { }
