import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  template: ` <img [src]="getIcon()" [style.width]="size" [style.height]="size" /> `,
})
export class WeatherIconComponent implements OnInit {
  private readonly path = 'assets';

  @Input() state = '';
  @Input() size = '100%';
  protected icon = '';

  constructor() {}

  ngOnInit() {}

  getIcon() {
    const state = this.state ? this.state.toUpperCase() : '';
    let answer = '';
    switch (state) {
      case 'SUNNY':
      case 'CLEAR':
        answer = 'sun-icon.svg';
        break;
      case 'STORM':
      case 'THUNDERSTORM':
        answer = 'storm-icon.svg';
        break;
      case 'CLOUDS':
        answer = 'ellipse-icon.svg';
        break;
      case 'RAIN':
      case 'DRIZZLE':
      case 'MIST':
        answer = 'rain-icon.svg';
        break;
      case 'HAZE':
      case 'FOG':
      case 'SMOKE':
        answer = 'fog-icon.svg';
        break;
      case 'SNOW':
        answer = 'snow-icon.svg';
        break;
      default:
        answer = 'unknow-icon.svg';
    }
    return `${this.path}/${answer}`;
  }
}
