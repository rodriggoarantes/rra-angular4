import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CityWeather } from '@app/models/CityWeather';
import { UiService } from '@app/services/ui.service';
import { WeatherService } from '@app/services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input() city = 'NqNfAojUrow6agBMREAu';

  darkMode: boolean;

  cityName = '';
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;

  private themeSubs: Subscription;

  constructor(public router: Router, public uiService: UiService, public weather: WeatherService) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.loadCity(this.city);
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }

  openDetails() {}

  // ---
  private loadCity(city: string) {
    if (!city) {
      console.log(`Cidade não informada: ${city}`);
      return;
    }

    this.weather.find(city).subscribe(
      (payload: CityWeather) => {
        this.cityName = payload.city.name;
        this.state = payload.state;
        this.temp = Math.ceil(payload.temp);
        this.maxTemp = Math.ceil(payload.max);
        this.minTemp = Math.ceil(payload.min);
      },
      (err) => {
        console.log(`ERRO: ${err.error.message}`);
      }
    );
  }
}
