import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@components/material/app.module-material';
import { WeatherIconComponent } from './components/weather-icon/icon.component';
import { CardComponent } from '@components/weather-card/card.component';
import { AddCardComponent } from '@components/add-card/add-card.component';
import { CityCardComponent } from '@components/city-card/city.card.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorsModule } from './errors/errors.module';

import { MainLayoutComponent } from '@app/pages/layouts/main/main.layout.component';
import { InitialLayoutComponent } from '@app/pages/layouts/initial/initial.layout.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { CityAddComponent } from '@app/pages/city/add/city.add.component';
import { ManageComponent } from '@app/pages/city/manage/manage.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { SignupComponent } from '@app/pages/signup/signup.component';

import { AuthErrorInterceptor } from './interceptors/auth.error.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    InitialLayoutComponent,
    CardComponent,
    HomeComponent,
    WeatherIconComponent,
    AddCardComponent,
    CityAddComponent,
    CityCardComponent,
    ManageComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    ErrorsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
