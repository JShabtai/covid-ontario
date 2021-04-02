import { Router, Event } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

import { CustomRoute, routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-ontario';

  mobileQuery: MediaQueryList;

  public routes;

  public currentTab: CustomRoute;

  constructor(
      public router: Router, 
      private media: MediaMatcher,
  ) {
      this.router = router;
      this.mobileQuery = media.matchMedia('(max-width: 600px)');

      this.routes = routes;

      this.router.events.subscribe((event: Event) => {
          for (let route of this.routes) {
              if (route.path && this.router.isActive(route.path, false)) {
                  this.currentTab = route;
                  return;
              }
          }

          // If we didn't find it, then we're on the default path
          this.currentTab = this.routes[0];
      });
  }

  async setTab(route: CustomRoute): Promise<void> {
      this.router.navigateByUrl(route.path);
      this.currentTab = route;
  }
}
