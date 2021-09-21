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
        bdColor: '#673ab7',
        color: '#4caf50',
        type: 'ball-scale',
        size: 'medium',
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
