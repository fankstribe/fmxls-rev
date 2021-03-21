import { CommunicationService } from '../../../core/services/communication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { TournamentService } from '../../../core/services/tournament.service';

import { Tournament } from '../../../models/tournament';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {
  // routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  // fixtures: Tournament;
  // rounds: any [];
  // matchesItem: any [];
  // matches: any;
  // arrayRounds: any [];


  // constructor(
  //   private tournamentService: TournamentService,
  //   private route: ActivatedRoute,
  //   private communicationeService: CommunicationService
  // ) { }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     this.tournamentService.getTournament(params['id']).subscribe(res => {
  //       this.fixtures = res
  //       this.communicationeService.emitChange(res)
  //       this.matches = this.fixtures.matches
  //       this.matches.forEach((item:any) => {
  //         this.rounds = item.round
  //         this.arrayRounds = Array(this.rounds).fill(null).map((x, i) => i + 1)
  //         this.matchesItem = this.arrayRounds.map(x => this.matches.filter(match => match.round === x))
  //       })
  //     })
  //   })

  // }

}
