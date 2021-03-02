import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from "src/app/core/guards/admin.guard";

import { AdminHomeComponent } from './admin-home/admin-home.component';

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminHomeRoutingModule {}
