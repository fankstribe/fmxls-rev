import { NgModule } from "@angular/core";

import { AdminUsersRoutingModule } from './admin-users.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminUsersComponent } from './admin-users/admin-users.component';
import { EditUserDialogComponent } from "./edit-user-dialog/edit-user-dialog.component";

@NgModule({
  imports: [
    SharedModule,
    AdminUsersRoutingModule
  ],
  declarations: [
    AdminUsersComponent,
    EditUserDialogComponent
  ]
})
export class AdminUsersModule {}
