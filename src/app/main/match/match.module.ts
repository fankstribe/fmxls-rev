import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { MatchComponent } from './match/match.component';
import { MatchRoutingModule } from './match-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatchRoutingModule
  ],
  declarations: [MatchComponent]
})
export class MatchModule {}
