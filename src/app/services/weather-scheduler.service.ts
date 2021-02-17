import { Injectable } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherSchedulerService {
  private readonly schedulerInterval: Observable<number>;

  constructor() {
    this.schedulerInterval = interval(10000);
  }

  public init(): Subscription {
    return this.schedulerInterval.subscribe((num) => {
      console.log(`Realizando atualização de clima: ${num}`);
    });
  }

  // -----------------------

  private updateUserWeather() {}
}
