import { Component, Input, OnInit } from '@angular/core';

import { ThemeService } from '../../../core/services/theme.service';
import { UserService } from '../../../core/services/user.service';

import { User } from '../../../models/user';

@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrls: ['./admin-topnav.component.scss']
})
export class AdminTopnavComponent implements OnInit {
  @Input() sidenav;

  themes: Array<any> = [];
  selectedTheme: any;

  user: User;

  constructor(
    private themeService: ThemeService,
    private userService: UserService
  ) {
      this.themes = themeService.themes;
      this.selectedTheme = themeService.currentTheme();

      this.user = userService.user;
    }

  ngOnInit(): void {
    this.themeService.updateTheme();
  }

  setTheme(theme: any) {
    this.themeService.setTheme(theme);
  }

  logout() {
    this.userService.logout();
  }

}
