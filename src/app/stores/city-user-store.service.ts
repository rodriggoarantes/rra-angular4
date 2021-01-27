import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { City } from '@app/models/City';

@Injectable({
  providedIn: 'root',
})
export class CityUserStoreService {
  private readonly KEY = 'city-user-selected';
  private readonly subject: BehaviorSubject<Array<City>>;
  public readonly cities$: Observable<Array<City>>;

  constructor() {
    this.subject = new BehaviorSubject<Array<City>>(this._listLocal());
    this.cities$ = this.subject.asObservable();
  }

  public get value(): Array<City> {
    return this.subject.value;
  }

  public clear() {
    localStorage.removeItem(this.KEY);
    this.subject.next([]);
  }

  public store(city: City) {
    if (!city || !city._id) return;
    if (this._includeCity(city._id)) return;

    const list: Array<City> = [...this._listLocal(), city];
    localStorage.setItem(this.KEY, JSON.stringify(list));
    this.subject.next(list);
  }

  private _listLocal(): Array<City> {
    const listLocal = JSON.parse(localStorage.getItem(this.KEY));
    if (listLocal && listLocal.length) {
      return listLocal;
    }
    return [];
  }

  private _includeCity(cityId: string) {
    return this.value.map((cw) => cw._id).includes(cityId);
  }
}
