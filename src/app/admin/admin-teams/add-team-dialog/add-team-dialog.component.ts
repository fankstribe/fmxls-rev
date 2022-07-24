import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { TeamService } from '../../../core/services/team.service';

import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {
  addTeamForm: UntypedFormGroup;

  formError = {
    teamName: '',
  };

  validationMessages = {
    teamName: {
      required: 'Il nome è obbligatorio.',
      minlength: 'Il nome deve avere almeno 3 caratteri.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    }
  };

  constructor(
    private teamService: TeamService,
    private snackBar: SnackBarService,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<AddTeamDialogComponent>,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addTeamForm = this.formBuilder.group({
      teamName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ]
      ]
    });
    this.addTeamForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.addTeamForm) {
      return;
    }

    const form = this.addTeamForm;

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
    const teamName = this.addTeamForm.value.teamName;

    this.teamService.createTeam(teamName).subscribe((res) => {
      this.dialogRef.close(res);
    }, err => {
      this.dialogRef.close(false);
    });
  }
}
