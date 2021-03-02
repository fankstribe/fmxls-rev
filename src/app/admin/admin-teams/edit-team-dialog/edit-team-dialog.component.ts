import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TeamService } from '../../../core/services/team.service';
import { SnackBarService } from '../../../core/services/snackbar.service';
import { FileUploadService } from '../../../core/services/file-upload.service';

import { Team } from '../../../models/team';


@Component({
  selector: 'app-edit-team-dialog',
  templateUrl: './edit-team-dialog.component.html',
  styleUrls: ['./edit-team-dialog.component.scss']
})
export class EditTeamDialogComponent implements OnInit {
  editTeamForm: FormGroup;
  teamToUpdate: Team;

  formError = {
    teamName: '',
  };

  validationMessages = {
    teamName: {
      required: 'Il nome è obbligatorio.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    },
  }

  constructor(
    private teamService: TeamService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private dialogRef: MatDialogRef<EditTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.teamToUpdate = data.data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editTeamForm = this.formBuilder.group({
      teamName: [this.teamToUpdate.teamName,
        [
          Validators.required,
          Validators.maxLength(25),
        ]
      ]
    });
    this.editTeamForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.editTeamForm) {
      return;
    }

    const form = this.editTeamForm;

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

  onUploadImg(file: File) {
    this.fileUploadService.updateImage(file, 'teams', this.teamToUpdate._id)
      .then(img => {
        this.teamToUpdate.img = img
        console.log(this.teamToUpdate._id);
      }).catch(err => {
        // FIXME - non viene visualizzato il messaggio errore estensione
        // this.snackBar.showSuccessSnackbar('Questo file non è consentito.');
        console.log(err);
      });
  }

  onSubmitForm() {
    this.teamService.updateTeam(this.teamToUpdate._id, this.editTeamForm.value.teamName).subscribe((data) => {
      this.dialogRef.close(data);
    }, (err) => {
      this.dialogRef.close(false);
    });
  }
}
