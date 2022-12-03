import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  BreakpointState,
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { SocketService } from '../../../core/services/socket.service';
import { SnackBarService } from '../../../core/services/snackbar.service';
import { DialogService } from '../../../core/services/dialog.service';
import { PlayerService } from '../../../core/services/player.service';

import { AddDatabaseDialogComponent } from '../add-database-dialog/add-database-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([
    Breakpoints.XSmall,
  ]);

  dbName: string;
  countPlayers: string;
  createdAt: Date;
  updatedAt: Date;
  addedPlayers: string;
  modifiedPlayers: string;

  checkUpdateStatus: boolean;
  checkCreateStatus: boolean;

  constructor(
    private d: MatDialog,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService,
    private playerService: PlayerService,
    private socketService: SocketService,
    private dialogService: DialogService
  ) {
    this.getPlayersDBS();
  }

  ngOnInit(): void {
    this.getCreateDatabaseEvent();
    this.getUpdateDatabaseEvent();
    this.onCheckCreateStatus();
    this.onCheckUpdateStatus();
  }

  getPlayersDBS() {
    this.playerService.getPlayersDB().subscribe((res) => {
      this.dbName = res[0]?.source;
      this.countPlayers = res[0]?.countPlayers;
      this.createdAt = res[0]?.createdAt;
      this.updatedAt = res[0]?.updatedAt;
      this.addedPlayers = res[0]?.addedPlayers;
      this.modifiedPlayers = res[0]?.modifiedPlayers;
    });
  }

  addDatabase() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';

    const dialogRef = this.d.open(AddDatabaseDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        localStorage.setItem('createStatus', 'true');
        this.checkCreateStatus = true;
        this.snackBar.showErrorSnackbar(
          'Avvio il processo e ti avviso appena è concluso.'
        );
      }
      smallDialogSub.unsubscribe();
    });
  }

  updateDatabase() {
    const dialogRef = this.dialogService.confirmDialog(
      'Aggiornare il database?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.snackBar.showErrorSnackbar(
          'Avvio il processo e ti avviso appena è concluso.'
        );
        this.playerService
          .updatePlayersDB(this.dbName)
          .subscribe()
          .unsubscribe();
        localStorage.setItem('updateStatus', 'true');
        this.checkUpdateStatus = true;
      }
    });
  }

  deleteDatabase() {
    const dialogRef = this.dialogService.confirmDialog(
      'Vuoi davvero eliminare il database attuale?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.playerService.deletePlayersDB(this.dbName).subscribe(() => {
          this.getPlayersDBS();
          this.snackBar.showSuccessSnackbar('Database eliminato!');
        });
      }
    });
  }

  getCreateDatabaseEvent() {
    this.socketService.getEvent('database-created').subscribe((res: any) => {
      if (res.data === 'error') {
        localStorage.setItem('createStatus', 'false');
      }
      this.dbName = res.data[0].source;
      this.countPlayers = res.data[0].countPlayers;
      this.createdAt = res.data[0].createdAt;
      localStorage.setItem('createStatus', 'false');
      this.checkCreateStatus = false;
    });
  }

  getUpdateDatabaseEvent() {
    this.socketService.getEvent('database-updated').subscribe((res: any) => {
      if (res.data === 'error') {
        this.countPlayers = this.countPlayers;
        this.updatedAt = this.updatedAt;
        this.addedPlayers = this.addedPlayers;
        this.modifiedPlayers = this.modifiedPlayers;
      } else {
        this.countPlayers = res.data[0].countPlayers;
        this.updatedAt = res.data[0].updatedAt;
        this.addedPlayers = res.stats?.nUpserted;
        this.modifiedPlayers = res.stats?.nModified;
      }

      localStorage.setItem('updateStatus', 'false');
      this.checkUpdateStatus = false;
    });
  }

  onCheckCreateStatus() {
    if (localStorage.getItem('createStatus') === 'true') {
      this.checkCreateStatus = true;
    } else {
      this.checkCreateStatus = false;
    }
  }

  onCheckUpdateStatus() {
    if (localStorage.getItem('updateStatus') === 'true') {
      this.checkUpdateStatus = true;
    } else {
      this.checkUpdateStatus = false;
    }
  }

  onRestart() {
    this.checkUpdateStatus = false;
    this.checkCreateStatus = false;
    localStorage.setItem('updateStatus', 'false');
    localStorage.setItem('createStatus', 'false');
  }
}
