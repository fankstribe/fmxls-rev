import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixturesComponent } from './fixtures/fixtures.component';

const routes: Routes = [
  {
    path: '',
    component: FixturesComponent,
    data: { title: 'Calendari' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesRoutingModule {}
