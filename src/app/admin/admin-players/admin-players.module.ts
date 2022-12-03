import { NgModule } from '@angular/core';

import { AdminPlayersRoutingModule } from './admin-players.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { EditPlayerDialogComponent } from './edit-player-dialog/edit-player-dialog.component';
import { AddPlayerDialogComponent } from './add-players-dialog/add-player-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@NgModule({
  imports: [SharedModule, AdminPlayersRoutingModule],
  declarations: [
    AdminPlayersComponent,
    AddPlayerDialogComponent,
    EditPlayerDialogComponent,
    FilterDialogComponent,
  ],
})
export class AdminPlayersModule {}
