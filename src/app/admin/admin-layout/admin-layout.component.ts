import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { routeAnimations } from '../../core/services/animations/route.animations';

import { AnimationsService } from '../../core/services/animations/animations.service';
import { TitleService } from './../../core/services/title.service';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  animations: [routeAnimations],
})
export class AdminLayoutComponent implements OnInit, AfterViewChecked {
  sidenavOpened: boolean = true;
  sidenavMode: string = 'side';

  @ViewChild('adminContainer') elementRef: ElementRef;

  constructor(
    private renderer: Renderer2,
    private changeDetector: ChangeDetectorRef,
    private mediaOb: MediaObserver,
    private animationService: AnimationsService,
    private titleService: TitleService,
    public loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleView();
    });

    this.animationService.updateRouteAnimationType(true, true);
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  get title() {
    return this.titleService.title;
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

  onContentScroll(event) {
    const scrollPos = event.target.scrollTop === 0;
    if (scrollPos) {
      this.renderer.addClass(this.elementRef.nativeElement, 'inactive');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'inactive');
    }
  }
}
