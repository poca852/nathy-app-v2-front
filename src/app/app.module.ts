import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import localeEs from '@angular/common/locales/es-GT';
import { registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localeEs)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-GT'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
