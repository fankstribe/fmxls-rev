import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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

import { UserService } from '../../../core/services/user.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { User } from '../../../models/user';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { filterTable } from '../../../../shared/utils/filter-table';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([
    Breakpoints.XSmall,
  ]);
  dataSource = new MatTableDataSource<User>();
  itemsCount: number;
  isFiltered = false;
  noItems = false;

  filterValue = {};

  displayedColumns: string[] = [
    'img',
    'name',
    'email',
    'role',
    'createdAt',
    'action',
  ];

  filterSelectObj = [];

  @ViewChild(MatTable) table: MatTable<User>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {
    this.filterSelectObj = [
      {
        name: 'EMAIL',
        columnProp: 'email',
        options: [],
      },
      {
        name: 'ROLE',
        columnProp: 'role',
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
    this.usersTableList();
    this.dataSource.filterPredicate = filterTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      item: any,
      property: string
    ): string => {
      if (property === 'name') {
        return item.name.toLocaleLowerCase();
      } else {
        return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = '';
  }

  usersTableList() {
    this.userService.getUsers().subscribe((list) => {
      this.dataSource.data = list;
      this.itemsCount = list.length;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.name.toLocaleLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
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

  update(uid: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = { data: this.dataSource.data[uid] };

    const dialogRef = this.d.open(EditUserDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateRowData(res.user);
        this.snackBar.showSuccessSnackbar('Utente modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  editRole(user: User) {
    this.userService.updateUser(user).subscribe((res) => {
      this.snackBar.showSuccessSnackbar(`Ruolo e permessi modificati!`);
    });
  }

  delete(uid: string) {
    const data = this.dataSource.data[uid];
    const dialogRef = this.dialogService.confirmDialog(
      'Vuoi davvero eliminare questo utente?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.userService.deleteUser(data.uid).subscribe(() => {
          this.deleteRowData(data.uid);
          this.resetFilters();
          this.snackBar.showSuccessSnackbar(
            `L'utente ${data.name} è stato eliminato con successo!`
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
        console.log(res);
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
      }
      smallDialogSub.unsubscribe();
    });
  }

  updateRowData(user: User): void {
    const i = this.dataSource.data.findIndex((el) => el.uid === user.uid);
    if (i !== -1) {
      this.dataSource.data[i] = user;
      this.refreshTable();
    }
  }

  deleteRowData(uid: number): void {
    const i = this.dataSource.data.findIndex((el) => el.uid === uid);
    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.refreshTable();
    }
  }

  refreshTable() {
    this.dataSource.sort = this.sort;
    this.table.renderRows();
    this.dataSource._updateChangeSubscription();
  }
}
