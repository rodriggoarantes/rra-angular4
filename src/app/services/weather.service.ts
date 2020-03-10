import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";

import { environment } from "@app/../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private readonly apiURL = "https://api.openweathermap.org/data/2.5";
  private readonly baseURL = `${this.apiURL}/weather?q=`;
  private readonly forcastURL = `${this.apiURL}/forecast?q=`;
  private readonly appID = environment.appID;

  constructor(public http: HttpClient) {}

  getWeather(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Observable<any> {
    return this.http
      .get(`${this.baseURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first());
  }

  getForecast(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Observable<any> {
    return this.http
      .get(`${this.forcastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(
        first(),
        map(weather => weather["list"])
      );
  }
}
