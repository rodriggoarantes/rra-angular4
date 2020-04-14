import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UiService } from '@app/services/ui.service';

@Component({
  selector: 'app-add-card',
  template: `
    <div class="card" routerLink="add" [ngClass]="{ 'card-dark': darkMode }">
      <div class="header">
        <span class="title">Add city</span>
      </div>
      <div class="body">
        <img class="add-icon" [src]="addImage" />
        <img class="city-icon" [src]="cityImage" />
      </div>
    </div>
  `,
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit, OnDestroy {
  addImage = 'assets/plus-icon.svg';
  cityImage = '';
  darkMode: boolean;

  private themeSubs: Subscription;

  constructor(public uiService: UiService) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
      this.loadImages();
    });

    this.loadImages();
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }

  private loadImages() {
    if (this.darkMode) {
      this.addImage = 'assets/plus-dark-icon.svg';
      this.cityImage = 'assets/city-dark-icon.svg';
    } else {
      this.addImage = 'assets/plus-icon.svg';
      this.cityImage = 'assets/city-icon.svg';
    }
  }
}
