import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(
    public snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  showSuccessSnackbar(message: string) {
    setTimeout(() => {
      const config = new MatSnackBarConfig();
      config.duration = 3000;
      config.panelClass = 'snack-custom';
      config.horizontalPosition = 'center';
      config.verticalPosition = 'bottom';

      this.zone.run(() => {
        this.snackBar.open(message, 'Close', config);
      });
    }, 800)
  }

  showErrorSnackbar(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = 'snack-error-custom'
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';

    this.zone.run(() => {
      this.snackBar.open(message, 'Close', config);
    });
  }

  replaceMessageSnackbar(message: string, v: string) {
    const sFormat = (str: string, ...args: string[]) => str.replace(/{(\d+)}/g, (match, index) => args[index] || '');
    this.showSuccessSnackbar(sFormat(message, v));
  }

}
