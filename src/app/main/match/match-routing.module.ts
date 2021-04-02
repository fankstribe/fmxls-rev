import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchComponent } from './match/match.component';

const routes: Routes = [
  {
    path: ':id',
    component: MatchComponent,
    data: { title: 'Incontro' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule {}
