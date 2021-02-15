import { Injectable } from '@angular/core';
import { CityUserStoreService } from '@app/stores/city-user-store.service';
import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';

import { SuggestedStoreService } from '@app/stores/suggested-store.service';

@Injectable({
  providedIn: 'root',
})
export class ClearService {
  constructor(
    private suggestedStore: SuggestedStoreService,
    private cityStore: CityUserStoreService,
    private cityWeatherStore: CityWeatherStoreService
  ) {}

  public execute() {
    this.cityStore.clear();
    this.suggestedStore.clear();
    this.cityWeatherStore.clear();
  }
}
