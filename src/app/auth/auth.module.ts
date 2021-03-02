import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
