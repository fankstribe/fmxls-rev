import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AdminManagersComponent } from './admin-managers/admin-managers.component';

const routes: Routes = [
  {
    path: '',
    component: AdminManagersComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagersRoutingModule {}
