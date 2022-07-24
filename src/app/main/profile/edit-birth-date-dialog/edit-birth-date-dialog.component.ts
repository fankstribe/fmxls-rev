import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../../core/services/user.service';
import { SnackBarService } from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-edit-birth-date-dialog',
  templateUrl: './edit-birth-date-dialog.component.html',
  styleUrls: ['./edit-birth-date-dialog.component.scss']
})
export class EditBirthDateDialogComponent implements OnInit {
  birthDateForm: UntypedFormGroup;
  getBirthDate: Date;
  validDate = new Date(new Date().setFullYear(new Date().getFullYear() - 16));

  formError = {
    birthDate: ''
  };

  validationMessages = {
    birthDate: {
      required: 'La data di nascita è obbligatoria.',
    }
  };

  constructor(
    private userService: UserService,
    private formBuilder: UntypedFormBuilder,
    private snackBar: SnackBarService,
    private dialogRef: MatDialogRef<EditBirthDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.getBirthDate = data.birthDate;
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.birthDateForm = this.formBuilder.group({
      birthDate: [this.getBirthDate, [Validators.required]]
    });
    this.birthDateForm.valueChanges.subscribe(data => {
      this.onValueChanged(data)});
  }

  onValueChanged(data?: any) {
    if (!this.birthDateForm) {
      return;
    }

    const form = this.birthDateForm;

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
    this.userService.updateBirthDate(this.birthDateForm.value).subscribe((data) => {
      this.dialogRef.close(data);
    }, err => {
      this.dialogRef.close(false);
    });

  }

}
