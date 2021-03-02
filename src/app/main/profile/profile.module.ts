import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { EditNameDialogComponent } from './edit-name-dialog/edit-name-dialog.component';
import { EditEmailDialogComponent } from './edit-email-dialog/edit-email-dialog.component';
import { EditBirthDateDialogComponent } from './edit-birth-date-dialog/edit-birth-date-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    EditNameDialogComponent,
    EditEmailDialogComponent,
    EditBirthDateDialogComponent
  ]
})
export class ProfileModule {}
