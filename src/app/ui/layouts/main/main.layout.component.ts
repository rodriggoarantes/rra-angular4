import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClearService } from '@app/services/clear.service';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: 'main.layout.component.html',
  styleUrls: ['main.layout.component.css', 'main.layout.sidemenu.css'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private router: Router, private userService: UserService, private clearService: ClearService) {}

  ngOnInit() {}

  title = 'Sunshine';
  opened: boolean = false;
  events: string[] = [];
  darkModeActive: boolean = false;

  userName: string = 'Rodrigo Arantes';
  userEmail: string = 'rodriggoarantes@gmail.com';

  logout() {
    this.clearService.execute();
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }
}
