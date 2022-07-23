import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { AnimationsService } from '../../core/services/animations/animations.service';
import { LoaderService } from '../../core/services/loader.service';
import { SidenavService } from '../../core/services/sidenav.service';

import { routeAnimations } from '../../core/services/animations/route.animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [routeAnimations],
})
export class MainLayoutComponent implements OnInit, AfterViewChecked {
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  scrollInterval = undefined;
  lastScroll = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaOb: MediaObserver,
    private animationService: AnimationsService,
    private sidenavService: SidenavService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleView();
    });

    this.sidenavService.loadMainMenu();

    this.animationService.updateRouteAnimationType(true, true);
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
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
