import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../../core/services/tournament.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tournaments: any[];

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.tournamentService.getTournaments().subscribe((res) => {
      this.tournaments = res;
    });
  }
}
