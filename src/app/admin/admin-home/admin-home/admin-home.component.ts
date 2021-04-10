import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { SnackBarService } from '../../../core/services/snackbar.service';

import { AddDatabaseDialogComponent } from '../add-database-dialog/add-database-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);

  dbName: string;

  constructor(
    private d: MatDialog,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
  }

  addDatabase() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';

    const dialogRef = this.d.open(AddDatabaseDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {

        console.log(res.player[0].source)
        this.dbName = res.source;
        this.snackBar.showSuccessSnackbar('Nuova Database creato!');
      }
      smallDialogSub.unsubscribe();
    });

  }

}
