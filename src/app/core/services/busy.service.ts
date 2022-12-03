import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  busyReqCount = 0;
  constructor(private spinnerService: NgxSpinnerService) {}

  busy() {
    this.busyReqCount++;
    // setTimeout(() => {
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(238, 243, 252, 0.9)',
      color: '#fff',
      type: '',
      size: 'medium',
      zIndex: 98,
    });
    // }, 2000);
  }

  idle() {
    this.busyReqCount--;
    if (this.busyReqCount <= 0) {
      this.busyReqCount = 0;
      this.spinnerService.hide();
    }
  }
}
