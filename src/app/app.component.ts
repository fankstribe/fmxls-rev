import { Component, OnInit } from '@angular/core';

import { TitleService } from './core/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  spinnerName = 'page-spinner';

  constructor(
    private titleService: TitleService,
  ) {

  }

  ngOnInit() {
    this.titleService.trackingRouteEvent();
  }

}
