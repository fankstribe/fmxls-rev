import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { ManagerService } from '../../../core/services/manager.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Manager } from '../../../models/manager';
import { EditManagerDialogComponent } from '../edit-manager-dialog/edit-manager-dialog.component';
import { AddManagerDialogComponent } from '../add-manager-dialog/add-manager-dialog.component';

@Component({
  selector: 'app-admin-managers',
  templateUrl: './admin-managers.component.html',
  styleUrls: ['./admin-managers.component.scss']
})
export class AdminManagersComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);
  dataSource = new MatTableDataSource<Manager>();
  noItems = false;
  isLoadingResults = true;

  displayedColumns: string[] = [
    'user',
    'team',
    'createdAt',
    'action'
  ];

  @ViewChild(MatTable) table: MatTable<Manager>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private managerService: ManagerService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.managersTableList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string): string => {
      if (property === 'user') {
        return item.user.toLocaleLowerCase();
      } else if (property === 'team') {
        return item.team.toLocaleLowerCase();
      } else {
        return item[property];
      }
    }
    this.dataSource.paginator = this.paginator;
  }

  managersTableList() {
    this.managerService.getManagers().subscribe(list => {
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

    const dialogRef = this.d.open(AddManagerDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.managersTableList();
        this.snackBar.showSuccessSnackbar('Nuovo Manager aggiunto!');
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

    const dialogRef = this.d.open(EditManagerDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
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

  delete(_id: string) {
    const data = this.dataSource.data[_id];

    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero eliminare questo manager?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.managerService.deleteManager(data._id).subscribe(() => {
          this.managersTableList();
          this.snackBar.showSuccessSnackbar(`Il manager ${data.user} è stato eliminato con successo!`);
        });
      }
    })
  }

  addRowData(manager: Manager): void {
    this.dataSource.data.push(manager);
    this.refreshTable();
  }

  updateRowData(manager: Manager): void {
    const i = this.dataSource.data.findIndex(el => el._id === manager._id);
    if (i !== -1) {
      this.dataSource.data[i] = manager;
      this.refreshTable();
    }
  }

  deleteRowData(_id: string): void {
    const i = this.dataSource.data.findIndex(el => el._id === _id);
    if (i !== -1) {
      this.dataSource.data.splice(i, 1);
      this.refreshTable();
    }
  }

  refreshTable() {
    this.dataSource.sort = this.sort;
    this.table.renderRows();
  }


}
