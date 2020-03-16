import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "@app/../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CityService {
  private readonly apiURL = "";
  private readonly appID = "";

  constructor(public http: HttpClient) {}
}
