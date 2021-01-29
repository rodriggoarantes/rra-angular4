import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@app/../environments/environment';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CityUserStoreService } from '@app/stores/city-user-store.service';
import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';

import { CityWeather } from '@app/models/CityWeather';
import { City } from '@app/models/City';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private readonly api = `${environment.baseUrl}/preferences`;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private cityUserStore: CityUserStoreService,
    private weatherUserStore: CityWeatherStoreService
  ) {}

  public findCities(): Observable<Array<City>> {
    const user = this.userService.userValue;
    return this.http.get<Array<City>>(`${this.api}/${user._id}/cities`);
  }

  public findWeathers(): Observable<Array<CityWeather>> {
    const user = this.userService.userValue;
    return this.http
      .get<Array<CityWeather>>(`${this.api}/${user._id}/weathers`)
      .pipe(map((data: Array<any>) => data.map((item) => this._mapWeather(item))));
  }

  public loadCities() {
    this.findCities().subscribe(
      (list: Array<City>) => {
        if (list && list.length) {
          list.forEach((city) => {
            this.cityUserStore.store(city);
          });
        }
      },
      () => {
        console.log(`Falhas ao obter cidades`);
      }
    );
  }

  public loadWeathers() {
    this.findWeathers().subscribe(
      (list: Array<CityWeather>) => {
        if (list && list.length) {
          list.forEach((weather) => {
            this.weatherUserStore.store(weather);
          });
        }
      },
      () => {
        console.log(`Falhas ao obter climas`);
      }
    );
  }

  async add(city: City, weather: CityWeather) {
    if (!city || !city._id) {
      throw Error('Cidade não informada para armazenagem');
    }

    this.cityUserStore.store(city);
    this.weatherUserStore.store(weather);

    const user = this.userService.userValue;
    await this.http.post<void>(`${this.api}/${user._id}/cities/${city._id}`, {}).toPromise();
  }

  // --------------------

  private _mapWeather(item: any): CityWeather {
    return <CityWeather>{
      city: <City>{ _id: item.city_id, name: item.city, country: item.country },
      city_id: item.city_id,
      state: item.state,
      temp: item.temp,
      min: item.min,
      max: item.max,
      pressure: item.pressure,
      humidity: item.pressure,
      dt: new Date(item.dt),
      city_picture: item.city_picture,
    };
  }
}
