import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { TopnavComponent } from './main-layout/topnav/topnav.component';
import { SidenavComponent } from './main-layout/sidenav/sidenav.component';
import { TeamPanelComponent } from './main-layout/sidenav/team-panel/team-panel.component';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule
  ],
  declarations: [
    MainLayoutComponent,
    TopnavComponent,
    SidenavComponent,
    TeamPanelComponent
  ]
})
export class MainModule {}
