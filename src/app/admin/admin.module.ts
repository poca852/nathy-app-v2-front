import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AppMenuitemComponent } from './layout/app.menuitem.component';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { AppFooterComponent } from './layout/app.footer.component';
import { AppMenuComponent } from './layout/app.menu.component';
import { AppSidebarComponent } from './layout/app.sidebar.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AppConfigModule } from './layout/config/config.module';
import { LoginComponent } from './pages/login/login.component';
import { PrimengModule } from '../primeng/primeng.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RutasComponent } from './pages/rutas/rutas.component';
import { TableEmpleadosComponent } from './components/table-empleados/table-empleados.component';
import { TableRutasComponent } from './components/table-rutas/table-rutas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

@NgModule({
  declarations: [
      AppMenuitemComponent,
      AppTopBarComponent,
      AppFooterComponent,
      AppMenuComponent,
      AppSidebarComponent,
      AppLayoutComponent,
      LoginComponent,
      DashboardComponent,
      BarChartComponent,
      PerfilComponent,
      EmpleadosComponent,
      RutasComponent,
      TableEmpleadosComponent,
      TableRutasComponent,
      ClientesComponent,
  ],
  imports: [
      CommonModule,
      HttpClientModule,
      ReactiveFormsModule,
      PrimengModule,
      AdminRoutingModule,
      AppConfigModule
  ],
  exports: [AppLayoutComponent]
})
export class AdminModule { }
