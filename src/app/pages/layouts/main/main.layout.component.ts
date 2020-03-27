import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "main.layout.component.html",
  styleUrls: ["main.layout.component.css", "main.layout.sidemenu.css"]
})
export class MainLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  title = "Sunshine";
  opened: boolean = false;
  events: string[] = [];
  darkModeActive: boolean = false;

  userName: string = "Rodrigo Arantes";
  userEmail: string = "rodriggoarantes@gmail.com";

  logout() {}
}
