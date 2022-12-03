import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminTopnavComponent } from './admin-layout/admin-topnav/admin-topnav.component';
import { AdminSidenavComponent } from './admin-layout/admin-sidenav/admin-sidenav.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminTopnavComponent,
    AdminSidenavComponent,
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
