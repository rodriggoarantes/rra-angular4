import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "@app/../environments/environment";

import { User } from "@app/models/User";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private readonly api = `${environment.baseUrl}/users`;

  constructor(public http: HttpClient) {}

  public create(
    name: string,
    email: string,
    pass: string,
    confirmPass: string
  ): Observable<User> {
    return this.http.post<User>(`${this.api}`, {
      name,
      email,
      pass,
      confirmPass
    });
  }
}
