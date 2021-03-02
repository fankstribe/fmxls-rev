import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '',
    component: ProfileComponent,
    data: { title: 'Profilo' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
