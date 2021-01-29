import { City } from './City';

export interface CityWeather {
  _id?: string;
  city: City;
  city_id: string;
  state: string;
  temp: number;
  max: number;
  min: number;
  pressure?: number;
  humidity?: number;
  dt?: Date;
  city_picture?: any;
}
