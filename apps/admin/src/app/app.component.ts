import {Component} from '@angular/core';
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router, Scroll} from "@angular/router";

@Component({
  selector: 'admin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  loadingRouteConfig: boolean;

  constructor() {
  }


  /*ngOnInit () {
    this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart) {
        this.loadingRouteConfig = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.loadingRouteConfig = false;
      }
    });
  }*/
}
