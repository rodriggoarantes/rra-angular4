import { Component } from '@angular/core';

@Component({
  selector: 'app-container-layout',
  template: `
    <div class="container">
      <div class="card">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['container.layout.component.css'],
})
export class ContainerLayoutComponent {}
