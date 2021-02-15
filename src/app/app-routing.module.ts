import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';
import { LoggedInGuard } from '@core/guards/loggedin.guard';

import { MainLayoutComponent } from '@app/ui/layouts/main/main.layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/sunshine', pathMatch: 'full' },
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthPagesModule),
  },
  {
    path: 'sunshine',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/sunshine/sunshine.module').then((m) => m.SunshineModule),
  },
  {
    path: 'errors',
    loadChildren: () => import('./pages/errors/errors.module').then((m) => m.ErrosPagesModule),
  },
  {
    path: '**',
    redirectTo: 'errors/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
