import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../../../shared/components/dialog/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  confirmDialog(msg) {
    const d = this.dialog.open(ConfirmDialogComponent, {
      height: '',
      width: '300px',
      disableClose: true,
      data: { message: msg },
    });
    return d;
  }
}
