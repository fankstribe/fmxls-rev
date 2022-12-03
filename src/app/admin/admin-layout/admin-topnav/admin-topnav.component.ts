import { Component, Input, OnInit, Renderer2, Inject } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { UserService } from '../../../core/services/user.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrls: ['./admin-topnav.component.scss'],
})
export class AdminTopnavComponent implements OnInit {
  @Input() sidenav;
  open = false;
  isDarkMode = false;
  user: User;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaOb: MediaObserver,
    private themeService: ThemeService,
    private userService: UserService,
    private renderer: Renderer2
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    const settings = this.themeService.getSettings();
    if (settings.isDarkMode !== undefined) {
      if (settings.isDarkMode) {
        this.toggleDarkMode();
      }
    }
  }

  logout() {
    this.userService.logout();
  }

  buttonToggle() {
    if (this.mediaOb.isActive('gt-sm')) {
      if (this.open) {
        this.open = false;
      } else {
        this.open = true;
      }
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.updateSettings({ isDarkMode: this.isDarkMode });

    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'black-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'black-theme');
    }
  }
}
