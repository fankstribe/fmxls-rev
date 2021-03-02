import { UserService } from '../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { routeAnimations } from '../../core/services/animations/route.animations';

import { AnimationsService } from '../../core/services/animations/animations.service';
import { TitleService } from './../../core/services/title.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [routeAnimations]
})
export class AdminLayoutComponent implements OnInit {
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  constructor(
    private mediaOb: MediaObserver,
    private animationService: AnimationsService,
    private titleService: TitleService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleView();
    });

    this.animationService.updateRouteAnimationType(
      true,
      true
    );

  }

  get title() {
    return this.titleService.title;
  }

  toggleView() {
    if (this.mediaOb.isActive('gt-sm')) {
      this.sidenavMode = 'side',
      this.sidenavOpened = true;
    } else if (this.mediaOb.isActive('gt-xs')) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else if (this.mediaOb.isActive('lt-sm')) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    }
  }
}
