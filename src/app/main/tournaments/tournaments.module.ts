import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { TournamentsRoutingModule } from './tournaments-routing.module';

import { TournamentsComponent } from './tournaments/tournaments.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TablesComponent } from './tables/tables.component';

@NgModule({
  imports: [
    SharedModule,
    TournamentsRoutingModule
  ],
  declarations: [
    FixturesComponent,
    TournamentsComponent,
    TablesComponent
  ]
})
export class TournamentsModule {}
