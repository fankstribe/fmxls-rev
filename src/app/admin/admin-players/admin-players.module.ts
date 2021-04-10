
import { NgModule } from "@angular/core";

import { AdminPlayersRoutingModule } from './admin-players.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { EditTeamDialogComponent } from "./edit-players-dialog/edit-team-dialog.component";
import { AddTeamDialogComponent } from './add-players-dialog/add-team-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AdminPlayersRoutingModule
  ],
  declarations: [
    AdminPlayersComponent,
    AddTeamDialogComponent,
    EditTeamDialogComponent
  ]
})
export class AdminPlayersModule {}
