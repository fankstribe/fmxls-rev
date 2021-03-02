import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { TournamentService } from '../../../core/services/tournament.service';

import { Tournament } from '../../../models/tournament';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  id: any;
  tournaments: Tournament[];

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params;
      console.log(this.id);
    })
    this.tournamentService.getTournament(this.id).subscribe(res => {
      this.tournaments = res;
      console.log( this.tournaments);
    })
  }

}
