import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ChangeDetectorRef,
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

import { PlayerService } from '../../../core/services/player.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Player } from '../../../models/player';
import { EditPlayerDialogComponent } from '../edit-player-dialog/edit-player-dialog.component';
import { AddPlayerDialogComponent } from '../add-players-dialog/add-player-dialog.component';
import { filterTable } from '../../../../shared/utils/filter-table';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss'],
})
export class AdminPlayersComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([
    Breakpoints.XSmall,
  ]);
  dataSource = new MatTableDataSource<Player>();
  noItems = false;
  noPlayer = 'assets/images/no_player.png';
  itemsCount: number;
  isFiltered = false;

  filterValue = {};

  displayedColumns: string[] = [
    'img',
    'playerName',
    'position',
    'age',
    'overall',
    'team',
    'value',
    'wage',
    'action',
  ];

  filterSelectObj = [];

  @ViewChild(MatTable) table: MatTable<Player>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private playerService: PlayerService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
    this.filterSelectObj = [
      {
        name: 'POSITION',
        columnProp: 'position',
        options: [],
      },
      {
        name: 'AGE',
        columnProp: 'age',
        options: [],
      },
      {
        name: 'OVERALL',
        columnProp: 'overall',
        options: [],
      },
      {
        name: 'TEAM',
        columnProp: 'team',
        options: [],
      },
      {
        name: 'VALUE',
        columnProp: 'value',
        options: [],
      },
      {
        name: 'WAGE',
        columnProp: 'wage',
        options: [],
      },
    ];
    this.isFiltered = false;
  }

  ngOnInit() {
    this.playersTableList();
    this.dataSource.filterPredicate = filterTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      item: any,
      property: string
    ): string => {
      if (property === 'teamName') {
        return item.teamName.toLocaleLowerCase();
      } else if (property === 'user') {
        return item.user?.toLocaleLowerCase();
      } else {
        return item[property];
      }
    };
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = '';
  }

  trackById(index: any, el: any) {
    return el.id;
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

  playersTableList() {
    this.playerService.getPlayers().subscribe((list) => {
      !list.length ? (this.noItems = true) : (this.noItems = false);

      this.dataSource.data = list;
      this.itemsCount = list.length;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.playerName.toLocaleLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  add() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = false;
    // dialogConfig.width = '500px';
    // dialogConfig.maxWidth = '100vw';
    // dialogConfig.maxHeight = '100%';
    // const dialogRef = this.d.open(AddTeamDialogComponent, dialogConfig);
    // const smallDialogSub = this.isSmall.subscribe(size => {
    //   if (size.matches) {
    //     dialogRef.updateSize('100%', '100%');
    //   } else {
    //     dialogRef.updateSize('500px');
    //   }
    // });
    // dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     this.teamsTableList();
    //     this.snackBar.showSuccessSnackbar('Nuova Squadra aggiunta!');
    //   }
    //   smallDialogSub.unsubscribe();
    // });
  }

  update(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100%';
    dialogConfig.data = { data: this.dataSource.data[id] };

    const dialogRef = this.d.open(EditPlayerDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe((size) => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.updateRowData(res.player);
        this.snackBar.showSuccessSnackbar('Giocatore modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  delete(_id: number) {
    const data = this.dataSource.data[_id];
    console.log(_id);
    const dialogRef = this.dialogService.confirmDialog(
      'Vuoi davvero eliminare questo giocatore?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.playerService.deletePlayer(data._id).subscribe(() => {
          this.deleteRowData(data._id);
          this.snackBar.showSuccessSnackbar(
            `${data.playerName} eliminato con successo!`
          );
        });
      }
    });
  }

  removeTeam(player: Player) {
    const data = {
      _id: player._id,
      playerName: player.playerName,
      img: player.img,
      age: player.age,
      position: player.position,
      overall: player.overall,
      value: player.value,
      wage: player.wage,
      source: player.source,
      team: null,
    };

    const dialogRef = this.dialogService.confirmDialog(
      'Vuoi davvero svincolare questo giocatore?'
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.playerService.updatePlayer(data).subscribe(() => {
          this.updateRowData(data);
          this.snackBar.showSuccessSnackbar(
            'Il giocatore è stato svincolato con successo!'
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
        Object.keys(res).forEach((k) => {
          res[k] = res[k].toString();
        });
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

  updateRowData(player: Player): void {
    const i = this.dataSource.data.findIndex((el) => el._id === player._id);
    if (i !== -1) {
      this.dataSource.data[i] = player;
      this.refreshTable();
    }
  }

  deleteRowData(_id: number): void {
    const i = this.dataSource.data.findIndex((el) => el._id === _id);
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
