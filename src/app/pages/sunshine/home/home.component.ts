import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CityWeather } from '@app/models/CityWeather';
import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';
import { City } from '@app/models/City';
import { CityUserStoreService } from '@app/stores/city-user-store.service';
import { CityService } from '@app/services/city.service';
import { WeatherService } from '@app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userCities: Observable<City[]>;

  constructor(
    public cityUserStore: CityUserStoreService,
    public cityService: CityService,
    public weatherService: WeatherService
  ) {
    this._loading();
  }

  ngOnInit() {
    this._loadCities();
  }

  private _loading() {
    const cities = this.cityUserStore.value;
    if (!cities || !cities.length) {
    }
  }

  private _loadCities() {
    this.userCities = this.cityUserStore.cities$;
  }
}
