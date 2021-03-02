
import { NgModule } from "@angular/core";

import { AdminTournamentsRoutingModule } from './admin-tournaments.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminTournamentsComponent } from './admin-tournaments/admin-tournaments.component';
import { EditTournamentDialogComponent } from "./edit-tournament-dialog/edit-tournament-dialog.component";
import { AddTournamentDialogComponent } from './add-tournament-dialog/add-tournament-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AdminTournamentsRoutingModule
  ],
  declarations: [
    AdminTournamentsComponent,
    AddTournamentDialogComponent,
    EditTournamentDialogComponent
  ]
})
export class AdminTournamentsModule {}
