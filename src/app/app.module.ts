import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { HttpLoaderInterceptor } from './core/interceptors/htttp-loader.interceptor';

import { NgHttpLoaderModule } from 'ng-http-loader'

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

const socketConfig: SocketIoConfig = {
  url: environment.socket_url,
  options: {forceNew: true}
}

@NgModule({
  declarations: [AppComponent, DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    AppRoutingModule,

    NgHttpLoaderModule.forRoot(),

    // Socket
    SocketIoModule.forRoot(socketConfig),

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
      useClass: HttpLoaderInterceptor,
      multi: true,
    },
  ],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
