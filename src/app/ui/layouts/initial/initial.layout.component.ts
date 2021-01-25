import { InitialData } from './../../../models/InitialData';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-initial-layout',
  templateUrl: 'initial.layout.component.html',
  styleUrls: ['initial.layout.component.css'],
})
export class InitialLayoutComponent implements OnInit, OnDestroy {
  config: InitialData = <InitialData>{
    title: 'Login',
    notice: 'Não possui uma conta?',
    routeUrl: '/signup',
    routeName: 'SIGNUP',
  };

  private sub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.data.subscribe((data) => {
      console.log(JSON.stringify(data));
      if (data) {
        this.config = data as InitialData;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
