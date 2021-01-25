import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/ui/material/app.module-material';
import { ComponentsUIModule } from '@app/ui/components/app.module-components';
import { LayoutsModule } from '@app/ui/layouts/app.module-layouts';

import { HomeComponent } from './home/home.component';
import { CityAddComponent } from './city/add/city.add.component';
import { ManageComponent } from './city/manage/manage.component';

import { SunshineRoutingModule } from './sunshine-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutsModule,
    ComponentsUIModule,
    SunshineRoutingModule,
  ],
  declarations: [HomeComponent, CityAddComponent, ManageComponent],
})
export class SunshineModule {}
