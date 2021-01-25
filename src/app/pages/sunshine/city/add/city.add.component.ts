import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Subscription, Observable, Subject } from 'rxjs';

import { WeatherService } from '@app/services/weather.service';
import { CityService } from '@app/services/city.service';

import { City } from '@app/models/City';
import { CityWeather } from '@app/models/CityWeather';
import { StatefulComponent } from '@app/core/state/StatefulComponent';

interface State {
  city: City;
  suggested: CityWeather;
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

  constructor(private cityService: CityService, private weatherService: WeatherService) {
    super();
    this.setState(<State>{ city: null, suggested: null });
  }

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

      // TODO acrescentar um loading ao selecionar uma cidade
      this.stateCityWeather.next(<StateWeather>{ loading: true });

      // TODO pesquisar o CityWeather da cidae escolhida
      this.weatherService.find(cidade._id).subscribe((cityWeather) => {
        this.stateCityWeather.next(<StateWeather>{ loading: false, weather: cityWeather });
      });
    }
  }

  clearOption() {
    this.formControl.setValue('');
    this.stateCityWeather.next(<StateWeather>{ loading: false, weather: null });
  }

  private _findSuggested() {
    this.suggestedSubscription = this.weatherService.suggested().subscribe((item) => (this.state.suggested = item));
  }

  private _filter(value: any) {
    if (!value || typeof value !== 'string' || value.length < 3) {
      return [];
    }
    this.filteredCities = this.cityService.search(value);
  }
}
