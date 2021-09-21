import {
  Component,
  Input,
  OnInit,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../core/services/user.service';
import { ThemeService } from '../../../core/services/theme.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Input() sidenav: any;
  @Input() sidenavRight: any;

  themes: Array<any> = [];
  selectedTheme: any;

  user: User;

  constructor(
    private themeService: ThemeService,
    private userService: UserService,
    private router: Router
  ) {
    this.themes = themeService.themes;
    this.selectedTheme = themeService.currentTheme();

    this.user = userService.user;
  }

  ngOnInit() {
    this.themeService.updateTheme();

  }

  setTheme(theme: any) {
    this.themeService.setTheme(theme);
  }

  goToAdmin(): void {
    this.router.navigate(['/admin-home']);
  }

  logout() {
    this.userService.logout();
  }
}
