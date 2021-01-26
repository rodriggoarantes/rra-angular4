import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CityWeather } from '@app/models/CityWeather';

import { WeatherService } from '@app/services/weather.service';

@Injectable({
  providedIn: 'root',
})
export class SuggestedStoreService {
  private readonly KEY = 'city-suggested';
  private readonly subject: BehaviorSubject<CityWeather>;
  public readonly weather$: Observable<CityWeather>;

  constructor(private weatherService: WeatherService) {
    this.subject = new BehaviorSubject<CityWeather>(JSON.parse(localStorage.getItem(this.KEY)));
    this.weather$ = this.subject.asObservable();
    this._find();
  }

  public get value(): CityWeather {
    return this.subject.value;
  }

  public clear() {
    localStorage.removeItem(this.KEY);
    this.subject.next(null);
  }

  private _store(suggestedWeather: CityWeather) {
    localStorage.setItem(this.KEY, JSON.stringify(suggestedWeather));
    this.subject.next(suggestedWeather);
  }

  private _find() {
    this.weatherService.suggested().subscribe((item) => this._store(item));
  }
}
