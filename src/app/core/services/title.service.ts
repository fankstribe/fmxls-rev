import { Injectable } from "@angular/core";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  title: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  trackingRouteEvent() {
    this.router.events
      .pipe(
        filter(event => {
          return event instanceof NavigationEnd;
        }),
        map(() => this.activatedRoute),
        map(route =>{
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        map((data: any) => data.title)
      )
      .subscribe(title => {
        this.title = title;
      });
  }
}
