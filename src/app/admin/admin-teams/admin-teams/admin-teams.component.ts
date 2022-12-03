import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  BreakpointState,
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { TeamService } from '../../../core/services/team.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Team } from '../../../models/team';
import { EditTeamDialogComponent } from '../edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from '../add-team-dialog/add-team-dialog.component';
import { AppService } from '../../../core/services/app.service';
import {
  CommonChild,
  eventSubscriber,
} from '../../../interfaces/common-child.interface';
import { filterTable } from '../../../../shared/utils/filter-table';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss'],
})
export class AdminTeamsComponent
  implements OnInit, AfterViewInit, CommonChild, OnDestroy
{
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([
    Breakpoints.XSmall,
  ]);
  dataSource = new MatTableDataSource<Team>();
  noItems = false;
  noManager = 'assets/images/no_manager.png';
  itemsCount: number;
  isFiltered = false;

  filterValue = {};

  displayedColumns: string[] = [
    'img',
    'teamName',
    'user',
    'createdAt',
    'action',
  ];

  filterSelectObj = [];

  @ViewChild(MatTable) table: MatTable<Team>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private teamService: TeamService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService,
    private appService: AppService
  ) {
    this.add = this.add.bind(this);
    eventSubscriber(appService.openSubscription, this.add);

    this.filterSelectObj = [
      {
        name: 'TEAMNAME',
        columnProp: 'teamName',
        options: [],
      },
      {
        name: 'USER',
        columnProp: 'user',
        options: [],
      },
      {
        name: 'CREATEDAT',
        columnProp: 'createdAt',
        options: [],
      },
    ];
    this.isFiltered = false;
  }

  ngOnInit() {
    this.teamsTableList();
    this.dataSource.filterPredicate = filterTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string) => {
      if (property === 'teamName') {
        return item.teamName.toLocaleLowerCase();
      } else if (property === 'user') {
        return item.user?.toLocaleLowerCase();
        // } else if (property === 'createdAt') {
        //   return new Date(item.createdAt);
      } else {
        return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = '';
  }

  resetFilters() {
    this.filterValue = {};
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
    this.isFiltered = false;
    this.noItems = false;
  }

  teamsTableList() {
    this.teamService.getTeams().subscribe((list) => {
      !list.length ? (this.noItems = true) : (this.noItems = false);
      this.dataSource.data = list;
      this.itemsCount = list.length;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.teamName.toLocaleLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  add() {
    this.resetFilters();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';

    const dialogRef = this.d.open(AddTeamDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res);
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
    dialogConfig.data = { data: this.dataSource.data[id] };

    const dialogRef = this.d.open(EditTeamDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateRowData(res);
        this.snackBar.showSuccessSnackbar('Squadra modificata!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  // tslint:disable-next-line: variable-name
  delete(_id: number) {
    const data = this.dataSource.data[_id];
    const dialogRef = this.dialogService.confirmDialog(
      'Vuoi davvero eliminare questa squadra?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.teamService.deleteTeam(data._id).subscribe(() => {
          this.deleteRowData(data._id);
          this.resetFilters();
          this.snackBar.showSuccessSnackbar(
            `${data.teamName} eliminato con successo!`
          );
        });
      }
    });
  }

  filterData() {
    if (this.isFiltered) {
      this.resetFilters();
      return false;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = { data: this.dataSource.data };

    const dialogRef = this.d.open(FilterDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        Object.values(res).every((o) => o === '')
          ? (this.noItems = true)
          : (this.noItems = false);
        Object.keys(res).forEach((key) => {
          if (res[key] === '') {
            delete res[key];
          }
        });
        this.isFiltered = true;

        this.filterValue = res;
        this.dataSource.filter = JSON.stringify(this.filterValue);
        console.log(this.dataSource.filter);
      }
      smallDialogSub.unsubscribe();
    });
  }

  addRowData(team: Team): void {
    this.dataSource.data.push(team);
    this.refreshTable();
  }

  // tslint:disable-next-line: variable-name
  deleteRowData(_id: number): void {
    const i = this.dataSource.data.findIndex((el) => el._id === _id);
    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.refreshTable();
    }
  }

  updateRowData(team: Team): void {
    const i = this.dataSource.data.findIndex((el) => el._id === team._id);
    if (i !== -1) {
      this.dataSource.data[i] = team;
      this.refreshTable();
    }
  }

  refreshTable() {
    this.dataSource.sort = this.sort;
    this.table.renderRows();
    this.dataSource._updateChangeSubscription();
  }

  ngOnDestroy() {
    eventSubscriber(this.appService.openSubscription, this.add, true);
  }
}
