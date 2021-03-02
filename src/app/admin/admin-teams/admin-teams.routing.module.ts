import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminTeamsComponent } from './admin-teams/admin-teams.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTeamsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeamsRoutingModule {}
