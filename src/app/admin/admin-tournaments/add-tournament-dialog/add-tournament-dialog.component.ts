import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TournamentService } from '../../../core/services/tournament.service';
import { TeamService } from '../../../core/services/team.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Team } from '../../../models/team';
import { Tournament } from '../../../models/tournament';


@Component({
  selector: 'app-add-tournament-dialog',
  templateUrl: './add-tournament-dialog.component.html',
  styleUrls: ['./add-tournament-dialog.component.scss']
})
export class AddTournamentDialogComponent implements OnInit {
  addTournamentForm: FormGroup;

  selectedTeams: Team[];

  formError = {
    tournamentName: '',
    teams: '',
    format: ''
  };

  validationMessages = {
    tournamentName: {
      required: 'Il nome è obbligatorio.',
    },
    teams: {
      required: 'Seleziona le squadre.',
    },
    format: {
      required: 'Seleziona un opzione.',
    }
  };

  constructor(
    private tournamentService: TournamentService,
    private teamService: TeamService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddTournamentDialogComponent>,
  ) {}

  ngOnInit() {
    this.createForm();

    this.teamService.getTeams().subscribe(data => {
      this.selectedTeams = data;
    })
  }

  createForm() {
    this.addTournamentForm = this.formBuilder.group({
      tournamentName: ['', [Validators.required]],
      teams: ['', [Validators.required]],
      format: ['', [Validators.required]]
    });
    this.addTournamentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.addTournamentForm) {
      return;
    }

    const form = this.addTournamentForm;

    for (const field of Object.keys(this.formError)) {
      this.formError[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key of Object.keys(control.errors)) {
          this.formError[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmitForm() {
    const data = {
      tournamentName: this.addTournamentForm.value.tournamentName,
      teams: this.addTournamentForm.value.teams,
      format: this.addTournamentForm.value.format
    }
    this.tournamentService.createTournament(data).subscribe((res) => {
      this.dialogRef.close(res);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
