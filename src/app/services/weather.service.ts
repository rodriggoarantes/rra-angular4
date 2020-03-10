import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { first, map } from "rxjs/operators";

import { environment } from "@app/../environments/environment";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private readonly apiURL = "https://api.openweathermap.org/data/2.5";
  private readonly weatherURL = `${this.apiURL}/weather?q=`;
  private readonly forecastURL = `${this.apiURL}/forecast?q=`;
  private readonly appID = environment.appID;

  constructor(public http: HttpClient) {}

  getWeather(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Observable<any> {
    return this.http
      .get(`${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(first());
  }

  getForecast(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Observable<any> {
    return this.http
      .get(`${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .pipe(
        first(),
        map(weather => weather["list"])
      );
  }

  getCitiesWeathersByNames(
    cities: Array<string>,
    metric: "metric" | "imperial" = "metric"
  ): Subject<any> {
    const citiesSubject = new Subject();
    cities.forEach(city => {
      citiesSubject.next(
        this.http.get(
          `${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`
        )
      );
    });
    return citiesSubject;
  }

  getWeatherState(city: string): Subject<string> {
    const dataSubject = new Subject<string>();
    this.http
      .get(`${this.weatherURL}${city}&APPID=${this.appID}`)
      .subscribe(data => {
        dataSubject.next(data["weather"][0].main);
      });
    return dataSubject;
  }

  getCurrentTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http
      .get(`${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
    return dataSubject;
  }

  getCurrentHum(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http
      .get(`${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        console.log(weather);
        dataSubject.next(weather.main.humidity);
      });
    return dataSubject;
  }

  getCurrentWind(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http
      .get(`${this.weatherURL}${city}&units=${metric}&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Math.round(weather.wind.speed)));
      });
    return dataSubject;
  }

  getMaxTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSubject = new Subject<number>();
    let max: number;
    this.http
      .get(`${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        max = weather.list[0].main.temp;
        weather.list.forEach(value => {
          if (max < value.main.temp) {
            max = value.main.temp;
          }
        });
        dataSubject.next(Math.round(max));
      });
    return dataSubject;
  }

  getMinTemp(
    city: string,
    metric: "metric" | "imperial" = "metric"
  ): Subject<number> {
    const dataSubject = new Subject<number>();
    let min: number;
    this.http
      .get(`${this.forecastURL}${city}&units=${metric}&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        min = weather.list[0].main.temp;
        weather.list.forEach(value => {
          if (min > value.main.temp) {
            min = value.main.temp;
          }
        });
        dataSubject.next(Math.round(min));
      });
    return dataSubject;
  }
}
