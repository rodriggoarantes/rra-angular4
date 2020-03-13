import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "@components/material/app.module-material";
import { WeatherIconComponent } from "./components/weather-icon/icon.component";
import { CardComponent } from "@components/weather-card/card.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddCardComponent } from "./components/add-card/add-card.component";

import { HomeComponent } from "@app/pages/home/home.component";
import { CityAddComponent } from "@app/pages/city/add/city.add.component";
import { ManageComponent } from "@app/pages/city/manage/manage.component";

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    HomeComponent,
    WeatherIconComponent,
    AddCardComponent,
    CityAddComponent,
    ManageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
