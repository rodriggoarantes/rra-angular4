import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

import { City } from "@app/models/City";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: "city-app-add",
  templateUrl: "./city.add.component.html",
  styleUrls: ["./city.add.component.css"]
})
export class CityAddComponent implements OnInit {
  formControl = new FormControl();
  city: City = <City>{};
  filteredCities: Observable<Array<City>>;

  private listFromServer: Array<City> = [
    <City>{ _id: "1", name: "Goiania" },
    <City>{ _id: "2", name: "Aparecida de goiania" },
    <City>{ _id: "3", name: "Sao Paulo" },
    <City>{ _id: "4", name: "Rio de Janeiro" },
    <City>{ _id: "5", name: "California" }
  ];

  ngOnInit() {
    this.filteredCities = this.formControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
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

  private _filter(value: any): Array<City> {
    if (!value || typeof value != "string" || value.length < 3) {
      return [];
    }

    const filterValue = this._normalizeValue(value);
    return this.listFromServer.filter(item =>
      this._normalizeValue(item.name).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, "");
  }
}
