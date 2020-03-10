import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "weather-icon",
  template: `
    <img [src]="icon" [width]="size" [height]="size" />
  `
})
export class WeatherIconComponent implements OnInit {
  private readonly path = "assets";

  @Input() state: string = "";
  @Input() size: string = "100";
  protected icon: string = "";

  constructor() {}

  ngOnInit() {
    const icon = this.getIcon();
    this.icon = `${this.path}/${icon}`;
  }

  private getIcon() {
    const state = this.state ? this.state.toUpperCase() : "";
    let answer = "";
    switch (state) {
      case "SUNNY":
      case "CLEAR":
        answer = "sun-icon.svg";
        break;
      case "STORM":
      case "THUNDERSTORM":
        answer = "storm-icon.svg";
        break;
      case "CLOUDS":
        answer = "ellipse-icon.svg";
        break;
      case "RAIN":
      case "DRIZZLE":
      case "MIST":
        answer = "rain-icon.svg";
        break;
      case "HAZE":
      case "FOG":
        answer = "fog-icon.svg";
        break;
      default:
        answer = "exclamation-icon.svg";
    }
    return answer;
  }
}
