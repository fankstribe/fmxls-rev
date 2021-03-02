import { UserService } from '../../core/services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { AnimationsService } from '../../core/services/animations/animations.service';
import { SidenavService } from '../../core/services/sidenav.service';

import { routeAnimations } from '../../core/services/animations/route.animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [routeAnimations],
})
export class MainLayoutComponent implements OnInit {
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  constructor(
    private mediaOb: MediaObserver,
    private animationService: AnimationsService,
    private sidenavService: SidenavService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleView();
    });

    this.sidenavService.loadMainMenu();

    this.animationService.updateRouteAnimationType(
      true,
      true
    );

  }

  toggleView() {
    if (this.mediaOb.isActive('gt-sm')) {
      this.sidenavMode = 'side';
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
