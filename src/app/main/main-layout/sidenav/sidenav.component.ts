import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  isMobile = false;

  constructor(
    private mediaOb: MediaObserver,
    public sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleMobileView();
    })
  }

  onSidenavClose() {
    if (this.isMobile) {
      this.sidenavClose.emit();
    }
  }

  toggleMobileView() {
    if (this.mediaOb.isActive('xs') || this.mediaOb.isActive('sm')) {
      this.isMobile = true
    } else {
      this.isMobile = false;
    }
  }
}
