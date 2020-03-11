import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.css", "./sidemenu.css"]
})
export class AppComponent {
  title = "Sunshine";
  opened: boolean = false;
  events: string[] = [];

  userName: string = "Rodrigo Arantes";
  userEmail: string = "rodriggoarantes@gmail.com";

  logout() {}
}
