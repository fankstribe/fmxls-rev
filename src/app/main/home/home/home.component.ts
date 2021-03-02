import { Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { TournamentService } from '../../../core/services/tournament.service';

import { Tournament } from '../../../models/tournament';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  tournaments: Tournament[];

  constructor(
    private tournamentService: TournamentService
  ) { }

  ngOnInit(): void {
    this.tournamentService.getTournaments().subscribe(res => {
      this.tournaments = res;
    })
  }

}
