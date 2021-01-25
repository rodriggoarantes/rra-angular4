import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/ui/material/app.module-material';

import { WeatherIconComponent } from './weather-icon/icon.component';
import { CardComponent } from './weather-card/card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { CityCardComponent } from './city-card/city.card.component';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [CardComponent, WeatherIconComponent, AddCardComponent, CityCardComponent],
  exports: [CardComponent, WeatherIconComponent, AddCardComponent, CityCardComponent],
})
export class ComponentsUIModule {}
