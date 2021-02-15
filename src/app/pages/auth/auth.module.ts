import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '@app/ui/material/app.module-material';
import { LayoutsModule } from '@app/ui/layouts/app.module-layouts';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, MaterialModule, LayoutsModule, AuthRoutingModule],
  declarations: [LoginComponent, SignupComponent],
})
export class AuthPagesModule {}
