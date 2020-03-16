import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";
import { first } from "rxjs/operators";

import { UiService } from "@app/services/ui.service";

import { CityWeather } from "@app/models/CityWeather";
import { City } from "@app/models/City";

@Component({
  selector: "city-card",
  templateUrl: "./city.card.component.html",
  styleUrls: ["./city.card.component.css"]
})
export class CityCardComponent implements OnInit, OnDestroy {
  @Input() weather: CityWeather = <CityWeather>{};
  @Output() cityStored = new EventEmitter();

  darkMode: boolean;

  private themeSubs: Subscription;

  constructor(public router: Router, public uiService: UiService) {}

  ngOnInit() {
    this.themeSubs = this.uiService.darkModeState.subscribe(isDark => {
      this.darkMode = isDark;
    });

    this.weather = <CityWeather>{
      _id: "123124564",
      city: <City>{ _id: "789", name: "Paris" },
      maxTemp: 50,
      minTemp: -10,
      state: "Clear",
      temp: 31
    };
  }

  ngOnDestroy() {
    this.themeSubs.unsubscribe();
  }
}
