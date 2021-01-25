import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/ui/material/app.module-material';

import { ContainerLayoutComponent } from './container/container.layout.component';
import { MainLayoutComponent } from './main/main.layout.component';
import { InitialLayoutComponent } from './initial/initial.layout.component';

@NgModule({
  imports: [CommonModule, BrowserModule, BrowserAnimationsModule, RouterModule, MaterialModule],
  declarations: [ContainerLayoutComponent, MainLayoutComponent, InitialLayoutComponent],
  exports: [ContainerLayoutComponent, MainLayoutComponent, InitialLayoutComponent],
})
export class LayoutsModule {}
