import { NgModule } from "@angular/core";

import { AdminManagersRoutingModule } from './admin-managers.routing.module';

import { SharedModule } from '../../../shared/shared.module';

import { AdminManagersComponent } from './admin-managers/admin-managers.component';
import { EditManagerDialogComponent } from "./edit-manager-dialog/edit-manager-dialog.component";
import { AddManagerDialogComponent } from './add-manager-dialog/add-manager-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    AdminManagersRoutingModule
  ],
  declarations: [
    AdminManagersComponent,
    AddManagerDialogComponent,
    EditManagerDialogComponent
  ]
})
export class AdminManagersModule {}
