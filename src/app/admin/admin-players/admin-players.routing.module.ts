import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminPlayersComponent } from './admin-players/admin-players.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPlayersComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPlayersRoutingModule {}
