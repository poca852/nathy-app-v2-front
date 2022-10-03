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
      BarChartComponent
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
