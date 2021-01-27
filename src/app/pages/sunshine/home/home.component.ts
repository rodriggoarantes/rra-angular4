import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CityWeather } from '@app/models/CityWeather';
import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';
import { City } from '@app/models/City';
import { CityUserStoreService } from '@app/stores/city-user-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userCities: Observable<City[]>;

  constructor(public cityStore: CityUserStoreService) {}

  ngOnInit() {
    this._loading();
  }

  private _loading() {
    this.userCities = this.cityStore.cities$;
  }
}
