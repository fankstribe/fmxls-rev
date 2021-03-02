import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminTournamentsComponent } from './admin-tournaments/admin-tournaments.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTournamentsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTournamentsRoutingModule {}
