import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { MatchService } from '../../../core/services/match.service';

import { Match } from '../../../models/match';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  match: Match;

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.matchService.getMatch(params['id']).subscribe(res => {
        if (res) {
          this.match = res;
        }
      })
    })
  }

}
