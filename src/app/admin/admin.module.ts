import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ResumenComponent } from './pages/resumen/resumen.component';


@NgModule({
  declarations: [
    LoginComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
