import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

import { CityService } from "@app/services/city.service";
import { City } from "@app/models/City";

@Component({
  selector: "city-app-add",
  templateUrl: "./city.add.component.html",
  styleUrls: ["./city.add.component.css"]
})
export class CityAddComponent implements OnInit {
  formControl = new FormControl();
  city: City = <City>{};
  filteredCities: Observable<Array<City>>;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.formControl.valueChanges.subscribe(value => this._filter(value));
  }

  displayFn(param: City): string {
    return param ? param.name.toUpperCase() : "";
  }

  selectOption(event: MatAutocompleteSelectedEvent) {
    if (event && event.option) {
      const cidade: City = event.option.value;
      console.log(`Selecionada: ${JSON.stringify(cidade)}`);
    }
  }

  searchValidString(): boolean {
    const searchValue = this.formControl.value;
    return (
      searchValue && typeof searchValue === "string" && searchValue.length > 0
    );
  }

  pesquisarCidades() {
    if (!this.searchValidString()) {
      return;
    }

    const searchValue = this.formControl.value;
    console.log("pesquisar cidades: " + searchValue);
  }

  private _filter(value: any) {
    if (!value || typeof value != "string" || value.length < 3) {
      return [];
    }
    this.filteredCities = this.cityService.search(value);
  }
}
