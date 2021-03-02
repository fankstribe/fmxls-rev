import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(public spinner: NgxSpinnerService) {}

  // Displayed when the page is reloaded
  pageSpinner(name: string) {
    this.spinner.show(name, {
      bdColor: 'rgba(225,225,225,0.6)',
      size: 'medium',
      color: '#1967d2',
      type: 'ball-clip-rotate'
    });

    setTimeout(() => {
      this.spinner.hide(name);
    }, 3000);
  }

  // Use it in small containers for images, avatars etc.
  loadingSpinner(name: string) {
    this.spinner.show(name, {
      bdColor: 'rgba(255,255,255,0.8)',
      size: 'small',
      fullScreen: false,
      color: '#333',
      type: 'ball-clip-rotate'
    });
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

}
