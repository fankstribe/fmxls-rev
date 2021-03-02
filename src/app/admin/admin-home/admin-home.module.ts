import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../../shared/shared.module';
import { AdminHomeRoutingModule } from './admin-home-routing.module';

import { AdminHomeComponent } from './admin-home/admin-home.component';

@NgModule({
  declarations: [
    AdminHomeComponent
  ],
  imports: [
    SharedModule,
    AdminHomeRoutingModule
  ]
})
export class AdminHomeModule { }
