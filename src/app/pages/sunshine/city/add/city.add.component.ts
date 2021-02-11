import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Subscription, Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CityService } from '@app/services/city.service';
import { WeatherService } from '@app/services/weather.service';
import { PreferencesService } from '@app/services/preferences.service';

import { SuggestedStoreService } from '@app/stores/suggested-store.service';
import { CityUserStoreService } from '@app/stores/city-user-store.service';

import { StatefulComponent } from '@app/core/state/StatefulComponent';
import { City } from '@app/models/City';
import { CityWeather } from '@app/models/CityWeather';

interface State {
  city: City;
  suggested: CityWeather;
  addedSuggested: boolean;
}

interface StateWeather {
  loading: boolean;
  weather: CityWeather;
}

@Component({
  selector: 'app-city-add',
  templateUrl: './city.add.component.html',
  styleUrls: ['./city.add.component.css'],
})
export class CityAddComponent extends StatefulComponent<State> implements OnInit, OnDestroy {
  formControl = new FormControl();
  filteredCities: Observable<Array<City>>;
  stateCityWeather: Subject<StateWeather> = new Subject();

  private suggestedSubscription: Subscription;
  private cityWeatherStored: Subscription;

  constructor(
    private readonly cityService: CityService,
    private readonly weatherService: WeatherService,
    private readonly suggestedStore: SuggestedStoreService,
    private readonly cityStore: CityUserStoreService,
    private readonly preferenceService: PreferencesService
  ) {
    super();
    this.setState(<State>{ city: null, suggested: null });
  }

  ngOnInit() {
    this._findSuggested();
    this.formControl.valueChanges.subscribe((value) => this._filter(value));
  }

  ngOnDestroy(): void {
    this.suggestedSubscription.unsubscribe();
    this.cityWeatherStored.unsubscribe();
  }

  displayFn(param: City): string {
    return param ? param.name.toUpperCase() : '';
  }

  selectOption(event: MatAutocompleteSelectedEvent) {
    if (event && event.option) {
      const cidade: City = event.option.value;
      console.log(`Selecionada: ${JSON.stringify(cidade)}`);

      this.stateCityWeather.next(<StateWeather>{ loading: true });

      this.weatherService.find(cidade._id).subscribe((cityWeather) => {
        this.stateCityWeather.next(<StateWeather>{ loading: false, weather: cityWeather });
      });
    }
  }

  clearOption() {
    this.formControl.setValue('');
    this.stateCityWeather.next(<StateWeather>{ loading: false, weather: null });
  }

  addSuggested() {
    const { suggested } = this.state;
    this.preferenceService.add(suggested.city, suggested);
  }

  private _findSuggested() {
    this.suggestedSubscription = this.suggestedStore.weather$.subscribe((item) => {
      this.state.suggested = item;
      this._verifySelected();
    });
  }

  private _verifySelected() {
    this.cityWeatherStored = this.cityStore.cities$.subscribe((list: Array<City>) => {
      const weather = this.state.suggested;
      if (list && weather && weather.city) {
        this.state.addedSuggested = list.map((city) => city._id).includes(weather.city._id);
      }
    });
  }

  private _filter(value: any) {
    if (!value || typeof value !== 'string' || value.length < 3) {
      return [];
    }
    this.filteredCities = this.cityService.search(value).pipe(catchError(this._handleError<City[]>([])));
  }

  private _handleError<T>(result?: T) {
    return (): Observable<T> => of(result as T);
  }
}
