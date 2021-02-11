import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { switchMap, first, mergeMap, map } from 'rxjs/operators';

import { UiService } from '@app/services/ui.service';

import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';
import { CityUserStoreService } from '@app/stores/city-user-store.service';

import { City } from '@app/models/City';
import { CityWeather } from '@app/models/CityWeather';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  private selectedCityId: string;
  private themeSubs: Subscription;
  private cityWeatherStoreSubs: Subscription;

  darkMode: boolean;
  cityIllustrationPath = '/./assets/city-background-default.svg';

  city$: Observable<City>;
  weather$: Observable<CityWeather>;
  forecast$: Observable<Array<CityWeather>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService,
    private readonly cityUserStore: CityUserStoreService,
    private readonly weatherStore: CityWeatherStoreService
  ) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.route.paramMap.pipe(switchMap((params) => of(String(params.get('cityId'))))).subscribe((cityId) => {
      this.selectedCityId = cityId;
      this.city$ = this._observableCity();
      this.weather$ = this._observableWeather();
    });
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }

  backHome() {
    this.router.navigate(['/sunshine']);
  }

  // ---

  private _observableCity(): Observable<City> {
    return this.cityUserStore.cities$.pipe(
      mergeMap((data: Array<City>) => data.filter((city: City) => city._id === this.selectedCityId)),
      first()
    );
  }

  private _observableWeather(): Observable<CityWeather> {
    return this.weatherStore.weathers$.pipe(
      mergeMap((data: Array<CityWeather>) => data.filter((item: CityWeather) => item.city._id === this.selectedCityId)),
      first(),
      map((item) => {
        const weather = <CityWeather>{
          ...item,
          temp: Math.ceil(item.temp),
        };
        return weather;
      })
    );
  }
}
