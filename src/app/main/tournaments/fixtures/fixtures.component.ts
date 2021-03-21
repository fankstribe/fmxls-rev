import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { TournamentService } from '../../../core/services/tournament.service';
import { CommunicationService } from '../../../core/services/communication.service';

import { Tournament } from '../../../models/tournament';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  fixtures: Tournament;
  rounds: any[];
  matchesItem: any[];
  matches: any;
  arrayRounds: any[];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private communicationeService: CommunicationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tournamentService.getTournament(params['id']).subscribe(res => {
        this.fixtures = res;
        this.communicationeService.emitChange(res);
        this.matches = this.fixtures.matches;
        this.matches.forEach((item:any) => {
          this.rounds = item.round;
          this.arrayRounds = Array(this.rounds).fill(null).map((x, i) => i + 1);
          this.matchesItem = this.arrayRounds.map(x => this.matches.filter((match: any) => match.round === x))
        })
      })
    })
  }

}
