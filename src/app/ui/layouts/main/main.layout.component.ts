import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClearService } from '@app/services/clear.service';
import { UserService } from '@app/services/user.service';
import { WeatherSchedulerService } from '@app/services/weather-scheduler.service';

import { BehaviorSubject, Subscription } from 'rxjs';

interface UserData {
  name: string;
  email: string;
}

interface MenuOption {
  name: string;
  link: string;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: 'main.layout.component.html',
  styleUrls: ['main.layout.component.css', 'main.layout.sidemenu.css'],
})
export class MainLayoutComponent implements OnInit, OnDestroy {
  title = 'Sunshine';
  opened: boolean = false;
  events: string[] = [];

  public readonly menuOptions$: BehaviorSubject<Array<MenuOption>>;
  public readonly user$: BehaviorSubject<UserData>;

  private _userSubs: Subscription;
  private _schedulerSubs: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private clearService: ClearService,
    private readonly schedulerService: WeatherSchedulerService
  ) {
    this.menuOptions$ = new BehaviorSubject([]);
    this.user$ = new BehaviorSubject(<UserData>{});
  }

  ngOnInit() {
    this._loadUser();
    this._loadMenu();
    this._initSchedulerWeather();
  }

  ngOnDestroy() {
    this._userSubs.unsubscribe();
    this._schedulerSubs.unsubscribe();
  }

  // --------------------

  isLinkActive(): boolean {
    return false;
  }

  logout() {
    this.clearService.execute();
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  // --------------------

  private _loadMenu() {
    const options = new Array<MenuOption>();
    options.push({ name: 'Home', link: '' });
    options.push({ name: 'Adicionar Cidade', link: 'add' });

    this.menuOptions$.next(options);
  }

  private _loadUser() {
    this._userSubs = this.userService.user.subscribe((user) => {
      const { name, email } = user || <UserData>{};
      this.user$.next({ name, email });
    });
  }

  private _initSchedulerWeather() {
    this._schedulerSubs = this.schedulerService.init();
  }
}
