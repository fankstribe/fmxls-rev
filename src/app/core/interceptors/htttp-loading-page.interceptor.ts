import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, delay, finalize } from 'rxjs/operators';

import { BusyService } from '../services/busy.service';

@Injectable()
export class HttpLoadingPageInterceptor implements HttpInterceptor {
  timer: ReturnType<typeof setTimeout>;

  constructor(private busyService: BusyService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.busyService.busy();
    }, 100);

    return next.handle(request).pipe(
      finalize(() => {
        this.busyService.idle();
        if (this.timer) {
          clearTimeout(this.timer);
        }
      })
    );
  }
}
