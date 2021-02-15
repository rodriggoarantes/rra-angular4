import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CityWeather } from '@app/models/CityWeather';
import { UiService } from '@app/services/ui.service';
import { CityWeatherStoreService } from '@app/stores/city-weather-store.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() city: string;

  darkMode: boolean;

  cityName = '';
  state: string = '';
  temp: number = 0;
  maxTemp: number = 0;
  minTemp: number = 0;

  private themeSubs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public uiService: UiService,
    public weatherStore: CityWeatherStoreService
  ) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this._loadWeather(this.city);
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }

  openDetails() {
    this.router.navigate(['detail', { cityId: this.city }], { relativeTo: this.route });
  }

  // ---
  private _loadWeather(city: string) {
    if (!city) {
      console.log(`Cidade não informada: ${city}`);
      return;
    }

    this.weatherStore.weathers$.subscribe(
      (cityWeathers: Array<CityWeather>) => {
        const weather = cityWeathers.find((w) => w.city._id === city);
        if (weather) {
          this.cityName = weather.city.name;
          this.state = weather.state;
          this.temp = Math.ceil(weather.temp);
          this.maxTemp = Math.ceil(weather.max);
          this.minTemp = Math.ceil(weather.min);
        }
      },
      (err) => {
        console.log(`ERRO _loadWeather: ${err.error.message}`);
      }
    );
  }
}
