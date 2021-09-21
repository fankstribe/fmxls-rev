import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { TournamentService } from '../../../core/services/tournament.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Tournament } from '../../../models/tournament';
import { EditTournamentDialogComponent } from '../edit-tournament-dialog/edit-tournament-dialog.component';
import { AddTournamentDialogComponent } from '../add-tournament-dialog/add-tournament-dialog.component';
import { EditMatchesDialogComponent } from '../edit-matches-dialog/edit-matches-dialog.component';

@Component({
  selector: 'app-admin-tournaments',
  templateUrl: './admin-tournaments.component.html',
  styleUrls: ['./admin-tournaments.component.scss']
})
export class AdminTournamentsComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);
  dataSource = new MatTableDataSource<Tournament>();

  noItems = false;

  isLoadingResults = true;

  displayedColumns: string[] = [
    'img',
    'tournamentName',
    'teams',
    'format',
    'status',
    'createdAt',
    'fixtures',
    'action'
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private tournamentService: TournamentService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.tournamentsTableList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string): string => {
      if (property === 'tournamentName') {
        return item.tournamentName.toLocaleLowerCase();
      } else if (property === 'format') {
        return item.format.toLocaleLowerCase();
      } else {
        return item[property];
      }
    }
    this.dataSource.paginator = this.paginator;
  }

  tournamentsTableList() {
    this.tournamentService.getTournaments().subscribe(list => {
      !list.length ? this.noItems = true : this.noItems = false;
      this.dataSource.data = list;
      this.isLoadingResults = false;
    })
  }

  doFilter($event: any) {
    const filterValue = $event.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';

    const dialogRef = this.d.open(AddTournamentDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.tournamentsTableList();
        this.snackBar.showSuccessSnackbar('Nuovo Torneo aggiunto!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  update(id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = {data: this.dataSource.data[id]};
    console.log(this.dataSource.data[id])

    const dialogRef = this.d.open(EditTournamentDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.tournamentsTableList();
        this.snackBar.showSuccessSnackbar('Torneo modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  delete(_id: string) {
    const data = this.dataSource.data[_id];
    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero eliminare questo torneo?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.tournamentService.deleteTournament(data._id).subscribe(() => {
          this.tournamentsTableList();
          this.snackBar.showSuccessSnackbar(`${data.tournamentName} eliminato con successo!`);
        });
      }
    })
  }

  onUpdateState(tournament: Tournament) {
    const id = tournament._id;
    const status = tournament.status;
    this.tournamentService.updateState(id, status).subscribe(res => {
      this.snackBar.showSuccessSnackbar(`Stato modificato!`);
    })
  }

  updateMatches(id: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '80%';
    dialogConfig.maxWidth = '640px';
    dialogConfig.maxHeight = '800px';
    dialogConfig.height = '80%';
    dialogConfig.data = {data: this.dataSource.data[id]};

    const dialogRef = this.d.open(EditMatchesDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('80%');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.tournamentsTableList();
        this.snackBar.showSuccessSnackbar('Torneo modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

}
