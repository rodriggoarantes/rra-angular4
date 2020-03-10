import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "weather-icon",
  templateUrl: "./icon.component.html"
})
export class WeatherIconComponent implements OnInit {
  private readonly path = "assets";

  @Input() state: string = "";
  @Input() width: string = "50";
  @Input() height: string = "50";
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
