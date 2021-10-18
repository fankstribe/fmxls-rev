import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { TeamService } from '../../../core/services/team.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Team } from '../../../models/team';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);

  dataSource = new MatTableDataSource<Team>();

  noItems = false;
  noManager = 'assets/images/no_manager.png';

  isLoadingResults = true;

  displayedColumns: string[] = [
    'img',
    'teamName',
    'user',
    'createdAt',
    'action'
  ];

  @ViewChild(MatTable) table: MatTable<Team>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private teamService: TeamService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.teamsTableList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string): string => {
      if (property === 'teamName') {
        return item.teamName.toLocaleLowerCase();
      } else if (property === 'user') {
        return item.user?.toLocaleLowerCase();
      } else {
        return item[property];
      }
    }
    this.dataSource.paginator = this.paginator;
  }

  teamsTableList() {
    this.teamService.getTeams().subscribe(list => {
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

    const dialogRef = this.d.open(AddTeamDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.addRowData(res.team);
        this.snackBar.showSuccessSnackbar('Nuova Squadra aggiunta!');
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

    const dialogRef = this.d.open(EditTeamDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateRowData(res.team)
        this.snackBar.showSuccessSnackbar('Squadra modificata!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  delete(_id: number) {
    const data = this.dataSource.data[_id];
    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero eliminare questa squadra?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.teamService.deleteTeam(data._id).subscribe(() => {
          this.deleteRowData(data._id);
          this.snackBar.showSuccessSnackbar(`${data.teamName} eliminato con successo!`);
        });
      }
    })
  }

  addRowData(team: Team): void {
    this.dataSource.data.push(team);
    this.refreshTable();
  }

  deleteRowData(_id: number): void {
    const i = this.dataSource.data.findIndex(el => el._id === _id);
    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.refreshTable();
    }
  }


  updateRowData(team: Team): void {
    const i = this.dataSource.data.findIndex(el => el._id === team._id);
    if (i !== -1) {
      this.dataSource.data[i] = team;
      this.refreshTable();
    }
  }

  refreshTable() {
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }

}
