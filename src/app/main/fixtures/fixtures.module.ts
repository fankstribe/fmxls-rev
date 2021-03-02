import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { FixturesComponent } from './fixtures/fixtures.component';
import { FixturesRoutingModule } from './fixtures-routing.module';

@NgModule({
  imports: [
    SharedModule,
    FixturesRoutingModule
  ],
  declarations: [FixturesComponent]
})
export class FixturesModule {}
