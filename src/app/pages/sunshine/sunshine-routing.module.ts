import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CityAddComponent } from './city/add/city.add.component';
import { DetailComponent } from './city/detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'add',
    component: CityAddComponent,
  },
  {
    path: 'detail',
    component: DetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SunshineRoutingModule {}
