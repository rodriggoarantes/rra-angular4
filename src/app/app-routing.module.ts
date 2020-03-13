import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CityAddComponent } from "./pages/city/add/city.add.component";
import { ManageComponent } from "./pages/city/manage/manage.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: "add",
    pathMatch: "full",
    component: CityAddComponent
  },
  {
    path: "manage",
    pathMatch: "full",
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
