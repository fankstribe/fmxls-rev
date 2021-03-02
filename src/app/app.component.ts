import { Component, OnInit } from '@angular/core';

import { SpinnerService } from './core/services/spinner.service';
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
    private spinner: SpinnerService,
  ) {

  }

  ngOnInit() {
    this.titleService.trackingRouteEvent();
    this.spinner.pageSpinner(this.spinnerName);
  }

}
