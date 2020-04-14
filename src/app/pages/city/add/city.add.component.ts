import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { WeatherService } from '@app/services/weather.service';
import { CityService } from '@app/services/city.service';

import { City } from '@app/models/City';
import { CityWeather } from '@app/models/CityWeather';

@Component({
  selector: 'app-city-add',
  templateUrl: './city.add.component.html',
  styleUrls: ['./city.add.component.css'],
})
export class CityAddComponent implements OnInit, OnDestroy {
  formControl = new FormControl();
  city: City = <City>{};
  filteredCities: Observable<Array<City>>;
  suggested: CityWeather = <CityWeather>{};

  private suggestedSubscription: Subscription;

  constructor(private cityService: CityService, private weatherService: WeatherService) {}

  ngOnInit() {
    this._findSuggested();
    this.formControl.valueChanges.subscribe((value) => this._filter(value));
  }

  ngOnDestroy(): void {
    if (this.suggestedSubscription) {
      this.suggestedSubscription.unsubscribe();
    }
  }

  displayFn(param: City): string {
    return param ? param.name.toUpperCase() : '';
  }

  selectOption(event: MatAutocompleteSelectedEvent) {
    if (event && event.option) {
      const cidade: City = event.option.value;
      console.log(`Selecionada: ${JSON.stringify(cidade)}`);
    }
  }

  searchValidString(): boolean {
    const searchValue = this.formControl.value;
    return searchValue && typeof searchValue === 'string' && searchValue.length > 0;
  }

  pesquisarCidades() {
    if (!this.searchValidString()) {
      return;
    }

    const searchValue = this.formControl.value;
    console.log('pesquisar cidades: ' + searchValue);
  }

  private _findSuggested() {
    this.suggestedSubscription = this.weatherService.suggested().subscribe((item) => (this.suggested = item));
  }

  private _filter(value: any) {
    if (!value || typeof value !== 'string' || value.length < 3) {
      return [];
    }
    this.filteredCities = this.cityService.search(value);
  }
}
