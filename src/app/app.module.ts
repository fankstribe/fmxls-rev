import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { HttpLoadingInterceptor } from './core/interceptors/http-loading.interceptor';
import { HttpLoaderInterceptor } from './core/interceptors/htttp-loader.interceptor';

import { NgHttpLoaderModule } from 'ng-http-loader'

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    NgHttpLoaderModule.forRoot(),

    // Shared
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
