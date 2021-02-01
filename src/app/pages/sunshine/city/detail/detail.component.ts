import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { switchMap, first, mergeMap } from 'rxjs/operators';

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

  darkMode: boolean;
  cityIllustrationPath = '/./assets/city-background-default.svg';

  city$: Observable<City>;
  weather$: Observable<CityWeather>;
  forecast$: Observable<Array<CityWeather>>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService,
    private cityUserStore: CityUserStoreService,
    private weatherStore: CityWeatherStoreService
  ) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.route.paramMap.pipe(switchMap((params) => of(String(params.get('cityId'))))).subscribe((cityId) => {
      this.selectedCityId = cityId;
      this.city$ = this.cityUserStore.cities$.pipe(
        mergeMap((data: Array<City>) => data.filter((city: City) => city._id === this.selectedCityId)),
        first()
      );
    });
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }
}
