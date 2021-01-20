import { InitialLayoutComponent } from './pages/layouts/initial/initial.layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

import { MainLayoutComponent } from './pages/layouts/main/main.layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CityAddComponent } from './pages/city/add/city.add.component';
import { ManageComponent } from './pages/city/manage/manage.component';
import { LoginComponent } from './pages/login/login.component';

import { InitialData } from './models/InitialData';

const routes: Routes = [
  { path: '', redirectTo: '/sunshine', pathMatch: 'full' },
  {
    path: 'login',
    component: InitialLayoutComponent,
    data: <InitialData>{
      title: 'Login',
      notice: 'Não possui uma conta?',
      routeUrl: '/signup',
      routeName: 'CADASTRAR',
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'signup',
    component: InitialLayoutComponent,
    data: <InitialData>{
      title: 'Cadastrar',
      notice: 'Já possui uma conta?',
      routeUrl: '/login',
      routeName: 'LOGIN',
    },
    children: [
      {
        path: '',
        component: SignupComponent,
      },
    ],
  },
  {
    path: 'sunshine',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
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
        path: 'manage',
        component: ManageComponent,
      },
    ],
  },
  {
    path: 'error',
    component: GlobalErrorComponent,
    data: {
      title: 'Error',
    },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: {
      title: 'Not found',
    },
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
