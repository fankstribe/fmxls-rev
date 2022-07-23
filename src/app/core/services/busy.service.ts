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
        bdColor: 'rgba(241, 243, 244, 0.7)',
        color: '#fff',
        type: '',
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
