import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournamentsComponent } from './tournaments/tournaments.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TablesComponent } from './tables/tables.component';

const routes: Routes = [
  {
    path: '',
    component: TournamentsComponent,
    children: [
      {
        path: 'fixtures/:id',
        component: FixturesComponent,
        data: { title: 'Risultati' },
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: { title: 'Classifica' },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentsRoutingModule {}
