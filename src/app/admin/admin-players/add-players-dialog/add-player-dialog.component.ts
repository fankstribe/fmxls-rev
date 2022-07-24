import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { TeamService } from '../../../core/services/team.service';
import { Player } from '../../../models/player';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {
  addPlayerForm: UntypedFormGroup;

  formError = {
    playerName: '',
  };

  validationMessages = {
    playerName: {
      required: 'Il nome è obbligatorio.',
      minlength: 'Il nome deve avere almeno 3 caratteri.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    }
  };

  constructor(
    private teamService: TeamService,
    private snackBar: SnackBarService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddPlayerDialogComponent>,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addPlayerForm = this.formBuilder.group({
      playerName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]
      ]
    });
    this.addPlayerForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.addPlayerForm) {
      return;
    }

    const form = this.addPlayerForm;

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
    const teamName = this.addPlayerForm.value.teamName;

    this.teamService.createTeam(teamName).subscribe((res) => {
      this.dialogRef.close(res);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
