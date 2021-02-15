import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/ui/material/app.module-material';

import { ContainerLayoutComponent } from './container/container.layout.component';
import { MainLayoutComponent } from './main/main.layout.component';
import { InitialLayoutComponent } from './initial/initial.layout.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [ContainerLayoutComponent, MainLayoutComponent, InitialLayoutComponent],
  exports: [ContainerLayoutComponent, MainLayoutComponent, InitialLayoutComponent],
})
export class LayoutsModule {}
