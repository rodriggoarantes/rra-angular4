import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InitialLayoutComponent } from '@app/ui/layouts/initial/initial.layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { InitialData } from '@app/models/InitialData';

export const routes: Routes = [
  {
    path: 'login',
    component: InitialLayoutComponent,
    data: <InitialData>{
      title: 'Login',
      notice: 'Não possui uma conta?',
      routeUrl: '/auth/signup',
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
      routeUrl: '/auth/login',
      routeName: 'LOGIN',
    },
    children: [
      {
        path: '',
        component: SignupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
