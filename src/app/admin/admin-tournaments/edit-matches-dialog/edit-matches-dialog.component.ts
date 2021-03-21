import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Tournament } from '../../../models/tournament';

@Component({
  selector: 'app-edit-matches-dialog',
  templateUrl: './edit-matches-dialog.component.html',
  styleUrls: ['./edit-matches-dialog.component.scss']
})
export class EditMatchesDialogComponent implements OnInit {
  fixtures: Tournament;

  matches: any;
  matchesItem: any[];
  rounds: any[];
  arrayRounds: any[];

  constructor(
    private dialogRef: MatDialogRef<EditMatchesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.fixtures = data.data;
  }

  ngOnInit() {
    this.matches = this.fixtures.matches;
    this.matches.forEach((item:any) => {
      this.rounds = item.round;
      this.arrayRounds = Array(this.rounds).fill(null).map((x, i) => i + 1);
      this.matchesItem = this.arrayRounds.map(x => this.matches.filter((match: any) => match.round === x));
    })
  }
}
