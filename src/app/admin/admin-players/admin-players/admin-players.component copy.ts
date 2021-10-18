import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

import { PlayerService } from '../../../core/services/player.service';
import { DialogService } from '../../../core/services/dialog.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Player } from '../../../models/player';
import { EditPlayerDialogComponent } from '../edit-player-dialog/edit-player-dialog.component';
import { AddPlayerDialogComponent } from '../add-players-dialog/add-player-dialog.component';

@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.scss']
})
export class AdminPlayersComponent implements OnInit, AfterViewInit {
  isSmall: Observable<BreakpointState> = this.breakpointObs.observe([Breakpoints.XSmall]);

  dataSource = new MatTableDataSource<Player>();

  noItems = false;
  noPlayer = 'assets/images/no_player.png';

  isLoadingResults = true;

  displayedColumns: string[] = [
    'img',
    'playerName',
    'position',
    'age',
    'overall',
    'team',
    'value',
    'wage',
    'action'
  ];

  @ViewChild(MatTable) table: MatTable<Player>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private playerService: PlayerService,
    private d: MatDialog,
    private dialogService: DialogService,
    private breakpointObs: BreakpointObserver,
    private snackBar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.playersTableList();
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
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLocaleLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }
    this.dataSource.paginator = this.paginator;
  }

  playersTableList() {

    this.playerService.getPlayers().subscribe(list => {
      !list.length ? this.noItems = true : this.noItems = false;
      this.dataSource.data = list;
      this.isLoadingResults = false;

    })
  }

  doFilter($event: any) {
    const filterValue = $event.target.value;
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
    dialogConfig.data = {data: this.dataSource.data[id]};

    const dialogRef = this.d.open(EditPlayerDialogComponent, dialogConfig);

    const smallDialogSub = this.isSmall.subscribe(size => {
      if (size.matches) {
        dialogRef.updateSize('100%', '100%');
      } else {
        dialogRef.updateSize('500px');
      }
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.table.renderRows();
        this.snackBar.showSuccessSnackbar('Giocatore modificato!');
      }
      smallDialogSub.unsubscribe();
    });
  }

  delete(_id: string) {
    const data = this.dataSource.data[_id];
    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero eliminare questo giocatore?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.playerService.deletePlayer(data._id).subscribe(() => {
          this.playersTableList();
          this.snackBar.showSuccessSnackbar(`${data.playerName} eliminato con successo!`);
        });
      }
    })
  }

  removeTeam(player: Player) {
    const data =
      {
        _id: player._id,
        playerName: player.playerName,
        img: player.img,
        age: player.age,
        position: player.position,
        overall: player.overall,
        value: player.value,
        wage: player.wage,
        source: player.source,
        team: null
      }

    const dialogRef = this.dialogService.confirmDialog('Vuoi davvero svincolare questo giocatore?');
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.playerService.updatePlayer(data).subscribe(() => {
          this.playersTableList();
          this.snackBar.showSuccessSnackbar('Il giocatore è stato svincolato con successo!');
        });
      }
    })
  }

  refreshTable() {
    this.table.renderRows();
  }

}
