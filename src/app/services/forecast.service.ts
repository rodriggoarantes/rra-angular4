import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '@app/../environments/environment';

import { Forecast } from '@app/models/Forecast';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private readonly api = `${environment.baseUrl}/forecasts`;

  constructor(private readonly http: HttpClient) {}

  find(cityId: string): Observable<Array<Forecast>> {
    return this.http.get(`${this.api}/cities/${cityId}`).pipe(
      map((data: Array<any>) => data.map((item) => this._map(item))),
      catchError(this._handleError<Forecast[]>([]))
    );
  }

  private _map(item: any): Forecast {
    return <Forecast>{
      city: { _id: item.city_id, name: item.city, country: '' },
      city_id: item.city_id,
      state: item.state,
      temp: item.temp,
      min: item.min,
      max: item.max,
      pressure: item.pressure,
      humidity: item.humidity,
      dt: new Date(item.dt),
      date_txt: item.date_txt,
      city_picture: item.city_picture,
      weekday: this._dayName(item.dt),
      wind_speed: item.wind_speed,
    };
  }

  private _handleError<T>(result?: T) {
    return (): Observable<T> => of(result as T);
  }

  private _dayName(timevalue: number): string {
    const locale = 'pt-br';
    return new Date(timevalue).toLocaleDateString(locale, { weekday: 'short' });
  }
}
