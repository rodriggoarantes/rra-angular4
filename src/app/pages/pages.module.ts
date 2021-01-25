import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/ui/material/app.module-material';
import { ComponentsUIModule } from '@app/ui/components/app.module-components';
import { LayoutsModule } from '@app/ui/layouts/app.module-layouts';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';

import { HomeComponent } from './home/home.component';
import { CityAddComponent } from './city/add/city.add.component';
import { ManageComponent } from './city/manage/manage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutsModule,
    ComponentsUIModule,
  ],
  declarations: [
    HomeComponent,
    CityAddComponent,
    ManageComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    GlobalErrorComponent,
  ],
})
export class PagesModule {}
