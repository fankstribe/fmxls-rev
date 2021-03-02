import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';

import { DialogComponent } from '../../../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  confirmDialog(msg) {
    const d = this.dialog.open(DialogComponent, {
      height: '',
      width: '300px',
      disableClose: true,
      data: { message: msg }
    });
    return d;
  }
}
