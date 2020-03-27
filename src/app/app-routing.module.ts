import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainLayoutComponent } from "./pages/layouts/main/main.layout.component";

import { HomeComponent } from "./pages/home/home.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { CityAddComponent } from "./pages/city/add/city.add.component";
import { ManageComponent } from "./pages/city/manage/manage.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "sunshine",
    component: MainLayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        component: HomeComponent
      },
      {
        path: "add",
        component: CityAddComponent
      },
      {
        path: "manage",
        component: ManageComponent
      }
    ]
  },
  {
    path: "**",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
