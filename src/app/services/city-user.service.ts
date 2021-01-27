import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '@app/../environments/environment';
import { City } from '@app/models/City';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CityUserService {
  private readonly api = `${environment.baseUrl}/preferences`;

  constructor(private http: HttpClient, private userService: UserService) {}

  public findAll(): Observable<Array<City>> {
    const user = this.userService.userValue;
    return this.http.get<Array<City>>(`${this.api}/${user._id}/cities`);
  }
}
