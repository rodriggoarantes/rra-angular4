import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

import { PreferencesService } from './preferences.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherSchedulerService {
  private readonly REFRESH_MINUTES = 5;
  private readonly schedulerInterval: Observable<number>;

  constructor(private readonly preferenceService: PreferencesService) {
    this.schedulerInterval = interval(1000 * 60 * this.REFRESH_MINUTES);
  }

  public init(): Subscription {
    return this.schedulerInterval.subscribe((num: number) => {
      this.updateUserWeather(num);
    });
  }

  // -----------------------

  private updateUserWeather(count: number) {
    this.preferenceService.loadWeathers();
  }
}
