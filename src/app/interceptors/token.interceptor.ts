import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "@app/models/User";
import { UserService } from "@app/services/user.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: UserService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user: User = this.auth.userValue;
    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    return next.handle(request);
  }
}
