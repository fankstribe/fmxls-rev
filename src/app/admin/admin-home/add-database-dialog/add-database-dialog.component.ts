import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SnackBarService } from '../../../core/services/snackbar.service';
import { PlayerService } from '../../../core/services/player.service';


@Component({
  selector: 'app-add-database-dialog',
  templateUrl: './add-database-dialog.component.html',
  styleUrls: ['./add-database-dialog.component.scss']
})
export class AddDatabaseDialogComponent implements OnInit {
  addDatabaseForm: FormGroup;

  formError = {
    source: '',
  };

  validationMessages = {
    source: {
      required: 'La fonte è obbligatoria.',
    }
  };

  constructor(
    private snackBar: SnackBarService,
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddDatabaseDialogComponent>,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addDatabaseForm = this.formBuilder.group({
      source: ['', [Validators.required]]
    });
    this.addDatabaseForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.addDatabaseForm) {
      return;
    }

    const form = this.addDatabaseForm;

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
    const source = this.addDatabaseForm.value.source;

    console.log(source)

    // this.playerService.createPlayersDB(source).subscribe((res) => {
    //   this.dialogRef.close(res);
    // }, err => {
    //   this.dialogRef.close(false);
    // });
  }
}
