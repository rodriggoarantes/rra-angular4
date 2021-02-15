import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '@app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(public router: Router, private userService: UserService) {}

  canActivate(): boolean {
    return this._notLoggedIn();
  }

  private _notLoggedIn() {
    if (this.userService.isAuth()) {
      this.router.navigate(['/sunshine']);
      return false;
    } else {
      this.userService.logout();
      return true;
    }
  }
}
