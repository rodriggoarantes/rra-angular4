import { City } from './City';

export interface Forecast {
  _id?: string;
  city: City;
  city_id: string;
  state: string;
  temp: number;
  max: number;
  min: number;
  pressure?: number;
  humidity?: number;
  wind_speed?: number;
  dt?: Date;
  date_txt?: string;
  weekday?: string;
}
