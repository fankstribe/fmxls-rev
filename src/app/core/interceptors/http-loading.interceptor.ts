import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';

import { BusyService } from '../services/busy.service';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.busy();
    return next.handle(request).pipe(
      delay(200),
      finalize(() => {
        this.busyService.idle();
      })
    )
  }
}
