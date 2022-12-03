import { Component, Input, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { UserService } from '../../../core/services/user.service';
import { ThemeService } from '../../../core/services/theme.service';
import { User } from '../../../models/user';
import { TeamService } from '../../../core/services/team.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit {
  @Input() sidenav: any;
  @Input() sidenavRight: any;
  open = false;
  isDarkMode = false;
  user: User;
  teamName: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaOb: MediaObserver,
    private themeService: ThemeService,
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.user = userService.user;
  }

  ngOnInit() {
    this.teamService.getMyTeam().subscribe((res) => {
      if (res) {
        this.teamName = res.teamName;
      }
    });
    const settings = this.themeService.getSettings();
    if (settings.isDarkMode !== undefined) {
      if (settings.isDarkMode) {
        this.toggleDarkMode();
      }
    }
  }

  goToAdmin(): void {
    this.router.navigate(['/admin-home']);
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
