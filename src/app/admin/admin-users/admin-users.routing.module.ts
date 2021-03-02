import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersComponent } from './admin-users/admin-users.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {}
