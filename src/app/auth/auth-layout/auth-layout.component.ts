import { Component, OnInit } from '@angular/core';

import { routeAnimations } from '../../core/services/animations/route.animations';
import { AnimationsService } from '../../core/services/animations/animations.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [routeAnimations],
})
export class AuthLayoutComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    private animationService: AnimationsService
  ) {}

  ngOnInit(): void {
    // this.themeService.updateTheme();
    this.animationService.updateRouteAnimationType(true, false);
  }
}
