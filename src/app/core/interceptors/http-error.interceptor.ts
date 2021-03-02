import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SnackBarService } from '../services/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: SnackBarService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('Errore Client');
            errorMsg = `${error.error.message}`
          } else {
            console.log('Errore Server');
            errorMsg = error.error.msg ? `${error.error.msg}` : `${error.error.err.email.msg}`;

            if (error.status === 401) {
              errorMsg = `${error.error.message}`;
            } else {
              this.snackBar.showErrorSnackbar(errorMsg)
            }
          }
          return throwError(`Ops qualcosa non ha funzionato ${errorMsg} => URL ${error.url}`);
        })
      )
  }
}
