import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "@app/../environments/environment";
import { CityWeather } from "@app/models/CityWeather";

@Injectable({
  providedIn: "root"
})
export class WeatherService {
  private readonly api = `${environment.baseUrl}/weathers`;

  constructor(public http: HttpClient) {}

  getWeather(cityId: string): Observable<CityWeather> {
    return this.http.get(`${this.api}/cities/${cityId}`).pipe(
      map(
        (item: any) =>
          <CityWeather>{
            city: { _id: cityId, name: item.city },
            state: item.state,
            temp: item.temp,
            min: item.min,
            max: item.max,
            pressure: item.pressure,
            humidity: item.pressure,
            dt: item.dt
          }
      )
    );
  }
}
