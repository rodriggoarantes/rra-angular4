import { City } from "./City";

export interface CityWeather {
  _id: string;
  city: City;
  state: string;
  temp: number;
  maxTemp: number;
  minTemp: number;
}
