import { NgModule } from '@angular/core';

import { AdminTeamsRoutingModule } from './admin-teams.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { EditTeamDialogComponent } from './edit-team-dialog/edit-team-dialog.component';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@NgModule({
  imports: [SharedModule, AdminTeamsRoutingModule],
  declarations: [
    AdminTeamsComponent,
    AddTeamDialogComponent,
    EditTeamDialogComponent,
    FilterDialogComponent,
  ],
})
export class AdminTeamsModule {}
