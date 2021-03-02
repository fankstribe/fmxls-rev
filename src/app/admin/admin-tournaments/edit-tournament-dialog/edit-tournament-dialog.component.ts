import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TournamentService } from '../../../core/services/tournament.service';
import { SnackBarService } from '../../../core/services/snackbar.service';
import { FileUploadService } from '../../../core/services/file-upload.service';

import { Tournament } from '../../../models/tournament';


@Component({
  selector: 'app-edit-tournament-dialog',
  templateUrl: './edit-tournament-dialog.component.html',
  styleUrls: ['./edit-tournament-dialog.component.scss']
})
export class EditTournamentDialogComponent implements OnInit {
  editTournamentForm: FormGroup;
  tournamentToUpdate: Tournament;

  formError = {
    tournamentName: '',
  };

  validationMessages = {
    tournamentName: {
      required: 'Il nome è obbligatorio.',
      maxlength: 'Il nome non può superare i 25 caratteri',
    },
  }

  constructor(
    private tournamentService: TournamentService,
    private snackBar: SnackBarService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService,
    private dialogRef: MatDialogRef<EditTournamentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.tournamentToUpdate = data.data;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.editTournamentForm = this.formBuilder.group({
      tournamentName: [this.tournamentToUpdate.tournamentName,
        [
          Validators.required,
          Validators.maxLength(25),
        ]
      ]
    });
    this.editTournamentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.editTournamentForm) {
      return;
    }

    const form = this.editTournamentForm;

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
    this.fileUploadService.updateImage(file, 'tournaments', this.tournamentToUpdate._id)
      .then(img => {
        this.tournamentToUpdate.img = img
      }).catch(err => {
        // FIXME - non viene visualizzato il messaggio errore estensione
        // this.snackBar.showSuccessSnackbar('Questo file non è consentito.');
        console.log(err);
      });
  }

  onSubmitForm() {
    this.tournamentService.updateTournament(this.tournamentToUpdate._id, this.editTournamentForm.value.tournamentName).subscribe((data) => {
      this.dialogRef.close(data);
    }, (err) => {
      this.dialogRef.close(false);
    });
  }
}
