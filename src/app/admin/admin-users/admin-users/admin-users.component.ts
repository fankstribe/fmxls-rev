import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { UserService } from '../../../core/services/user.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { User } from '../../../models/user';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);

  dataSource = new MatTableDataSource<User>();

  isLoadingResults = true;

  displayedColumns: string[] = [
    'img',
    'name',
    'email',
    'role',
    'createdAt',
    'action'
  ];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService
  ) {}

  ngOnInit() {
    this.usersTableList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property: string): string => {
      if (property === 'name') {
        return item.name.toLocaleLowerCase();
      } else {
        return item[property];
      }
    }
    this.dataSource.paginator = this.paginator;
  }

  usersTableList() {
    this.userService.getUsers().subscribe(list => {
      this.dataSource.data = list;
      this.isLoadingResults = false;
    })
  }

  doFilter($event: any) {
    const filterValue = $event.target.value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  update(uid: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = {data: this.dataSource.data[uid]};

    const dialogRef = this.d.open(EditUserDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.usersTableList();
        this.snackBar.showSuccessSnackbar('Utente modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  editRole(user: User) {
    this.userService.updateUser(user).subscribe(res => {
      this.snackBar.showSuccessSnackbar(`Ruolo e permessi modificati!`);
    })
  }

  delete(uid: string) {
    const data = this.dataSource.data[uid];
    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero eliminare questo utente?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.userService.deleteUser(data.uid).subscribe(() => {
          this.usersTableList();
          this.snackBar.showSuccessSnackbar(`L'utente ${data.name} è stato eliminato con successo!`);
        });
      }
    })
  }

}
