import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from '@app/ui/layouts/app.module-layouts';

import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorComponent } from './global-error/global-error.component';

import { ErrorRoutingModule } from './errors-routing.module';

@NgModule({
  imports: [CommonModule, RouterModule, LayoutsModule, ErrorRoutingModule],
  declarations: [NotFoundComponent, GlobalErrorComponent],
})
export class ErrosPagesModule {}
