import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from '@app/models/City';
import { CityUserStoreService } from '@app/stores/city-user-store.service';
import { PreferencesService } from '@app/services/preferences.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userCities: Observable<City[]>;

  constructor(private cityUserStore: CityUserStoreService, private preferenceService: PreferencesService) {
    this._loading();
  }

  ngOnInit() {
    this._loadCities();
  }

  private _loading() {
    const cities = this.cityUserStore.value;
    if (!cities || !cities.length) {
      this.preferenceService.loadCities();
      this.preferenceService.loadWeathers();
    }
  }

  private _loadCities() {
    this.userCities = this.cityUserStore.cities$;
  }
}
