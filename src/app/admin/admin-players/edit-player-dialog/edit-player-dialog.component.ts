import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeamService } from '../../../core/services/team.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

import { Player } from '../../../models/player';
import { Team } from '../../../models/team';
import { PlayerService } from 'src/app/core/services/player.service';


@Component({
  selector: 'app-edit-player-dialog',
  templateUrl: './edit-player-dialog.component.html',
  styleUrls: ['./edit-player-dialog.component.scss']
})
export class EditPlayerDialogComponent implements OnInit {
  editPlayerForm: FormGroup;
  playerToUpdate: Player;
  selectedTeams: Team[];
  selectedPosition: Player;

  formError = {
    playerName: '',
    teamName: '',
    position: '',
    age: '',
    overall: '',
    value: '',
    wage: ''
  };

  validationMessages = {
    playerName: {
      required: 'Il nome è obbligatorio.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    },
    // teamName: {
    //   required: 'Seleziona una squadra.'
    // },
    position: {
      required: 'Seleziona una posizione.'
    },
    age: {
      required: 'L\'età è obbligatoria',
      pattern: 'Inserisci un numero'
    },
    overall: {
      required: 'Il valore potenziale è obbligatorio.',
      pattern: 'Inserisci un numero'
    }

  }

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.playerToUpdate = data.data;
  }

  ngOnInit() {
    this.createForm();
    this.teamService.getTeams().subscribe(data => {
      const teamsData = data.map(team => ({
        teamId: team._id,
        teamName: team.teamName,
      }))
       this.selectedTeams = teamsData
    })
    this.playerService.getPosition().subscribe(data => {
      this.selectedPosition = data
    })

  }

  createForm() {
    this.editPlayerForm = this.formBuilder.group({
      playerName: [this.playerToUpdate.playerName,
        [
          Validators.required,
          Validators.maxLength(25),
        ]
      ],
      teamName: [this.playerToUpdate.team ? this.playerToUpdate.team._id : 0],
      position: [this.playerToUpdate.position, [Validators.required]
      ],
      age: [this.playerToUpdate.age,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      overall: [this.playerToUpdate.overall,
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ]
      ],
      value: [this.playerToUpdate.value],
      wage: [this.playerToUpdate.wage],
    });
    this.editPlayerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.editPlayerForm) {
      return;
    }

    const form = this.editPlayerForm;

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

  compareSelectedObj(obj1: number, obj2: number): boolean {
    return obj1 === obj2;
  }

  onSubmitForm() {
    const data: Player = {
      _id:  this.playerToUpdate._id,
      playerName: this.editPlayerForm.value.playerName,
      img: this.playerToUpdate.img,
      age: this.editPlayerForm.value.age,
      position: this.editPlayerForm.value.position,
      overall: this.editPlayerForm.value.overall,
      value: this.editPlayerForm.value.value,
      wage: this.editPlayerForm.value.wage,
      source: this.playerToUpdate.source,
      team: this.editPlayerForm.value.teamName || null,
    }
    this.playerService.updatePlayer(data).subscribe((res) => {
      this.dialogRef.close(res);
    }, (err) => {
      this.dialogRef.close(false);
    });
  }
}
