import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { routeAnimations } from '../../core/services/animations/route.animations';

import { AnimationsService } from '../../core/services/animations/animations.service';
import { AppService } from '../../core/services/app.service';
import { LoaderService } from '../../core/services/loader.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [routeAnimations],
})
export class AdminLayoutComponent implements OnInit, AfterViewChecked {
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private mediaOb: MediaObserver,
    private animationService: AnimationsService,
    private appService: AppService,
    private sidenavService: SidenavService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleView();
    });

    this.sidenavService.loadAdminMenu();

    this.animationService.updateRouteAnimationType(true, true);
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  get title() {
    return this.appService.title;
  }

  toggleView() {
    if (this.mediaOb.isActive('gt-sm')) {
      (this.sidenavMode = 'side'), (this.sidenavOpened = true);
    } else if (this.mediaOb.isActive('gt-xs')) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else if (this.mediaOb.isActive('lt-sm')) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    }
  }
}
