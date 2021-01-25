import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '@app/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: UserService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAuth()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
