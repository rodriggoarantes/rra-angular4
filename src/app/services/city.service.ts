import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { environment } from "@app/../environments/environment";
import { City } from "@app/models/City";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CityService {
  private readonly api = `${environment.baseUrl}/cities`;

  constructor(public http: HttpClient) {}

  public search(name: string): Observable<Array<City>> {
    const params = new HttpParams().set("name", name);
    return this.http.get<Array<City>>(`${this.api}`, { params });
  }
}
