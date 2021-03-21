import { Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/services/animations/route.animations';
import { CommunicationService } from '../../../core/services/communication.service';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss'],
})
export class TournamentsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  tournamentId: string;
  tournamentName: string;
  tournamentImg: string;
  navLinks: any[]

  constructor(
    private communicationService: CommunicationService
  ) {
    communicationService.changeEmitted$.subscribe((data) => {
      this.tournamentId = data._id;
      this.tournamentName = data.tournamentName;
      this.tournamentImg = data.img;
      this.navLinks = [
          {
            label: 'Risultati',
            link: ['fixtures', this.tournamentId],
            index: 0
          },
          {
            label: 'Classifiche',
            link: ['tables'],
            index: 1
          },
        ];
    });
  }

  ngOnInit(): void {}

}

