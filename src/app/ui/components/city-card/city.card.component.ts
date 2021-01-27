import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { UiService } from '@app/services/ui.service';

import { CityWeather } from '@app/models/CityWeather';
import { CityUserStoreService } from '@app/stores/city-user-store.service';
import { City } from '@app/models/City';

@Component({
  selector: 'app-city-card',
  templateUrl: './city.card.component.html',
  styleUrls: ['./city.card.component.css'],
})
export class CityCardComponent implements OnInit, OnDestroy {
  @Input() weather: CityWeather = <CityWeather>{};

  darkMode: boolean;
  added: boolean = false;

  private themeSubs: Subscription;
  private cityWeatherStored: Subscription;

  constructor(public router: Router, public uiService: UiService, public cityStore: CityUserStoreService) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this._verifySelected();
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
    this.cityWeatherStored.unsubscribe();
  }

  public addCity() {
    this.cityStore.store(this.weather.city);
  }

  private _verifySelected() {
    this.cityWeatherStored = this.cityStore.cities$.subscribe((list: Array<City>) => {
      if (list && this.weather && this.weather.city) {
        this.added = list.map((city) => city._id).includes(this.weather.city._id);
      }
    });
  }
}
