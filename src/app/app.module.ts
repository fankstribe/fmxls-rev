import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from '@angular/common';

import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { HttpLoaderInterceptor } from './core/interceptors/htttp-loader.interceptor';
import { HttpLoadingPageInterceptor } from './core/interceptors/htttp-loading-page.interceptor';

import { SharedModule } from '../shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

registerLocaleData(localeIt);

const socketConfig: SocketIoConfig = {
  url: environment.socket_url,
}

@NgModule({
    declarations: [AppComponent, DialogComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        // Socket
        SocketIoModule.forRoot(socketConfig),
        // Shared
        SharedModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoaderInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpLoadingPageInterceptor,
            multi: true,
        },
        {
            provide: LOCALE_ID,
            useValue: 'it-IT'
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
