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
    this.spinnerService.show(undefined, {
      bdColor: 'rgba(225,225,225, .8)',
      color: '#202124',
      type: 'ball-scale',
      size: "medium"
    });
  }

  idle() {
    this.busyReqCount--;
    if (this.busyReqCount <= 0) {
      this.busyReqCount = 0;
      this.spinnerService.hide();
    }
  }
}
