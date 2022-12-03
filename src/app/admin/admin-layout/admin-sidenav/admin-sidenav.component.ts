import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

import { SidenavService } from '../../../core/services/sidenav.service';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
})
export class AdminSidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  isMobile = false;

  constructor(
    private mediaOb: MediaObserver,
    public sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.mediaOb.asObservable().subscribe(() => {
      this.toggleMobileView();
    });
  }

  onSidenavClose() {
    if (this.isMobile) {
      this.sidenavClose.emit();
    }
  }

  toggleMobileView() {
    if (this.mediaOb.isActive('xs') || this.mediaOb.isActive('sm')) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
}
